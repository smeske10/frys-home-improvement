import { useState, useEffect } from 'react';

export interface GoogleReview {
  quote: string;
  name: string;
  rating: number;
  profilePhoto: string | null;
  relativeTime: string;
}

export interface GoogleReviewsResult {
  reviews: GoogleReview[];
  rating: number | null;
  userRatingCount: number | null;
  loading: boolean;
  error: boolean;
}

export function useGoogleReviews(placeId?: string): GoogleReviewsResult {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [userRatingCount, setUserRatingCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!placeId) return;

    setLoading(true);
    setError(false);

    fetch(`/.netlify/functions/reviews?placeId=${encodeURIComponent(placeId)}`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch reviews');
        return r.json();
      })
      .then(data => {
        setReviews(data.reviews ?? []);
        setRating(data.rating ?? null);
        setUserRatingCount(data.userRatingCount ?? null);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [placeId]);

  return { reviews, rating, userRatingCount, loading, error };
}
