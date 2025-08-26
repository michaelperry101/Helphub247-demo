'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState } from 'react';

function Section({ title, children }) {
  return (
    <section style={{ marginTop: 18 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</h2>
      <div className="card" style={{ padding: 14 }}>{children}</div>
    </section>
  );
}
function Row({ label, children, hint }) {
  return (
    <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
      <div style={{ fontWeight: 600 }}>{label}</div>
      <div>{children}</div>
      {hint && <div className="small" style={{ color: '#778' }}>{hint}</div>}
    </div>
  );
}

export default function Settings() {
  const [ready, setReady] = useState(false);

  // Appearance
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Voice & haptics
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceAccent, setVoiceAccent] = useState('en-GB');
  const [haptics, setHaptics] = useState(true);

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(false);

  // Data controls
  const [saveChats, setSaveChats] = useState(true);

  const accountEmail = useMemo(() => 'demo@helphub247.co.uk', []);

  // Load persisted prefs
  useEffect(() => {
    try {
      setTheme(localStorage.getItem('hh_theme') || 'light');
      setFontSize(parseInt(localStorage.getItem('hh_fs') || '16', 10));
      setHighContrast(localStorage.getItem('hh_highContrast') === 'true');
      setReduceMotion(localStorage.getItem('hh_reduceMotion') === 'true');
      setVoiceEnabled(localStorage.getItem('hh_voiceEnabled') !== 'false');
      setVoiceAccent(localStorage.getItem('hh_voiceAccent') || 'en-GB');
      setHaptics(localStorage.getItem('hh_haptics') !== 'false');
      setEmailNotifs(localStorage.getItem('hh_notificationsEmail') === 'true');
      setSaveChats(localStorage.getItem('hh_saveChats') !== 'false');
    } catch {}
    setReady(true);
  }, []);

  // Persist + apply
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem('hh_theme', theme);
      document.body.style.background = theme === 'dark' ? '#0b1020' : '#f7fafc';
      document.body.style.color = theme === 'dark' ? '#e5e7eb' : '#0f172a';
      document.body.style.filter = highContrast ? 'contrast(1.15)' : 'none';
      document.documentElement.style.setProperty('--fs', `${fontSize}px`);
      localStorage.setItem('hh_fs', String(fontSize));
      localStorage.setItem('hh_highContrast', String(highContrast));
      localStorage.setItem('hh_reduceMotion', String(reduceMotion));
      localStorage.setItem('hh_voiceEnabled', String(voiceEnabled));
      localStorage.setItem('hh_voiceAccent', voiceAccent);
      localStorage.setItem('hh_haptics', String(haptics));
      localStorage.setItem('hh_notificationsEmail', String(emailNotifs));
      localStorage.setItem('hh_saveChats', String(saveChats));
    } catch {}
  }, [
    ready, theme, fontSize, highContrast, reduceMotion,
    voiceEnabled, voiceAccent, haptics, emailNotifs, saveChats
  ]);

  const testVoice = () => {
    if (!voiceEnabled) return;
    try {
      const u = new SpeechSynthesisUtterance(
        'Hello, this is Carys speaking in a British accent.'
      );
      u.lang = voiceAccent || 'en-GB';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const exportChats = () => {
    try {
      const allKeys = Object.keys(localStorage);
      const chatKeys = allKeys.filter(k => k.startsWith('chat:'));
      const chats = chatKeys.map(k => ({
        id: k.slice(5),
        messages: JSON.parse(localStorage.getItem(k) || '[]'),
      }));
      const meta = JSON.parse(localStorage.getItem('hh_chats') || '[]');
      const blob = new Blob(
        [JSON.stringify({ exportedAt: new Date().toISOString(), meta, chats }, null, 2)],
        { type: 'application/json' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'helphub247-chats.json'; a.click();
      URL.revokeObjectURL(url);
    } catch {}
  };

  const clearChats = () => {
    try {
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        // ✅ fixed: removed extra ')'
        if (k && (k.startsWith('chat:') || k === 'hh_chats' || k === 'hh_activeChat')) {
          toRemove.push(k);
        }
      }
      toRemove.forEach(k => localStorage.removeItem(k));
      alert('Local chats cleared on this device.');
    } catch {}
  };

  const resetDefaults = () => {
    setTheme('light');
    setFontSize(16);
    setHighContrast(false);
    setReduceMotion(false);
    setVoiceEnabled(true);
    setVoiceAccent('en-GB');
    setHaptics(true);
    setEmailNotifs(false);
    setSaveChats(true);
  };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <h1>Settings</h1>

      <Section title="Account">
        <Row label="Signed in">
          <div className="small">{accountEmail}</div>
        </Row>
        <Row label="Billing">
          <a href="/billing" className="btn">Open billing</a>
        </Row>
      </Section>

      <Section title="Appearance">
        <Row label="Theme">
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn" onClick={() => setTheme('light')} aria-pressed={theme === 'light'}>Light</button>
            <button className="btn" onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}>Dark</button>
          </div>
        </Row>
        <Row label="Text size" hint="Applies to this device.">
          <input type="range" min="14" max="20" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value, 10))} style={{ width: 240 }} />{' '}
          <span className="small">{fontSize}px</span>
        </Row>
        <Row label="High contrast">
          <label><input type="checkbox" checked={highContrast} onChange={() => setHighContrast(v => !v)} /> Increase contrast</label>
        </Row>
        <Row label="Reduce motion">
          <label><input type="checkbox" checked={reduceMotion} onChange={() => setReduceMotion(v => !v)} /> Limit animations</label>
        </Row>
      </Section>

      <Section title="Voice & Haptics">
        <Row label="Voice responses">
          <label><input type="checkbox" checked={voiceEnabled} onChange={() => setVoiceEnabled(v => !v)} /> Enable Carys voice</label>
        </Row>
        <Row label="Accent">
          <select value={voiceAccent} onChange={e => setVoiceAccent(e.target.value)} className="input">
            <option value="en-GB">British English (en-GB)</option>
            <option value="en-US">US English (en-US)</option>
            <option value="en-AU">Australian English (en-AU)</option>
          </select>
          <div style={{ marginTop: 8 }}>
            <button className="btn" onClick={testVoice}>Test voice</button>
          </div>
        </Row>
        <Row label="Haptics" hint="On mobile devices that support it.">
          <label><input type="checkbox" checked={haptics} onChange={() => setHaptics(v => !v)} /> Tap feedback</label>
        </Row>
      </Section>

      <Section title="Notifications">
        <Row label="Email updates">
          <label><input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(v => !v)} /> Receive helpful tips and updates</label>
        </Row>
      </Section>

      <Section title="Data & Privacy">
        <Row label="Save chats on this device" hint="Disable to stop saving future chats locally.">
          <label><input type="checkbox" checked={saveChats} onChange={() => setSaveChats(v => !v)} /> Store chat history locally</label>
        </Row>
        <Row label="Export chats" hint="Download your chat history (local only).">
          <button className="btn" onClick={exportChats}>Export as JSON</button>
        </Row>
        <Row label="Clear chats" hint="Removes all locally stored conversations on this browser.">
          <button className="btn" onClick={clearChats} style={{ borderColor: '#ef4444', color: '#ef4444' }}>Clear local chats</button>
        </Row>
      </Section>

      <Section title="Danger Zone">
        <Row label="Reset preferences" hint="Restore appearance, voice, and accessibility preferences to defaults.">
          <button className="btn" onClick={resetDefaults}>Reset to defaults</button>
        </Row>
      </Section>
    </div>
  );
}
