"use client";
import { useEffect, useRef, useState } from "react";

const Icon = ({name}) => {
  const p = {stroke:"currentColor", fill:"none", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round"};
  switch(name){
    case "image": return <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path {...p} d="M21 15l-5-5L5 21"/></svg>;
    case "paperclip": return <svg viewBox="0 0 24 24"><path {...p} d="M21 8v8a7 7 0 1 1-14 0V7a5 5 0 0 1 10 0v8a3 3 0 1 1-6 0V8"/></svg>;
    case "mic": return <svg viewBox="0 0 24 24"><rect {...p} x="9" y="2" width="6" height="11" rx="3"/><path {...p} d="M5 10a7 7 0 0 0 14 0M12 19v3"/></svg>;
    case "send": return <svg viewBox="0 0 24 24"><path {...p} d="M22 2L11 13"/><path {...p} d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>;
    default: return null;
  }
};

export default function ChatPage(){
  const [messages, setMessages] = useState([
    // demo starting state
  ]);
  const [prompt, setPrompt] = useState("");
  const listRef = useRef(null);

  useEffect(()=>{ if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages]);

  async function send(){
    const text = prompt.trim();
    if(!text) return;
    setPrompt("");
    setMessages(m => [...m, {role:"user", content:text}]);

    try{
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ messages: [...messages, {role:"user", content:text}] })
      });
      if(!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessages(m => [...m, {role:"assistant", content: data.reply ?? ""}]);
    }catch(e){
      setMessages(m => [...m, {role:"assistant", content:"(Sorry, I couldn’t generate a response.)"}]);
    }
  }

  return (
    <section className="chat-page">
      <div className="messages" ref={listRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "user" ? "user" : "ai"}`}>{m.content}</div>
        ))}
      </div>

      {/* Fixed composer */}
      <div className="composer-wrap">
        <div className="composer">
          <label className="icon-btn img" title="Upload image">
            <input type="file" accept="image/*" />
            <Icon name="image" />
          </label>
          <label className="icon-btn file" title="Upload file">
            <input type="file" />
            <Icon name="paperclip" />
          </label>

          <span className="badge">Carys is listening…</span>

          <input
            className="prompt"
            placeholder="Ask anything…"
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            onKeyDown={(e)=>{ if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); send(); }}}
          />

          <button className="icon-btn mic" title="Voice (coming soon)">
            <Icon name="mic" />
          </button>
          <button className="icon-btn send" title="Send" onClick={send}>
            <Icon name="send" />
          </button>
        </div>
      </div>
    </section>
  );
}
