"""Backend tests for JhaPay API.

Covers:
- Health/root
- Status check CRUD (legacy MongoDB endpoint)
- AI chat (non-streaming) – validates Claude Sonnet 4.5 via emergentintegrations
- AI chat input validation (400 on empty)
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://jhapay-merchant.preview.emergentagent.com").rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "JhaPay" in data["message"]


# ---------- Status check (legacy) ----------
class TestStatus:
    def test_create_and_list_status(self, api):
        payload = {"client_name": "TEST_pytest_client"}
        r = api.post(f"{BASE_URL}/api/status", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["client_name"] == "TEST_pytest_client"
        assert "id" in data and isinstance(data["id"], str)
        assert "timestamp" in data

        # Verify persistence via list
        r2 = api.get(f"{BASE_URL}/api/status")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        assert any(i.get("client_name") == "TEST_pytest_client" for i in items)


# ---------- AI Chat ----------
class TestAIChat:
    def test_chat_empty_message_returns_400(self, api):
        r = api.post(f"{BASE_URL}/api/ai/chat", json={"message": "   "})
        assert r.status_code == 400

    def test_chat_returns_reply_with_sales_figure(self, api):
        """Critical: AI must answer with the day's sales ($1,284.50)."""
        payload = {
            "message": "How much did I make in sales today? Reply with the exact dollar amount.",
            "session_id": "TEST_pytest_session_1",
        }
        r = api.post(f"{BASE_URL}/api/ai/chat", json=payload, timeout=90)
        assert r.status_code == 200, f"Got {r.status_code}: {r.text[:400]}"
        data = r.json()
        assert "reply" in data and isinstance(data["reply"], str)
        assert len(data["reply"]) > 0
        assert data.get("session_id") == "TEST_pytest_session_1"
        # Validate LLM grounded its answer in mock context
        reply = data["reply"]
        assert ("1,284.50" in reply) or ("1284.50" in reply), (
            f"Reply missing sales figure. Reply was: {reply!r}"
        )

    def test_chat_unrelated_question_stays_in_character(self, api):
        r = api.post(
            f"{BASE_URL}/api/ai/chat",
            json={"message": "What's my wallet balance?", "session_id": "TEST_pytest_session_2"},
            timeout=90,
        )
        assert r.status_code == 200
        reply = r.json().get("reply", "")
        assert ("4,326.18" in reply) or ("4326.18" in reply), f"Reply: {reply!r}"
