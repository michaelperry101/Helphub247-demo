import './globals.css'
import dynamic from 'next/dynamic'
const Header = dynamic(()=>import('../components/Header'), { ssr:false })
const Sidebar = dynamic(()=>import('../components/Sidebar'), { ssr:false })
export const metadata = { title: 'Helphub247 — CARYS', description: '24/7 AI helpline' }
export default function RootLayout({ children }){
  return (<html lang="en"><body><Header/><div className="layout"><Sidebar/><main className="main">{children}</main></div></body></html>)
}
