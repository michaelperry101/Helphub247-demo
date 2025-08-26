'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ReviewCard from '../../components/ReviewCard';
import reviews from '../../data/reviews.json';

function ReviewsInner() {
  const sp = useSearchParams();
  const page = Number(sp.get('page') || 1);
  const perPage = 12;

  const totalPages = Math.ceil(reviews.length / perPage);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;
  const items = reviews.slice(start, start + perPage);

  return (
    <div>
      <h1>Customer Reviews</h1>

      <div className="review-grid" style={{ marginTop: 12 }}>
        {items.map((r, i) => (
          <ReviewCard key={`${safePage}-${i}`} review={r} />
        ))}
      </div>

      <div
        style={{
          marginTop: 18,
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          alignItems: 'center',
        }}
      >
        {safePage > 1 && <a className="btn" href={`?page=${safePage - 1}`}>Prev</a>}
        <span className="small">Page {safePage} / {totalPages}</span>
        {safePage < totalPages && <a className="btn" href={`?page=${safePage + 1}`}>Next</a>}
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <Suspense fallback={<div className="small">Loading reviews…</div>}>
      <ReviewsInner />
    </Suspense>
  );
}
