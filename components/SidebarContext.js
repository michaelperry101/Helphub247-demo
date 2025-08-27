"use client";
import { createContext, useContext, useState, useCallback } from "react";

const SidebarCtx = createContext({ isOpen:false, setIsOpen:()=>{}, open:()=>{}, close:()=>{}, toggle:()=>{} });
export const useSidebar = () => useContext(SidebarCtx);

export default function SidebarProvider({ children }){
  const [isOpen, setIsOpen] = useState(false);
  const open  = useCallback(()=>setIsOpen(true),[]);
  const close = useCallback(()=>setIsOpen(false),[]);
  const toggle= useCallback(()=>setIsOpen(v=>!v),[]);
  return (
    <SidebarCtx.Provider value={{ isOpen, setIsOpen, open, close, toggle }}>
      {children}
    </SidebarCtx.Provider>
  );
}
