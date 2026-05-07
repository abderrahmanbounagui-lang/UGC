# Product Video Generator

Turn product images into short-form videos for TikTok, Instagram Reels, and YouTube Shorts — powered by an n8n workflow.

## What it does

- Upload a product image (drag & drop or file picker)
- Enter a product name, description, and target platform
- Triggers your n8n workflow via a secure server-side API route
- Displays the generated video directly in the browser
- Tracks your video count and unlocks badges at 5, 10, and 25 videos
- Stores generation history locally in your browser

## Local setup

```bash
cp .env.example .env.local
```

Edit `.env.local` and set at minimum:

```
N8N_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/your-webhook-id
```

Then:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `N8N_WEBHOOK_URL` | Yes | The n8n webhook POST endpoint that triggers video generation |
| `N8N_STATUS_BASE_URL` | If polling | Base URL for polling job status (append `/{jobId}`) |
| `NEXT_PUBLIC_APP_URL` | If callbacks | Your deployed app URL for n8n webhook callbacks |

## n8n workflow requirements

Your n8n workflow must:

1. Have a **Webhook** trigger node (method: POST)
2. Accept a JSON body with: `productName`, `productDescription`, `platform`, `imageBase64`, `imageMimeType`, `imageFileName`
3. Return either:
   - `{ "videoUrl": "https://..." }` — for immediate response
   - `{ "jobId": "..." }` — for async polling

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS v4
- **Language**: TypeScript
- **State**: React hooks + localStorage
- **Deployment**: Vercel
