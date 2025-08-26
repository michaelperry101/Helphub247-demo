"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Tiny inline icons (no packages) */
const Icon = ({ name, size = 18 }) => {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "new": return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "home": return <svg {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/></svg>;
    case "chat": return <svg {...p}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>;
    case "reviews": return <svg {...p}><path d="M12 17l-4 2 1-4-3-3 4-.6L12 7l2 3.4 4 .6-3 3 1 4z"/></svg>;
    case "about": return <svg {...p}><circle cx="12" cy="7" r="3"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>;
    case "terms": return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z"/></svg>;
    case "privacy": return <svg {...p}><path d="M12 22s8-3 8-10V6l-8-4-8 4v6c0 7 8 10 8 10z"/></svg>;
    case "billing": return <svg {...p}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>;
    case "subscribe": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>;
    case "settings": return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.2-1.8l2-1.5-1.9-3.3-2.3.8A7 7 0 0 0 14 4l-.3-2h-3.4L10 4a7 7 0 0 0-2.6 1.2l-2.3-.8L3.2 7.7l2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .2 1.8l-2 1.5 1.9 3.3 2.3-.8A7 7 0 0 0 10 20l.3 2h3.4L14 20a7 7 0 0 0 2.6-1.2l2.3.8 1.9-3.3-2-1.5c.1-.6.2-1.2.2-1.8z"/></svg>;
    default: return null;
  }
};

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /** Header’s hamburger sends custom events we listen to */
  useEffect(() => {
    const toggle = () => setOpen(v => !v);
    const close = () => setOpen(false);
    document.addEventListener("hh:toggleSidebar", toggle);
    document.addEventListener("hh:closeSidebar", close);
    return () => {
      document.removeEventListener("hh:toggleSidebar", toggle);
      document.removeEventListener("hh:closeSidebar", close);
    };
  }, []);

  /** Close when the route changes */
  useEffect(() => { setOpen(false); }, [pathname]);

  const closeNow = () =>
    document.dispatchEvent(new CustomEvent("hh:closeSidebar"));

  const items = [
    { href: "/",        label: "Home",        icon: "home" },
    { href: "/chat",    label: "Chat",        icon: "chat" },
    { href: "/reviews", label: "Reviews",     icon: "reviews" },
    { href: "/about",   label: "About Carys", icon: "about" },
    { href: "/terms",   label: "Terms",       icon: "terms" },
    { href: "/privacy", label: "Privacy",     icon: "privacy" },
    { href: "/billing", label: "Billing",     icon: "billing" },
    { href: "/subscribe", label: "Subscribe", icon: "subscribe" },
    { href: "/settings",  label: "Settings",  icon: "settings" },
  ];

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <>
      {/* Dim background */}
      <div className={`overlay ${open ? "show" : ""}`} onClick={closeNow} />

      {/* Sliding drawer */}
      <aside
        className={`sidebar-panel ${open ? "open" : ""}`}
        role="navigation"
        aria-label="Main"
      >
        <div className="sidebar-scroller">
          {/* New chat action */}
          <button
            className="bubble sidebar-link"
            onClick={() => { closeNow(); window.location.href = "/chat"; }}
            aria-label="Start a new chat"
          >
            <span className="icon"><Icon name="new" /></span>
            <span className="text">New chat</span>
          </button>

          {/* Menu items */}
          <nav aria-label="Primary">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={`bubble sidebar-link ${isActive(it.href) ? "active" : ""}`}
                onClick={closeNow}
              >
                <span className="icon"><Icon name={it.icon} /></span>
                <span className="text">{it.label}</span>
              </Link>
            ))}
          </nav>

          <div className="footer-note small">
            © {new Date().getFullYear()} Helphub247
          </div>
        </div>
      </aside>
    </>
  );
              }
