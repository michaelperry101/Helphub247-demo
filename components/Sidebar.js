"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    document.addEventListener("hh:openSidebar", onOpen);
    document.addEventListener("click", (e) => {
      if ((e.target)?.closest?.(".sidebar")) return;
      if ((e.target)?.closest?.(".hamburger")) return;
      setOpen(false);
    });
    return () => {
      document.removeEventListener("hh:openSidebar", onOpen);
      document.removeEventListener("click", onClose);
    };
  }, []);

  const close = () => setOpen(false);

  const Item = ({ href, children }) => (
    <li>
      <Link href={href} onClick={close} className="pill">
        {children}
      </Link>
    </li>
  );

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <nav>
        <ul className="menu">
          <Item href="/chat">+ New chat</Item>
          <Item href="/">Home</Item>
          <Item href="/chat">Chat</Item>
          <Item href="/reviews">Reviews</Item>
          <Item href="/about">About Carys</Item>
          <Item href="/terms">Terms</Item>
          <Item href="/privacy">Privacy</Item>
          <Item href="/billing">Billing</Item>
          <Item href="/subscribe">Subscribe</Item>
          <Item href="/settings">Settings</Item>
        </ul>
      </nav>
      <div className="copyright">© {new Date().getFullYear()} Helphub247</div>
    </aside>
  );
}
