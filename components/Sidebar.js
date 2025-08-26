"use client";
import Link from "next/link";
import { useState } from "react";

// Tiny inline icons (no extra deps)
const Icon = ({ name, size = 16 }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "home":      return <svg {...common}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/></svg>;
    case "chat":      return <svg {...common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>;
    case "reviews":   return <svg {...common}><path d="M12 17l-4 2 1-4-3-3 4-.6L12 7l2 3.4 4 .6-3 3 1 4z"/></svg>;
    case "about":     return <svg {...common}><circle cx="12" cy="7" r="3"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>;
    case "terms":     return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z"/></svg>;
    case "privacy":   return <svg {...common}><path d="M12 22s8-3 8-10V6l-8-4-8 4v6c0 7 8 10 8 10z"/></svg>;
    case "billing":   return <svg {...common}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>;
    case "subscribe": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>;
    case "settings":  return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1-1.9 3.3- .1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V22H9v-.7a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H2v-3h1.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1L4.2 4l.1.1A1.7 1.7 0 0 0 6.1 4a1.7 1.7 0 0 0 1-1.5V2h3v.7a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1 1.9 3.3-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H22v3h-1.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case "new":       return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    default:          return null;
  }
};

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="hamburger btn"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className="sidebar-content">
        <button className="bubble sidebar-link" onClick={() => (window.location.href = '/chat')}>
          <span className="icon"><Icon name="new" /></span>
          New chat
        </button>

        <nav>
          <Link className="bubble sidebar-link" href="/">
            <span className="icon"><Icon name="home" /></span>
            Home
          </Link>
          <Link className="bubble sidebar-link" href="/chat">
            <span className="icon"><Icon name="chat" /></span>
            Chat
          </Link>
          <Link className="bubble sidebar-link" href="/reviews">
            <span className="icon"><Icon name="reviews" /></span>
            Reviews
          </Link>
          <Link className="bubble sidebar-link" href="/about">
            <span className="icon"><Icon name="about" /></span>
            About Carys
          </Link>
          <Link className="bubble sidebar-link" href="/terms">
            <span className="icon"><Icon name="terms" /></span>
            Terms
          </Link>
          <Link className="bubble sidebar-link" href="/privacy">
            <span className="icon"><Icon name="privacy" /></span>
            Privacy
          </Link>
          <Link className="bubble sidebar-link" href="/billing">
            <span className="icon"><Icon name="billing" /></span>
            Billing
          </Link>
          <Link className="bubble sidebar-link" href="/subscribe">
            <span className="icon"><Icon name="subscribe" /></span>
            Subscribe
          </Link>
          <Link className="bubble sidebar-link" href="/settings">
            <span className="icon"><Icon name="settings" /></span>
            Settings
          </Link>
        </nav>

        <footer className="small" style={{ marginTop: 12 }}>© {new Date().getFullYear()} Helphub247</footer>
      </div>
    </aside>
  );
}
