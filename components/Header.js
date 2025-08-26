"use client";
import Link from "next/link";

export default function Header() {
  // Tell the sidebar to toggle open/closed
  const toggleSidebar = () =>
    document.dispatchEvent(new CustomEvent("hh:toggleSidebar"));

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        {/* Left: hamburger in header */}
        <button
          className="hamburger-in-header"
          aria-label="Toggle menu"
          onClick={toggleSidebar}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>

        {/* Center: logo → home */}
        <Link href="/" className="brand" aria-label="HelpHub247 Home">
          <img src="/logo.jpg" alt="HelpHub247" className="brand-logo" />
        </Link>

        {/* Right spacer to keep brand perfectly centered */}
        <div className="header-spacer" />
      </div>
    </header>
  );
}
