"use client";
import React, { useRef, useState, useEffect } from "react";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const taRef = useRef(null);

  function onFilesSelected(e, kind) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const mapped = files.map(f => ({ file: f, kind, name: f.name, size: f.size }));
    setAttachments(prev => [...prev, ...mapped]);
    e.target.value = "";
  }
  function removeAttachment(name) {
    setAttachments(prev => prev.filter(a => a.name !== name));
  }
  function handleSend() {
    if (!text.trim() && attachments.length === 0) return;
    // <-- call your existing send logic here, include `attachments`
    // sendMessage({ text, attachments })
    setText("");
    setAttachments([]);
    if (taRef.current) {
      taRef.current.style.height = "40px";
    }
  }
  // autosize textarea
  useEffect(() => {
    if (!taRef.current) return;
    taRef.current.style.height = "40px";
    taRef.current.style.height = taRef.current.scrollHeight + "px";
  }, [text]);

  return (
    <div className="chat-wrap">
      {/* ... your messages list here ... */}

      {!!attachments.length && (
        <div className="attachments">
          {attachments.map(a => (
            <span key={a.name} className="attach-chip">
              <span className={a.kind === "image" ? "chip-dot teal" : "chip-dot purple"} />
              <span className="chip-name">{a.name}</span>
              <button className="chip-x" onClick={() => removeAttachment(a.name)} aria-label="Remove">×</button>
            </span>
          ))}
        </div>
      )}

      <div className="chat-bar">
        <div className="chat-bar-inner">
          {/* Hidden native inputs */}
          <input
            ref={imageInputRef}
            className="hidden-input"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onFilesSelected(e, "image")}
          />
          <input
            ref={fileInputRef}
            className="hidden-input"
            type="file"
            multiple
            onChange={(e) => onFilesSelected(e, "file")}
          />

          {/* Coloured icon buttons */}
          <button
            type="button"
            className="icon-btn teal"
            aria-label="Upload images"
            onClick={() => imageInputRef.current?.click()}
            title="Upload images"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="14" rx="2"></rect>
              <circle cx="8" cy="8" r="2"></circle>
              <path d="M21 15l-5-5-4 4-2-2-5 5"></path>
            </svg>
          </button>

          <button
            type="button"
            className="icon-btn purple"
            aria-label="Upload files"
            onClick={() => fileInputRef.current?.click()}
            title="Upload files"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21.44 11.05l-8.49 8.49a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L10.76 16.56a2 2 0 11-2.83-2.83l7.78-7.78"/>
            </svg>
          </button>

          {/* Bubble textarea */}
          <div className="bubble-input">
            <textarea
              ref={taRef}
              className="chat-input"
              placeholder="Carys is listening…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={1}
            />
          </div>

          {/* Mic (optional) */}
          <button type="button" className="icon-btn orange" aria-label="Voice">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/>
              <path d="M19 10a7 7 0 0 1-14 0"/>
              <path d="M12 17v4"/>
            </svg>
          </button>

          {/* Send */}
          <button type="button" className="icon-btn blue" aria-label="Send" onClick={handleSend}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22 11 13 2 9l20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
