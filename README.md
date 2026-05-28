# VedaAI - AI Assessment Creator

Production-ready Next.js App Router scaffold for the VedaAI Full Stack Engineering Assignment.

## Stack

- Next.js App Router
- TypeScript
- Tailwind
- Zustand
- MongoDB Atlas via Mongoose
- Upstash Redis
- Gemini `gemini-2.5-flash`
- Pusher realtime events
- Vercel-compatible background execution via `waitUntil`

## Getting Started

1. Copy `.env.example` to `.env.local`.
2. Fill in MongoDB, Gemini, Redis, Pusher, `BACKEND_URL`, and `CLIENT_URL`.
3. Install dependencies with `npm install`.
4. Run `npm run dev`.

## Deployment

- Frontend: Vercel
- Backend API and workers: Render
- Database: MongoDB Atlas
- Redis/queue: Upstash

Environment variables:

- Vercel: `BACKEND_URL=https://<your-render-service>`
- Render: `CLIENT_URL=https://<your-vercel-app>`
- Render: `MONGODB_URI`, `GEMINI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `REDIS_URL`

Keep real secrets only in platform env settings or your local `.env.local`. Do not commit `.env.local`.

## Routes

- `GET /api/assignments`
- `POST /api/assignments`
- `GET /api/assignments/[id]`
- `DELETE /api/assignments/[id]`
- `POST /api/generate`
- `GET /api/pdf?assignmentId=...`
