"use client";
import Link from "next/link";

export default function Header() {
  const toggleSidebar = () =>
    document.dispatchEvent(new CustomEvent("hh:toggleSidebar"));

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        {/* left: hamburger */}
        <button
          className="hamburger-in-header"
          aria-label="Toggle menu"
          onClick={toggleSidebar}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>

        {/* center: logo -> home (cache-busted) */}
        <Link href="/" className="brand" aria-label="HelpHub247 Home">
          <img
            src="/logo.png?v=2"
            alt="HelpHub247"
            className="brand-logo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </Link>

        {/* right spacer keeps logo perfectly centered */}
        <div className="header-spacer" />
      </div>
    </header>
  );
}
