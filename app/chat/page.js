"use client";
import { useEffect, useRef, useState } from "react";

export default function ChatPage(){
  const [messages,setMessages] = useState([]);
  const [input,setInput] = useState("");
  const [busy,setBusy] = useState(false);
  const endRef = useRef(null);
  const imgRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  async function send(e){
    e.preventDefault();
    const text = input.trim();
    if(!text) return;
    setMessages(m=>[...m,{role:"user",content:text}]);
    setInput("");
    setBusy(true);
    try{
      const r = await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[...messages,{role:"user",content:text}]})});
      const data = await r.json();
      setMessages(m=>[...m,{role:"assistant",content:data.reply ?? "…"}]);
    }catch{
      setMessages(m=>[...m,{role:"assistant",content:"Sorry, I couldn’t generate a response."}]);
    }finally{ setBusy(false); }
  }

  return (
    <section className="chat-page">
      <div className="messages">
        {messages.length===0 && <div className="center muted" style={{marginTop:12}}>Carys is listening…</div>}
        {messages.map((m,i)=>(
          <div key={i} className={`msg ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="composer-wrap">
        <form className="composer" onSubmit={send}>
          <input ref={imgRef} type="file" accept="image/*" className="hidden-input" />
          <button type="button" className="icon-btn img" title="Upload image" onClick={()=>imgRef.current?.click()}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="8.5" cy="8.5" r="1.5" fill="#fff"/></svg>
          </button>

          <input ref={fileRef} type="file" className="hidden-input" />
          <button type="button" className="icon-btn file" title="Attach file" onClick={()=>fileRef.current?.click()}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15V7a5 5 0 0 0-10 0v10a3 3 0 0 0 6 0V8"/></svg>
          </button>

          <input
            className="textin"
            placeholder="Ask anything…"
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); e.currentTarget.form?.requestSubmit(); }}}
          />

          <button type="submit" className="icon-btn send" disabled={busy}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </form>
      </div>
    </section>
  );
}
