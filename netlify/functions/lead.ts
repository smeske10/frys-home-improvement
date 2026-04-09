import type { Handler, HandlerEvent } from '@netlify/functions';

const HIGHLEVEL_WEBHOOK_URL = process.env.HIGHLEVEL_WEBHOOK_URL ?? '';
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? '';

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  // Verify Cloudflare Turnstile token
  const turnstileToken = body['cf-turnstile-response'] as string | undefined;
  if (!turnstileToken) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing verification token' }) };
  }

  if (TURNSTILE_SECRET) {
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: turnstileToken }).toString(),
    });
    const verifyData = await verifyRes.json() as { success: boolean };
    if (!verifyData.success) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Bot verification failed' }) };
    }
  } else {
    console.warn('TURNSTILE_SECRET_KEY not set — skipping bot verification');
  }

  // Require at least one contact identifier
  if (!body.email && !body.phone) {
    return {
      statusCode: 422,
      body: JSON.stringify({ error: 'email or phone is required' }),
    };
  }

  // Attach server-side metadata
  const payload = {
    ...body,
    submittedAt: new Date().toISOString(),
    pageUrl: event.headers['referer'] ?? '',
    userAgent: event.headers['user-agent'] ?? '',
  };

  if (!HIGHLEVEL_WEBHOOK_URL) {
    console.warn('HIGHLEVEL_WEBHOOK_URL not set — skipping webhook');
    return { statusCode: 200, body: JSON.stringify({ ok: true, warn: 'webhook not configured' }) };
  }

  try {
    const res = await fetch(HIGHLEVEL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('HighLevel webhook error:', res.status, text);
      return { statusCode: 502, body: JSON.stringify({ error: 'Webhook delivery failed' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('Lead function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal error' }) };
  }
};
