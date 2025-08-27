import "./globals.css";
import dynamic from "next/dynamic";
import SidebarProvider from "@/components/SidebarContext";
import ThemeProvider from "@/components/ThemeProvider";

const Header  = dynamic(()=>import("@/components/Header"),  { ssr:false });
const Sidebar = dynamic(()=>import("@/components/Sidebar"), { ssr:false });

export const metadata = { title: "HelpHub 24/7 — Carys" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SidebarProvider>
            <Header />
            <div className="layout">
              <Sidebar />
              <main>{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
