"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileRef = useRef(null);
  const textRef = useRef(null);

  // Restore chat (client only)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const cached = JSON.parse(localStorage.getItem("hh_current_chat") || "[]");
        if (Array.isArray(cached)) setMessages(cached);
      }
    } catch {}
    setTimeout(() => textRef.current?.focus(), 50);
  }, []);

  // Persist chat
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("hh_current_chat", JSON.stringify(messages));
      }
    } catch {}
  }, [messages]);

  const autoGrow = () => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addAttachment = (files) => {
    if (!files?.length) return;
    const next = [...attachments];
    for (const f of files) {
      const url = URL.createObjectURL(f);
      next.push({ name: f.name, type: f.type, size: f.size, url });
    }
    setAttachments(next);
  };

  const removeAttachment = (name) => {
    setAttachments((prev) => prev.filter((a) => a.name !== name));
  };

  const toggleMic = () => setListening((v) => !v);

  const handleSend = async () => {
    const text = input.trim();
    if (!text && attachments.length === 0) return;

    const idSafe = (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : String(Date.now()) + Math.random().toString(36).slice(2);

    const userMsg = {
      id: idSafe,
      role: "user",
      content: text || "(attachment)",
      attachments,
      ts: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setAttachments([]);
    if (textRef.current) {
      textRef.current.style.height = "46px";
      textRef.current.focus();
    }

    // placeholder AI bubble
    const phId = "ai_" + Date.now();
    setMessages((m) => [...m, { id: phId, role: "ai", content: "Carys is thinking…" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: messages.slice(-8).map(({ role, content }) => ({ role, content })),
          input: text,
          attachments: attachments.map((a) => ({ name: a.name, type: a.type })),
        }),
      });

      const data = await res.json();
      const reply = data?.reply || "Sorry, I couldn’t generate a response.";
      setMessages((prev) =>
        prev.map((m) => (m.id === phId ? { ...m, content: reply } : m))
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === phId
            ? { ...m, content: "Sorry — I had trouble reaching the assistant. Please try again." }
            : m
        )
      );
    }
  };

  return (
    <div className="chat-wrap">
      <div className="messages">
        {messages.map((m) => (
          <Message key={m.id} msg={m} />
        ))}
      </div>

      {attachments.length > 0 && (
        <div className="attachments">
          {attachments.map((a) => (
            <span key={a.name} className="attach-chip">
              {isImage(a.type) ? "🖼️" : "📄"} {a.name}
              <span className="remove" onClick={() => removeAttachment(a.name)}>×</span>
            </span>
          ))}
        </div>
      )}

      <div className="chat-bar">
        <div className="chat-bar-inner">
          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => addAttachment(e.target.files)}
            accept="image/*,.pdf,.doc,.docx,.txt,.csv"
          />
          <button className="icon-btn attach-btn" onClick={() => fileRef.current?.click()} title="Attach files">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12.3l-8.6 8.6a6 6 0 0 1-8.5-8.5l10-10a4 4 0 0 1 5.7 5.7L9.5 18.2a2 2 0 1 1-2.8-2.8l9-9" />
            </svg>
          </button>

          <textarea
            ref={textRef}
            className="chat-input"
            placeholder="Ask Carys anything…"
            value={input}
            onChange={(e) => { setInput(e.target.value); autoGrow(); }}
            onKeyDown={onKeyDown}
            rows={1}
          />

          <button
            className={`icon-btn mic-btn ${listening ? "listening" : ""}`}
            aria-pressed={listening ? "true" : "false"}
            title={listening ? "Stop voice" : "Talk to Carys"}
            onClick={toggleMic}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3Z" />
              <path d="M19 10a7 7 0 0 1-14 0" />
              <path d="M12 19v4" />
              <path d="M8 23h8" />
            </svg>
          </button>

          <button className="icon-btn send-btn" onClick={handleSend} title="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        {listening && <div className="listening-label">Carys is listening…</div>}
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`message ${isUser ? "user" : "ai"}`}>
      <div className="avatar">{isUser ? "U" : "C"}</div>
      <div className="bubble">
        <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
        {isUser && Array.isArray(msg.attachments) && msg.attachments.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            {msg.attachments.map((a) =>
              isImage(a.type) ? (
                <a key={a.url} href={a.url} target="_blank" rel="noreferrer"
                   title={a.name}
                   style={{ display:"inline-block", width:96, height:72, overflow:"hidden",
                            borderRadius:10, border:"1px solid #e6edf3" }}>
                  <img src={a.url} alt={a.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                </a>
              ) : (
                <a key={a.url} href={a.url} target="_blank" rel="noreferrer"
                   title={a.name}
                   style={{ display:"inline-flex", alignItems:"center", gap:8,
                            padding:"6px 10px", border:"1px solid #e6edf3",
                            borderRadius:999, background:"#f8fafc", color:"#0f172a", fontSize:13 }}>
                  📄 {a.name}
                </a>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function isImage(type) { return typeof type === "string" && type.startsWith("image/"); }
