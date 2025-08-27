"use client";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "../components/SidebarContext";

export default function Header(){
  const { toggle } = useSidebar();
  return (
    <header className="header">
      <div className="header-inner">
        <button className="hamburger" aria-label="Open menu" onClick={toggle}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>

        <Link href="/" className="logo-link" aria-label="HelpHub home">
          {/* Put this file at public/helphub247-logo.png */}
          <Image src="/helphub247-logo.png" alt="HelpHub 24/7" width={220} height={64} priority />
        </Link>
      </div>
    </header>
  );
}
