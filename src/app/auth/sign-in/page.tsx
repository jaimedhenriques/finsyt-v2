'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: '#090d18', color: '#e8edf8' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: '#0e1424', borderRight: '1px solid #1a2540' }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-56 rounded-full blur-3xl"
          style={{ background: 'rgba(37,99,235,0.07)' }} />

        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-black text-white text-lg">F</div>
          <span className="font-black text-xl tracking-tight">Finsyt</span>
        </Link>

        <div>
          <h2 className="font-black leading-tight tracking-tight mb-8" style={{ fontSize: '2.25rem' }}>
            The intelligence workspace<br />for operators who<br />
            <span className="gradient-text">move fast.</span>
          </h2>
          <div className="card mb-8">
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#c8d4ec' }}>
              &ldquo;Finsyt replaced three separate tools. Our macro review went from 2 hours to 15 minutes.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center font-bold text-sm">S</div>
              <div>
                <div className="text-sm font-semibold">Sarah K.</div>
                <div className="text-xs" style={{ color: '#6b7a99' }}>CFO, Series B SaaS</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {[['500+', 'Beta users'], ['50+', 'Data sources'], ['$49', 'Starting /mo']].map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-black gradient-text">{v}</div>
              <div className="text-xs" style={{ color: '#6b7a99' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-10 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center font-black text-white text-sm">F</div>
              <span className="font-black text-lg">Finsyt</span>
            </Link>
          </div>

          <h1 className="text-2xl font-black tracking-tight mb-2">Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: '#6b7a99' }}>Sign in to your workspace.</p>

          {/* Social */}
          <div className="flex flex-col gap-3 mb-6">
            {[['G', 'Google'], ['in', 'LinkedIn']].map(([icon, label]) => (
              <button key={label} className="btn btn-outline" style={{ justifyContent: 'center', fontSize: '0.875rem' }}>
                <span className="font-black">{icon}</span> Continue with {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: '#1a2540' }} />
            <span className="text-xs" style={{ color: '#2a3450' }}>or email</span>
            <div className="flex-1 h-px" style={{ background: '#1a2540' }} />
          </div>

          {done ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✓</div>
              <div className="font-bold text-lg mb-3">Signed in!</div>
              <Link href="/dashboard" className="btn btn-primary">Go to dashboard →</Link>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setDone(true) }} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: '#6b7a99' }}>Email</label>
                <input className="input" type="email" placeholder="you@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold" style={{ color: '#6b7a99' }}>Password</label>
                  <Link href="#" className="text-xs" style={{ color: '#60a5fa' }}>Forgot?</Link>
                </div>
                <input className="input" type="password" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary mt-1">Sign in →</button>
            </form>
          )}
          <p className="text-center text-sm mt-6" style={{ color: '#6b7a99' }}>
            No account? <Link href="/auth/sign-up" style={{ color: '#60a5fa' }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
