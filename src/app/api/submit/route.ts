import { NextRequest } from 'next/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productName, productDescription, platform, imageBase64, imageMimeType, imageFileName } = body;

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ error: 'N8N_WEBHOOK_URL is not configured' }, { status: 500 });
  }

  // Convert base64 data URL → binary buffer → Blob for multipart upload
  const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const imageBlob = new Blob([imageBuffer], { type: imageMimeType });

  const formData = new FormData();
  formData.append('productPhoto', imageBlob, imageFileName);
  formData.append('productTitle', productName);
  formData.append('productDescription', productDescription);
  formData.append('platform', platform);

  let n8nResponse: Response;
  try {
    n8nResponse = await fetch(webhookUrl, { method: 'POST', body: formData });
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

  const videoUrl = data.videoUrl ?? data.video_url;
  if (videoUrl) {
    return Response.json({ videoUrl });
  }

  if (data.jobId ?? data.job_id) {
    return Response.json({ jobId: data.jobId ?? data.job_id });
  }

  return Response.json(
    { error: 'Unexpected response from n8n — expected videoUrl or jobId' },
    { status: 502 }
  );
}
