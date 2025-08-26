export default function ReviewCard({review}){
  return (<div className="card">
    <div style={{display:'flex',justifyContent:'space-between'}}><b>{review.name}</b><span style={{color:'#f59e0b'}}>★★★★★</span></div>
    <p style={{marginTop:8}}>{review.text}</p>
    <div style={{fontSize:12,color:'#778'}}>{review.date} • {review.location}</div>
  </div>)
}
