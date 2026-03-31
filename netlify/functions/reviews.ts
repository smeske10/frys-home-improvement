import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
  const placeId = event.queryStringParameters?.placeId;

  if (!placeId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'placeId is required' }) };
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GOOGLE_PLACES_API_KEY not configured' }) };
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Places API error:', response.status, text);
      return { statusCode: 502, body: JSON.stringify({ error: 'Failed to fetch from Places API' }) };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
      body: JSON.stringify({
        rating: data.rating ?? null,
        userRatingCount: data.userRatingCount ?? null,
        reviews: (data.reviews ?? []).map((r: any) => ({
          quote: r.text?.text ?? '',
          name: r.authorAttribution?.displayName ?? 'Google Reviewer',
          rating: r.rating ?? 5,
          profilePhoto: r.authorAttribution?.photoUri ?? null,
          relativeTime: r.relativePublishTimeDescription ?? '',
        })),
      }),
    };
  } catch (err) {
    console.error('Reviews function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal error' }) };
  }
};
