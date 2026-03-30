import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { placeId } = req.query;

  if (!placeId || typeof placeId !== 'string') {
    return res.status(400).json({ error: 'placeId is required' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GOOGLE_PLACES_API_KEY not configured' });
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
  const response = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Places API error:', response.status, text);
    return res.status(502).json({ error: 'Failed to fetch from Places API' });
  }

  const data = await response.json();

  // Cache for 24 hours at the CDN edge
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  return res.json({
    rating: data.rating ?? null,
    userRatingCount: data.userRatingCount ?? null,
    reviews: (data.reviews ?? []).map((r: any) => ({
      quote: r.text?.text ?? '',
      name: r.authorAttribution?.displayName ?? 'Google Reviewer',
      rating: r.rating ?? 5,
      profilePhoto: r.authorAttribution?.photoUri ?? null,
      relativeTime: r.relativePublishTimeDescription ?? '',
    })),
  });
}
