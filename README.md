# JhaPay Merchant

A phone-framed merchant app demo: a React (CRA + CRACO) frontend with an AI
Assistant powered by Claude through a single Vercel serverless function.

## Structure

```
api/ai/chat.ts     Vercel serverless function — proxies chat to the Anthropic API
frontend/          React app (10 pages, mock data) served as static files
vercel.json        Build + SPA routing config
package.json       Declares the Anthropic SDK used by the serverless function
.env.example       ANTHROPIC_API_KEY template
```

The merchant UI runs entirely on mock data in `frontend/src/data`. The only
server-side piece is the AI Assistant chat (`/api/ai/chat`), which calls
`claude-sonnet-4-5` via the official `@anthropic-ai/sdk`.

## Deploy to Vercel

1. Push this repo to GitHub and import it into Vercel.
2. Leave the build settings as the defaults — they come from `vercel.json`
   (build command `cd frontend && npm install && npm run build`, output
   `frontend/build`).
3. In **Project → Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` — your key from https://console.anthropic.com/
4. Deploy. The frontend is served statically and `/api/ai/chat` runs as a
   serverless function on the same domain.

## Local development

Run the full stack (frontend + `/api` function) with the Vercel CLI:

```bash
npm install            # installs the Anthropic SDK for the function
cd frontend && npm install && cd ..
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env   # not committed
vercel dev
```

To run only the UI (no AI responses):

```bash
cd frontend && npm install && npm start
```
