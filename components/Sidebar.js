"use client";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="hamburger"
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <div className="sidebar-content">
        <button className="new-chat">+ New chat</button>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/about">About</Link>
          <Link href="/carys">Carys</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/billing">Billing</Link>
          <Link href="/subscribe">Subscribe</Link>
          <Link href="/settings">Settings</Link>
        </nav>
        <footer>© 2025 Helphub247</footer>
      </div>
    </aside>
  );
}
