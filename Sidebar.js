'use client'
import Link from 'next/link'
import {useEffect,useState} from 'react'
export default function Sidebar(){
  const [chats,setChats]=useState([])
  useEffect(()=>{ setChats(JSON.parse(localStorage.getItem('hh_chats')||'[]')) },[])
  const newChat=()=>{ const id=String(Date.now()); const list=[{id,title:'New chat',createdAt:new Date().toISOString()},...(JSON.parse(localStorage.getItem('hh_chats')||'[]'))]; localStorage.setItem('hh_chats',JSON.stringify(list)); localStorage.setItem('hh_activeChat',id); window.location.href='/chat' }
  return (<aside className="sidebar">
    <div style={{marginBottom:12}}><button onClick={newChat} className="btn primary" style={{width:'100%'}}>+ New chat</button></div>
    <nav style={{display:'flex',flexDirection:'column',gap:8}}>
      <Link href="/">Home</Link>
      <Link href="/chat">Chat</Link>
      <Link href="/reviews">Reviews</Link>
      <Link href="/about">About Carys</Link>
      <Link href="/terms">Terms</Link>
      <Link href="/privacy">Privacy</Link>
      <Link href="/billing">Billing</Link>
    </nav>
    <div style={{marginTop:16,fontSize:12,color:'#889'}}>© {new Date().getFullYear()} Helphub247</div>
  </aside>)
}
