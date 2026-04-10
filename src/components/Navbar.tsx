'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [shadow, setShadow] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setShadow(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-white transition-all duration-200"
      style={shadow ? { boxShadow: '0 1px 0 #e4e8f0, 0 2px 12px rgba(10,14,26,0.06)' } : { borderBottom: '1px solid #e4e8f0' }}
    >
      <div className="container" style={{ maxWidth: 1200 }}>
        <div className="flex items-center h-[68px] gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #1a4fff, #00c2a8)' }}>F</div>
            <span className="font-extrabold text-[1.0625rem] tracking-tight text-[#0a0e1a]">Finsyt</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1">
            {NAV.map(n => (
              <Link key={n.label} href={n.href} className="nav-link">{n.label}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Link href="/auth/sign-in" className="nav-link font-semibold" style={{ borderBottom: 'none', padding: '0.375rem 0.75rem' }}>
              Log In →
            </Link>
            <Link href="/auth/sign-up" className="btn btn-blue btn-sm">Get Started for Free</Link>
          </div>

          {/* Mobile */}
          <button className="md:hidden ml-auto p-2 rounded-lg" onClick={() => setOpen(!open)}
            style={{ border: '1.5px solid #e4e8f0' }}>
            <div className="flex flex-col gap-1.5">
              <span className="block w-4.5 h-0.5 bg-[#3a4460]" style={{ width: 18 }} />
              <span className="block w-4.5 h-0.5 bg-[#3a4460]" style={{ width: 18 }} />
              <span className="block w-3 h-0.5 bg-[#3a4460]" style={{ width: 12 }} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white px-6 pb-6 flex flex-col gap-1"
          style={{ borderTop: '1px solid #e4e8f0' }}>
          {NAV.map(n => (
            <Link key={n.label} href={n.href}
              className="py-3 font-medium text-[#3a4460] border-b border-[#e4e8f0]"
              onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <Link href="/auth/sign-in" className="btn btn-ghost" onClick={() => setOpen(false)}>Log In</Link>
            <Link href="/auth/sign-up" className="btn btn-blue" onClick={() => setOpen(false)}>Get Started for Free</Link>
          </div>
        </div>
      )}
    </header>
  )
}
