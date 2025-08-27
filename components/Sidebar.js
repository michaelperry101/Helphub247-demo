"use client";
import Link from "next/link";
import { useSidebar } from "../components/SidebarContext";
import { usePathname } from "next/navigation";

const Icon = ({name}) => {
  const p = {stroke:"currentColor", fill:"none", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round"};
  switch(name){
    case "plus": return <svg viewBox="0 0 24 24"><path {...p} d="M12 5v14M5 12h14"/></svg>;
    case "home": return <svg viewBox="0 0 24 24"><path {...p} d="M3 11l9-7 9 7"/><path {...p} d="M9 22V12h6v10"/></svg>;
    case "chat": return <svg viewBox="0 0 24 24"><path {...p} d="M21 15a4 4 0 0 1-4 4H9l-6 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>;
    case "star": return <svg viewBox="0 0 24 24"><path {...p} d="M12 17.3l6.2 3.7-1.7-7.2L22 8.6l-7.3-.6L12 1 9.3 8l-7.3.6 5.5 5.2-1.7 7.2z"/></svg>;
    case "info": return <svg viewBox="0 0 24 24"><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M12 8h.01M11 12h2v6h-2z"/></svg>;
    case "doc": return <svg viewBox="0 0 24 24"><path {...p} d="M14 2H6a2 2 0 0 0-2 2v16l4-4h10a2 2 0 0 0 2-2V6z"/></svg>;
    case "shield": return <svg viewBox="0 0 24 24"><path {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case "credit": return <svg viewBox="0 0 24 24"><rect {...p} x="2" y="5" width="20" height="14" rx="2"/><path {...p} d="M2 10h20"/></svg>;
    case "settings": return <svg viewBox="0 0 24 24"><path {...p} d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path {...p} d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 4 19.4l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L3.2 8A2 2 0 1 1 6 5.2l.06.06a1.65 1.65 0 0 0 1.82.33H8a1.65 1.65 0 0 0 1-1.51V4a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33L16 5.2A2 2 0 1 1 19.4 8l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H22a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    default: return null;
  }
};

function Nav({href, icon, children, onClick, active}) {
  return (
    <li>
      <Link href={href} onClick={onClick} className="btn" aria-current={active ? "page" : undefined}>
        <Icon name={icon} /> <span>{children}</span>
      </Link>
    </li>
  );
}

export default function Sidebar(){
  const { open, close } = useSidebar();
  const path = usePathname();

  const items = [
    {href:"/chat", icon:"plus", label:"New chat"},
    {href:"/", icon:"home", label:"Home"},
    {href:"/chat", icon:"chat", label:"Chat"},
    {href:"/reviews", icon:"star", label:"Reviews"},
    {href:"/carys", icon:"info", label:"About Carys"},
    {href:"/terms", icon:"doc", label:"Terms"},
    {href:"/privacy", icon:"shield", label:"Privacy"},
    {href:"/billing", icon:"credit", label:"Billing"},
    {href:"/settings", icon:"settings", label:"Settings"},
  ];

  return (
    <>
      <div className={`sidebar-overlay ${open ? "open":""}`} onClick={close}/>
      <aside className={`sidebar-drawer ${open ? "open":""}`}>
        <ul className="menu">
          {items.map(i => (
            <Nav key={i.href} href={i.href} icon={i.icon} onClick={close} active={path===i.href}>
              {i.label}
            </Nav>
          ))}
        </ul>
      </aside>
    </>
  );
}
