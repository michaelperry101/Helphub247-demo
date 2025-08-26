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
        <ul className="menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/chat">Chat</Link></li>
          <li><Link href="/reviews">Reviews</Link></li>
          <li><Link href="/about">About Carys</Link></li>
          <li><Link href="/terms">Terms</Link></li>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/billing">Billing</Link></li>
          <li><Link href="/subscribe">Subscribe</Link></li>
        </ul>
      </div>

      <div className="group">
        <div className="title">Settings</div>
        <ul className="menu">
          <li><Link href="/settings#account">Account</Link></li>
          <li><Link href="/settings#appearance">Appearance</Link></li>
          <li><Link href="/settings#voice">Voice &amp; Haptics</Link></li>
          <li><Link href="/settings#notifications">Notifications</Link></li>
          <li><Link href="/settings#privacy">Data &amp; Privacy</Link></li>
          <li><Link href="/settings#danger">Danger Zone</Link></li>
        </ul>
      </div>

      <div className="group">
        <div className="title">Recent</div>
        <ul className="menu">
          {chats.slice(0, 8).map((c) => (
            <li key={c.id}>
              <button
                className="link"
                onClick={() => {
                  localStorage.setItem('hh_activeChat', c.id);
                  window.location.href = '/chat';
                }}
              >
                {c.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-note">© {new Date().getFullYear()} Helphub247</div>
    </aside>
  );
}
