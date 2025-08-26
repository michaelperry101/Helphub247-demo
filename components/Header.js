"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Left spacer keeps the brand centered even when the hamburger sits at far-left */}
        <div className="header-spacer" />

        {/* Brand (centered) */}
        <Link href="/" className="brand" aria-label="HelpHub 24/7 home">
          {/* If you prefer the image logo, keep the <img>. If not available, the text renders alone. */}
          <img
            src="/logo.png"
            alt="HelpHub 24/7"
            className="brand-logo"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="brand-text">HelpHub <strong>24/7</strong></span>
        </Link>

        {/* Right spacer mirrors the left to maintain center alignment */}
        <div className="header-spacer" />
      </div>
    </header>
  );
}
