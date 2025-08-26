// app/layout.js
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Helphub247 — Carys",
  description: "24/7 UK AI helpline.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Sidebar />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
