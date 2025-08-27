"use client";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "./SidebarContext";
import { useTheme } from "./ThemeProvider";

export default function Header(){
  const { toggle } = useSidebar();
  const { theme, toggle:toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-inner">
        <button aria-label="Open menu" className="hamburger" onClick={toggle}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>

        <Link href="/" className="logo-link" aria-label="HelpHub Home">
          <Image src="/helphub247-logo.png" alt="HelpHub 24/7" width={220} height={56} priority />
        </Link>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>
    </header>
  );
}
