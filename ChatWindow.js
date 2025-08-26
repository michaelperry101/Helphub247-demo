'use client'
import {useEffect,useRef,useState} from 'react'
export default function ChatWindow(){
  const [messages,setMessages]=useState([])
  const [text,setText]=useState('')
  const [busy,setBusy]=useState(false)
  const [chatId,setChatId]=useState(null)
  const boxRef=useRef(null)
  useEffect(()=>{
    let id=localStorage.getItem('hh_activeChat')
    if(!id){ id=String(Date.now()); localStorage.setItem('hh_activeChat',id); const list=JSON.parse(localStorage.getItem('hh_chats')||'[]'); list.unshift({id,title:'New chat',createdAt:new Date().toISOString()}); localStorage.setItem('hh_chats',JSON.stringify(list)) }
    setChatId(id); setMessages(JSON.parse(localStorage.getItem('chat:'+id)||'[]'))
  },[])
  useEffect(()=>{ boxRef.current?.scrollTo({top:1e9,behavior:'smooth'}) },[messages])
  const speak=(t)=>{ try{ const u=new SpeechSynthesisUtterance(t); u.lang='en-GB'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u) }catch(e){} }
  const send=async()=>{
    if(!text.trim()) return
    const user={role:'user',content:text}
    const next=[...messages,user]; setMessages(next); setText(''); localStorage.setItem('chat:'+chatId, JSON.stringify(next)); setBusy(true)
    try{
      const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next})})
      const j=await r.json()
      const reply={role:'assistant',content:j.reply || ('Carys (demo): '+text)}
      const next2=[...next,reply]; setMessages(next2); localStorage.setItem('chat:'+chatId, JSON.stringify(next2)); speak(reply.content)
    }catch(e){
      const reply={role:'assistant',content:'Carys cannot reach the server.'}; const next2=[...next,reply]; setMessages(next2); localStorage.setItem('chat:'+chatId, JSON.stringify(next2))
    }finally{ setBusy(false) }
  }
  return (<div style={{display:'flex',flexDirection:'column',height:'78vh'}}>
    <div ref={boxRef} style={{flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:8}}>
        {messages.map((m,i)=>(<div key={i} className={m.role==='user'?'msg user':'msg ai'}>{m.content}</div>))}
      </div>
    </div>
    <div style={{display:'flex',gap:8,alignItems:'stretch'}}>
      <textarea className="textarea" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Message Carys..."></textarea>
      <button onClick={send} className="btn primary">{busy?'…':'Send'}</button>
    </div>
  </div>)
}
