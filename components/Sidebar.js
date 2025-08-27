"use client";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";
import { usePathname } from "next/navigation";

const items = [
  {href:"/chat", label:"New chat", icon:"➕"},
  {href:"/", label:"Home", icon:"🏠"},
  {href:"/chat", label:"Chat", icon:"💬"},
  {href:"/reviews", label:"Reviews", icon:"⭐"},
  {href:"/carys", label:"About Carys", icon:"👩‍💻"},
  {href:"/terms", label:"Terms", icon:"📜"},
  {href:"/privacy", label:"Privacy", icon:"🔒"},
  {href:"/billing", label:"Billing", icon:"💳"},
  {href:"/subscribe", label:"Subscribe", icon:"🧾"},
  {href:"/settings", label:"Settings", icon:"⚙️"},
];

export default function Sidebar(){
  const { isOpen, setIsOpen } = useSidebar();
  const path = usePathname();
  const close = () => setIsOpen(false);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={close} />
      <aside className={`sidebar-drawer ${isOpen ? "open" : ""}`}>
        <ul className="menu">
          {items.map(i=>(
            <li key={i.href}>
              <Link
                href={i.href}
                className="btn"
                aria-current={path===i.href?'page':undefined}
                onClick={close}
              >
                <span className="icon">{i.icon}</span>
                <span>{i.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
