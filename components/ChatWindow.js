"use client";
import { useEffect, useRef, useState } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Carys. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [muted, setMuted] = useState(false); // 🔇 toggle
  const listRef = useRef(null);
  const fileRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // autoscroll to last message
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---- helpers --------------------------------------------------------------
  async function speak(text) {
    if (muted || !text?.trim()) return;

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: "alloy", // try "verse" or "copper" if you prefer
          format: "mp3",
        }),
      });

      if (!res.ok) {
        // don’t spam the UI; this is mostly for dev
        console.warn("TTS failed:", await res.text());
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play().catch(() => {});
    } catch (e) {
      console.warn("TTS error:", e);
    }
  }

  async function sendMessage(e) {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text || sending) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // surface clear error to user
        const errMsg =
          data?.error ||
          data?.message ||
          "I couldn’t generate a response. Please try again.";
        setMessages((m) => [
          ...m,
          { role: "assistant", content: `⚠️ ${errMsg}` },
        ]);
      } else {
        const reply = data?.reply || "…";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
        speak(reply); // 🔊 say the reply with OpenAI TTS
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `⚠️ Network error: ${err?.message || err}`,
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  // ---- UI -------------------------------------------------------------------
  return (
    <div className="chat-wrap">
      {/* header controls (optional) */}
      <div className="chat-topbar">
        <button
          className={`pill ${muted ? "danger" : ""}`}
          onClick={() => setMuted((v) => !v)}
          aria-pressed={muted}
          title={muted ? "Unmute Carys" : "Mute Carys"}
        >
          {muted ? "🔇 Muted" : "🔊 Voice on"}
        </button>
      </div>

      {/* message list */}
      <ul className="chat-list" ref={listRef}>
        {messages.map((m, i) => (
          <li key={i} className={`msg ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </li>
        ))}
      </ul>

      {/* input bar */}
      <form className="chat-inputbar" onSubmit={sendMessage}>
        {/* image upload */}
        <label className="icon-btn" title="Upload image">
          <input ref={imageRef} type="file" accept="image/*" hidden />
          <span className="icon img" aria-hidden>🖼️</span>
        </label>

        {/* file upload */}
        <label className="icon-btn" title="Attach file">
          <input ref={fileRef} type="file" hidden />
          <span className="icon clip" aria-hidden>📎</span>
        </label>

        {/* (we removed export; mute lives up top) */}

        <input
          className="chat-input"
          placeholder={sending ? "Carys is thinking..." : "Message Carys…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          aria-label="Message Carys"
        />

        <button className="send-btn" disabled={sending || !input.trim()}>
          {sending ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}
