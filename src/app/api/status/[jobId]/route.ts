import { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const statusBaseUrl = process.env.N8N_STATUS_BASE_URL;

  if (!statusBaseUrl) {
    return Response.json({ error: 'N8N_STATUS_BASE_URL is not configured' }, { status: 500 });
  }

  let statusResponse: Response;
  try {
    statusResponse = await fetch(`${statusBaseUrl}/${jobId}`);
  } catch {
    return Response.json({ error: 'Failed to reach n8n status endpoint' }, { status: 502 });
  }

  if (!statusResponse.ok) {
    return Response.json(
      { error: `Status endpoint returned ${statusResponse.status}` },
      { status: 502 }
    );
  }

  const data = await statusResponse.json();
  return Response.json(data);
}
