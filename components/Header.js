'use client'
import Image from 'next/image'
import Link from 'next/link'
export default function Header(){
  const toggle = ()=> document.querySelector('.sidebar')?.classList.toggle('open')
  return (
    <header className="header">
      <div className="header-inner">
        <button onClick={toggle} className="btn" aria-label="Menu">☰</button>
        <div style={{flex:1,display:'flex',justifyContent:'center'}}>
          <Image src="/logo.svg" alt="Helphub247" width={160} height={36} priority />
        </div>
      </div>
    </header>
  )
}
