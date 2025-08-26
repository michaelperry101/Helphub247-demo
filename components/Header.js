"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>

        {/* Big Center Logo */}
        <Link href="/" className="logo-link" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"   // make sure your file is /public/logo.png
            alt="HelpHub247 Logo"
            width={220}       // increased size
            height={80}
            priority
          />
        </Link>
      </div>

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />
    </header>
  );
}
