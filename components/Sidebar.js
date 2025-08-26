'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    setChats(JSON.parse(localStorage.getItem('hh_chats') || '[]'));
  }, []);

  const newChat = () => {
    const id = String(Date.now());
    const list = [
      { id, title: 'New chat', createdAt: new Date().toISOString() },
      ...(JSON.parse(localStorage.getItem('hh_chats') || '[]')),
    ];
    localStorage.setItem('hh_chats', JSON.stringify(list));
    localStorage.setItem('hh_activeChat', id);
    window.location.href = '/chat';
  };

  return (
    <aside className="sidebar">
      <div className="group">
        <button onClick={newChat} className="cta">+ New chat</button>
      </div>

      <div className="group">
        <div className="title">Navigation</div>
        <Link href="/">Home</Link>
        <Link href="/chat">Chat</Link>
        <Link href="/reviews">Reviews</Link>
        <Link href="/about">About Carys</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/billing">Billing</Link>
        <Link href="/subscribe">Subscribe</Link>
      </div>

      <div className="group">
        <div className="title">Settings</div>
        <Link href="/settings#account">Account</Link>
        <Link href="/settings#appearance">Appearance</Link>
        <Link href="/settings#voice">Voice &amp; Haptics</Link>
        <Link href="/settings#notifications">Notifications</Link>
        <Link href="/settings#privacy">Data &amp; Privacy</Link>
        <Link href="/settings#danger">Danger Zone</Link>
      </div>

      <div className="group">
        <div className="title">Recent</div>
        {chats.slice(0, 8).map((c) => (
          <button
            key={c.id}
            className="link"
            onClick={() => {
              localStorage.setItem('hh_activeChat', c.id);
              window.location.href = '/chat';
            }}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="footer-note">© {new Date().getFullYear()} Helphub247</div>
    </aside>
  );
}
