from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import json
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ['EMERGENT_LLM_KEY']

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ----- Mock merchant context fed to the AI assistant -----
MERCHANT_CONTEXT = """
You are JhaPay AI, the in-app assistant for a coffee + bakery merchant named "Maya Cafe" using the JhaPay merchant app.

Live business snapshot (today):
- Today's sales: $1,284.50 (32 transactions)
- Yesterday: $1,102.00 (28 transactions)
- 7-day average: $1,150
- Wallet balance: $4,326.18
- Pending settlement: $612.40 (lands tomorrow 9am)
- Top sellers today: Iced Latte (18), Croissant (14), Blueberry Muffin (11), Avocado Toast (9)
- Slow movers (last 14d): Matcha Tin, Almond Biscotti, Cold Brew Bottle 1L
- Refunds this week: 2 totaling $24.00 (Customer: Riya Sharma)
- Busy hours: 8-10am and 5-6pm
- Low stock: Oat Milk (3 left), Espresso Beans (1 bag), Brown Sugar Syrup (out)

Tone: warm, concise, premium, like an Apple product. Keep answers under 80 words, use friendly bullet points when listing.
Always speak in USD. Never mention you are an AI model. Never break character.
If asked something unrelated to the merchant business, gently steer back.
"""


# ----- Models -----
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"message": "JhaPay API up"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    items = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in items:
        if isinstance(c.get('timestamp'), str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return items


@api_router.post("/ai/chat/stream")
async def ai_chat_stream(req: ChatRequest):
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="message required")

    session_id = req.session_id or str(uuid.uuid4())

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=MERCHANT_CONTEXT,
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")

    user_message = UserMessage(text=req.message)

    async def event_generator():
        try:
            async for event in chat.stream_message(user_message):
                if isinstance(event, TextDelta):
                    payload = json.dumps({"delta": event.content})
                    yield f"data: {payload}\n\n"
                elif isinstance(event, StreamDone):
                    yield f"data: {json.dumps({'done': True})}\n\n"
                    break
        except Exception as e:
            logger.exception("AI stream error")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@api_router.post("/ai/chat")
async def ai_chat(req: ChatRequest):
    """Non-streaming fallback — collects full response and returns JSON."""
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="message required")

    session_id = req.session_id or str(uuid.uuid4())
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=MERCHANT_CONTEXT,
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")

    text_parts = []
    async for event in chat.stream_message(UserMessage(text=req.message)):
        if isinstance(event, TextDelta):
            text_parts.append(event.content)
        elif isinstance(event, StreamDone):
            break

    return {"reply": "".join(text_parts), "session_id": session_id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
