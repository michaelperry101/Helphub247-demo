"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  // provide a tiny event bus for sidebar toggle
  const openSidebar = () => document.dispatchEvent(new CustomEvent("hh:openSidebar"));

  return (
    <header className="header">
      <div className="header-inner">
        <button className="hamburger" aria-label="Open menu" onClick={openSidebar}>
          <span></span><span></span><span></span>
        </button>

        <div className="header-logo">
          <Link href="/" className="logo-link" aria-label="Go home">
            <Image src="/logo.png" alt="HelpHub247" width={140} height={36} priority />
          </Link>
        </div>
      </div>
    </header>
  );
}
