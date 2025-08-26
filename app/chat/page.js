"use client";
import React, { useRef, useState, useEffect } from "react";

export default function ChatPage() {
  // ...your existing state + effects...

  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [attachments, setAttachments] = useState([]); // if you already have this, keep your version

  function onFilesSelected(e, kind) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const mapped = files.map(f => ({ file: f, kind, name: f.name, size: f.size }));
    setAttachments(prev => [...prev, ...mapped]);
    // reset input so picking same file again fires change
    e.target.value = "";
  }

  function removeAttachment(name) {
    setAttachments(prev => prev.filter(a => a.name !== name));
  }

  // ---- chat UI above ----
  return (
    <div className="chat-wrap">
      {/* messages list */}
      <div className="messages">
        {/* ...your existing message rendering... */}
      </div>

      {/* small pill chips for selected files/images */}
      {!!attachments.length && (
        <div className="attachments">
          {attachments.map(a => (
            <span key={a.name} className="attach-chip">
              {a.kind === "image" ? "🖼️" : "📎"} {a.name}
              <span className="remove" onClick={() => removeAttachment(a.name)}>✕</span>
            </span>
          ))}
        </div>
      )}

      {/* input bar */}
      <div className="chat-bar">
        <div className="chat-bar-inner">
          {/* Image picker */}
          <button
            type="button"
            className="icon-btn"
            aria-label="Upload images"
            onClick={() => imageInputRef.current?.click()}
            title="Upload images"
          >
            {/* Image icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="14" rx="2"></rect>
              <circle cx="8" cy="8" r="2"></circle>
              <path d="M21 15l-5-5-4 4-2-2-5 5"></path>
            </svg>
          </button>

          {/* File picker */}
          <button
            type="button"
            className="icon-btn"
            aria-label="Upload files"
            onClick={() => fileInputRef.current?.click()}
            title="Upload files"
          >
            {/* Paperclip */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21.44 11.05l-8.49 8.49a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L10.76 16.56a2 2 0 11-2.83-2.83l7.78-7.78"/>
            </svg>
          </button>

          {/* Hidden inputs */}
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

          {/* Your text area */}
          <textarea
            className="chat-input"
            placeholder="Message Carys…"
            // value={...}
            // onChange={...}
            rows={1}
          />

          {/* Send / mic buttons you already have */}
          {/* <button className="icon-btn" onClick={handleSend}>…</button>
              <button className="icon-btn mic-btn">…</button> */}
        </div>
      </div>
    </div>
  );
}
