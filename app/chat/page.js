"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [attachments, setAttachments] = useState([]); // {name, type, url, size}
  const fileRef = useRef(null);
  const textRef = useRef(null);

  /* ---------- bootstrap (client only) ---------- */
  useEffect(() => {
    // Load last chat (if any)
    try {
      const cached = JSON.parse(localStorage.getItem("hh_current_chat") || "[]");
      if (Array.isArray(cached)) setMessages(cached);
    } catch {}
    // Autofocus on mount
    setTimeout(() => textRef.current?.focus(), 50);
  }, []);

  // Persist as you type/chat
  useEffect(() => {
    try {
      localStorage.setItem("hh_current_chat", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  /* ---------- helpers ---------- */
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
      next.push({
        name: f.name,
        type: f.type,
        size: f.size,
        url,
      });
    }
    setAttachments(next);
  };

  const removeAttachment = (name) => {
    setAttachments((prev) => prev.filter((a) => a.name !== name));
  };

  const toggleMic = () => {
    setListening((v) => !v);
    // (Optional) hook up Web Speech API later; this just toggles visual state.
  };

  /* ---------- send ---------- */
  const handleSend = async () => {
    const text = input.trim();
    if (!text && attachments.length === 0) return;

    // push user message
    const userMsg = {
      id: crypto.randomUUID(),
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

    // --- demo AI reply (replace with your real API later) ---
    const thinking = {
      id: crypto.randomUUID(),
      role: "ai",
      content: "…",
      typing: true,
      ts: Date.now(),
    };
    setMessages((m) => [...m, thinking]);

    // Simulate streaming reply
    const reply =
      "Carys here. I’m listening. How can I help today?\n\n" +
      (userMsg.attachments?.length
        ? `I can see ${userMsg.attachments.length} attachment${userMsg.attachments.length > 1 ? "s" : ""}.`
        : "");
    await typeOut(thinking.id, reply);
  };

  // Simulated typewriter stream
  const typeOut = async (id, fullText) => {
    for (let i = 0; i <= fullText.length; i++) {
      const chunk = fullText.slice(0, i);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, content: chunk, typing: i < fullText.length } : m
        )
      );
      await new Promise((r) => setTimeout(r, 10)); // speed
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="chat-wrap">
      {/* Messages */}
      <div className="messages">
        {messages.map((m) => (
          <Message key={m.id} msg={m} />
        ))}
      </div>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="attachments">
          {attachments.map((a) => (
            <span key={a.name} className="attach-chip">
              {isImage(a.type) ? "🖼️" : "📄"} {a.name}
              <span
                className="remove"
                onClick={() => removeAttachment(a.name)}
                title="Remove"
                aria-label={`Remove ${a.name}`}
              >
                ×
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Chat bar */}
      <div className="chat-bar">
        <div className="chat-bar-inner">
          {/* Hidden file input */}
          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => addAttachment(e.target.files)}
            accept="image/*,.pdf,.doc,.docx,.txt,.csv"
          />
          {/* Attach button */}
          <button
            className="icon-btn attach-btn"
            title="Attach files"
            aria-label="Attach files"
            onClick={() => fileRef.current?.click()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12.3l-8.6 8.6a6 6 0 0 1-8.5-8.5l10-10a4 4 0 0 1 5.7 5.7L9.5 18.2a2 2 0 1 1-2.8-2.8l9-9" />
            </svg>
          </button>

          {/* Textarea */}
          <textarea
            ref={textRef}
            className="chat-input"
            placeholder="Ask Carys anything…"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoGrow();
            }}
            onKeyDown={onKeyDown}
            rows={1}
          />

          {/* Mic */}
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

          {/* Send */}
          <button
            className="icon-btn send-btn"
            title="Send"
            aria-label="Send"
            onClick={handleSend}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>

        {/* Optional visual hint under bar */}
        {listening && <div className="listening-label">Carys is listening…</div>}
      </div>
    </div>
  );
}

/* ---------- Message component ---------- */
function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`message ${isUser ? "user" : "ai"}`}>
      <div className="avatar">{isUser ? "U" : "C"}</div>
      <div className="bubble">
        <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>

        {/* render attachments inside the user message bubble */}
        {isUser && Array.isArray(msg.attachments) && msg.attachments.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            {msg.attachments.map((a) =>
              isImage(a.type) ? (
                <a
                  key={a.url}
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  title={a.name}
                  style={{
                    display: "inline-block",
                    width: 96,
                    height: 72,
                    overflow: "hidden",
                    borderRadius: 10,
                    border: "1px solid #e6edf3",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.url}
                    alt={a.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </a>
              ) : (
                <a
                  key={a.url}
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  title={a.name}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    border: "1px solid #e6edf3",
                    borderRadius: 999,
                    background: "#f8fafc",
                    color: "#0f172a",
                    fontSize: 13,
                  }}
                >
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

/* ---------- utils ---------- */
function isImage(type) {
  return typeof type === "string" && type.startsWith("image/");
}
