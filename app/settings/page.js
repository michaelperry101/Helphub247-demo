'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function Settings() {
  const [dark, setDark] = useState(false);      // default safe value
  const [ready, setReady] = useState(false);    // wait for client

  // Read from localStorage on mount (client only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hh_theme');
      const isDark = saved === 'dark';
      setDark(isDark);
      document.body.style.background = isDark ? '#0b1020' : '#f7fafc';
      document.body.style.color = isDark ? '#e5e7eb' : '#0f172a';
    } catch {}
    setReady(true);
  }, []);

  // Write to localStorage after state changes (client only)
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem('hh_theme', dark ? 'dark' : 'light');
    } catch {}
    document.body.style.background = dark ? '#0b1020' : '#f7fafc';
    document.body.style.color = dark ? '#e5e7eb' : '#0f172a';
  }, [dark, ready]);

  return (
    <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1>Settings</h1>
      <label>
        <input
          type="checkbox"
          checked={dark}
          onChange={() => setDark(v => !v)}
          disabled={!ready}
        />{' '}
        Dark mode
      </label>
    </div>
  );
}
