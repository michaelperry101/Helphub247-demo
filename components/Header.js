"use client"
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="header">
        {/* Hamburger on left */}
        <button 
          className="hamburger" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Logo in center, always links home */}
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="HelpHub247" width={120} height={50} />
        </Link>
      </header>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
