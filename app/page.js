'use client'
import { useSearchParams } from 'next/navigation'
import ReviewCard from '@/components/ReviewCard'
import reviews from '@/data/reviews.json'
export default function Reviews(){
  const sp = useSearchParams()
  const page = parseInt(sp.get('page') || '1', 10)
  const per = 12
  const total = Math.ceil(reviews.length / per)
  const start = (page-1)*per
  const items = reviews.slice(start, start+per)
  return (<div><h1>Customer Reviews</h1>
    <div className="review-grid" style={{marginTop:12}}>{items.map((r,i)=>(<ReviewCard key={i} review={r}/>))}</div>
    <div style={{marginTop:18,display:'flex',justifyContent:'center',gap:12}}>
      {page>1 && <a className="btn" href={`?page=${page-1}`}>Prev</a>}
      <span>Page {page} / {total}</span>
      {page<total && <a className="btn" href={`?page=${page+1}`}>Next</a>}
    </div>
  </div>)
}
