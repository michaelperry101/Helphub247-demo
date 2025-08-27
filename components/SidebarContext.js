"use client";
import { createContext, useContext, useState, useCallback } from "react";
const SidebarCtx = createContext({open:false, openSidebar:()=>{}, closeSidebar:()=>{}, toggleSidebar:()=>{}});
export const useSidebar = () => useContext(SidebarCtx);
export default function SidebarProvider({children}){
  const [open,setOpen] = useState(false);
  const openSidebar = useCallback(()=>setOpen(true),[]);
  const closeSidebar = useCallback(()=>setOpen(false),[]);
  const toggleSidebar = useCallback(()=>setOpen(v=>!v),[]);
  return (
    <SidebarCtx.Provider value={{open,openSidebar,closeSidebar,toggleSidebar}}>
      {children}
    </SidebarCtx.Provider>
  );
}
