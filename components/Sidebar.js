"use client";
import Link from "next/link";
import { useSidebar } from "../components/SidebarContext";
import { usePathname } from "next/navigation";

function NavLink({ href, children, onClick }) {
  const active = usePathname() === href;
  return (
    <li>
      <Link href={href} className="btn" onClick={onClick} aria-current={active ? "page" : undefined}>
        {children}
      </Link>
    </li>
  );
}

export default function Sidebar(){
  const { open, close } = useSidebar();

  return (
    <>
      <div className={`sidebar-overlay ${open ? "open" : ""}`} onClick={close} />
      <aside className={`sidebar-drawer ${open ? "open" : ""}`}>
        <ul className="menu">
          <NavLink href="/" onClick={close}>Home</NavLink>
          <NavLink href="/chat" onClick={close}>Chat</NavLink>
          <NavLink href="/reviews" onClick={close}>Reviews</NavLink>
          <NavLink href="/carys" onClick={close}>About Carys</NavLink>
          <NavLink href="/terms" onClick={close}>Terms</NavLink>
          <NavLink href="/privacy" onClick={close}>Privacy</NavLink>
          <NavLink href="/billing" onClick={close}>Billing</NavLink>
          <NavLink href="/subscribe" onClick={close}>Subscribe</NavLink>
          <NavLink href="/settings" onClick={close}>Settings</NavLink>
        </ul>
      </aside>
    </>
  );
}
