export default function ReviewCard({ review }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{review.name}</strong>
        <span style={{ color: '#f59e0b' }}>★★★★★</span>
      </div>
      <p style={{ marginTop: 8 }}>{review.text}</p>
      <div className="small" style={{ marginTop: 6, color: '#778' }}>
        {review.date} • {review.location}
      </div>
    </div>
  );
}
