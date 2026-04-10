'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const LINKS = [
  ['Features', '#features'],
  ['Pricing', '/pricing'],
  ['Dashboard', '/dashboard'],
]

export default function Navbar() {
  const [blur, setBlur] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setBlur(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={blur ? {
        background: 'rgba(9,13,24,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1a2540',
      } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center font-black text-white text-sm shadow-lg">F</div>
          <span className="font-bold text-lg tracking-tight text-white">Finsyt</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(([l, h]) => (
            <Link key={l} href={h}
              className="btn btn-ghost text-sm">{l}</Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/auth/sign-in" className="btn btn-outline btn-sm">Sign in</Link>
          <Link href="/auth/sign-up" className="btn btn-primary btn-sm">Get started</Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
          <span className="block w-5 h-0.5 bg-gray-400" />
          <span className="block w-5 h-0.5 bg-gray-400" />
          <span className="block w-4 h-0.5 bg-gray-400" />
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-1"
          style={{ background: 'rgba(9,13,24,0.97)', borderBottom: '1px solid #1a2540' }}>
          {LINKS.map(([l, h]) => (
            <Link key={l} href={h} className="nav-link" onClick={() => setOpen(false)}>{l}</Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #1a2540' }}>
            <Link href="/auth/sign-in" className="btn btn-outline" onClick={() => setOpen(false)}>Sign in</Link>
            <Link href="/auth/sign-up" className="btn btn-primary" onClick={() => setOpen(false)}>Get started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
