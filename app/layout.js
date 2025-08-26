import './globals.css'
import dynamic from 'next/dynamic'

// Lazy load Header and Sidebar (avoids hydration issues)
const Header = dynamic(() => import('../components/Header'), { ssr: false })
const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

export const metadata = {
  title: 'HelpHub 24/7',
  description: '24/7 UK AI helpline with Carys – chat, voice, uploads, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header at the top */}
        <Header />

        {/* Main grid: Sidebar + Content */}
        <div className="layout">
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
