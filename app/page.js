'use client'
import {useEffect,useState} from 'react'
export default function Settings(){
  const [dark,setDark]=useState(localStorage.getItem('hh_theme')==='dark')
  useEffect(()=>{ localStorage.setItem('hh_theme', dark?'dark':'light'); document.body.style.background = dark ? '#0b1020' : '#f7fafc'; document.body.style.color = dark ? '#e5e7eb' : '#0f172a' },[dark])
  return (<div className="card" style={{maxWidth:720,margin:'0 auto'}}><h1>Settings</h1><label><input type="checkbox" checked={dark} onChange={()=>setDark(v=>!v)} /> Dark mode</label></div>)
}
