import { NextRequest } from 'next/server';
import { SubmitPayload } from '@/lib/types';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body: SubmitPayload = await req.json();

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ error: 'N8N_WEBHOOK_URL is not configured' }, { status: 500 });
  }

  let n8nResponse: Response;
  try {
    n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return Response.json({ error: 'Failed to reach n8n webhook' }, { status: 502 });
  }

  if (!n8nResponse.ok) {
    return Response.json(
      { error: `n8n webhook returned ${n8nResponse.status}` },
      { status: 502 }
    );
  }

  const data = await n8nResponse.json();

  // Case A: n8n returned a video URL immediately
  if (data.videoUrl) {
    return Response.json({ videoUrl: data.videoUrl });
  }

  // Case B: n8n returned a job ID for async polling
  if (data.jobId) {
    return Response.json({ jobId: data.jobId });
  }

  return Response.json(
    { error: 'Unexpected response from n8n — expected videoUrl or jobId' },
    { status: 502 }
  );
}
