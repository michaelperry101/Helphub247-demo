"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeCtx = createContext({ theme:"light", toggle:()=>{} });
export const useTheme = () => useContext(ThemeCtx);

export default function ThemeProvider({ children }){
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("hh_theme") : null;
    const initial = saved || "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);
  const toggle = useCallback(() => {
    setTheme(t => {
      const next = t === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try{ localStorage.setItem("hh_theme", next); }catch{}
      return next;
    });
  }, []);
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
