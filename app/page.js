import Link from 'next/link'
export default function Home(){
  return (<div style={{textAlign:'center',padding:'48px 0'}}>
    <h1>Helphub247 — <span style={{background:'linear-gradient(135deg,#0ea5a4,#06b6d4)',WebkitBackgroundClip:'text',color:'transparent'}}>CARYS</span></h1>
    <p>24/7 UK AI helpline. Chat, voice and uploads.</p>
    <div style={{marginTop:16,display:'flex',gap:10,justifyContent:'center'}}>
      <Link href="/chat"><button className="btn primary">Open Carys</button></Link>
      <Link href="/subscribe"><button className="btn">Subscribe</button></Link>
    </div>
  </div>)
}
