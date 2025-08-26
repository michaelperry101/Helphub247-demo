"use client";
import {useEffect, useRef, useState} from "react";

export default function ChatPage(){
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);        // {file, kind:"image"|"file"}
  const listRef = useRef(null);
  const fileRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(()=>{ listRef.current?.scrollTo({top:999999, behavior:"smooth"}); }, [messages]);

  async function sendMessage(e){
    e.preventDefault();
    if(!text.trim() && files.length===0) return;

    const userMsg = { role:"user", content:text, attachments:files };
    setMessages(m=>[...m, userMsg]);
    setText(""); setFiles([]);

    try{
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({role, content})=>({role, content}))
        })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || "Request failed");
      setMessages(m=>[...m, {role:"assistant", content:data.reply || ""}]);
    }catch(err){
      setMessages(m=>[...m, {role:"assistant", content:"Sorry, I couldn’t generate a response."}]);
      console.error(err);
    }
  }

  function onPick(kind, ev){
    const list = Array.from(ev.target.files||[]);
    setFiles(prev => [
      ...prev,
      ...list.map(f => ({ file:f, kind, name:f.name, size:f.size }))
    ]);
  }
  function removeChip(name){ setFiles(prev => prev.filter(x => x.name !== name)); }

  return (
    <div className="chat-wrap">
      {/* scrollable messages */}
      <div className="chat-scroll" ref={listRef}>
        {messages.length===0 && (
          <div className="center muted" style={{marginTop:24}}>
            <div className="msg ai" style={{alignSelf:"center"}}>Carys is listening…</div>
          </div>
        )}
        <div className="messages">
          {messages.map((m, i)=>(
            <div key={i} className={`msg ${m.role==="user" ? "user":"ai"}`}>
              {m.content}
            </div>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <form className="chat-bar" onSubmit={sendMessage}>
        <div className="chat-bar-inner">
          {/* hidden inputs */}
          <input ref={imageRef} className="hidden-input" type="file" accept="image/*" multiple onChange={ev=>onPick("image", ev)} />
          <input ref={fileRef}  className="hidden-input" type="file" multiple onChange={ev=>onPick("file", ev)} />

          {/* icons (image / attach) */}
          <button type="button" className="icon-btn teal" title="Add images" onClick={()=>imageRef.current?.click()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 5h16v14H4zM8 13l3-3 5 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="8" r="1.5" />
            </svg>
          </button>

          <button type="button" className="icon-btn purple" title="Attach files" onClick={()=>fileRef.current?.click()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15V7a5 5 0 0 0-10 0v10a3 3 0 0 0 6 0V8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* text bubble */}
          <div className="bubble-input">
            <textarea
              className="chat-input"
              placeholder="Message Carys…"
              value={text}
              onChange={e=>setText(e.target.value)}
              rows={1}
            />
            {/* attachment chips */}
            {files.length>0 && (
              <div className="attachments">
                {files.map(f=>(
                  <span key={f.name} className="attach-chip">
                    <span className={`chip-dot ${f.kind==="image"?"teal":"purple"}`} />
                    <span className="chip-name">{f.name}</span>
                    <button type="button" className="chip-x" onClick={()=>removeChip(f.name)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* send */}
          <button type="submit" className="icon-btn blue" title="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 2L11 13" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
