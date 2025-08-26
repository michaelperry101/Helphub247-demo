'use client'
import {useState} from 'react'
export default function Subscribe(){ const [ok,setOk]=useState(false); return (<div className="card" style={{maxWidth:640,margin:'0 auto',textAlign:'center'}}><h1>Subscribe</h1><p>£9.99/month — cancel any time.</p>{!ok?<button className="btn primary" onClick={()=>setOk(true)}>Subscribe (Demo)</button>:<div style={{color:'#16a34a'}}>Subscribed (demo)</div>}</div>) }
