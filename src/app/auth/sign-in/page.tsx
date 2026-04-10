'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: '#fff', color: '#0a0e1a' }}>
      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-16"
        style={{ background: '#0a0e1a' }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg"
            style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>F</div>
          <span className="font-extrabold text-xl text-white tracking-tight">Finsyt</span>
        </Link>

        <div>
          <h2 className="font-black text-white leading-tight tracking-tight mb-8"
            style={{ fontSize: '2.5rem', letterSpacing: '-0.03em' }}>
            The intelligence workspace<br />for operators who<br />
            <span style={{ color: '#1a4fff' }}>move fast.</span>
          </h2>
          <div className="rounded-2xl p-6 mb-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
              &ldquo;Finsyt replaced three tools and cut our weekly market review from 4 hours to 45 minutes.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>S</div>
              <div>
                <div className="text-sm font-semibold text-white">Sarah K.</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>CFO, Series B SaaS</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {[['500+', 'Beta users'], ['50+', 'Data sources'], ['$49', 'Starting /mo']].map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-black text-white">{v}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-10 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
                style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>F</div>
              <span className="font-bold text-lg">Finsyt</span>
            </Link>
          </div>

          <h1 className="font-extrabold text-2xl tracking-tight mb-2">Welcome back</h1>
          <p className="body-sm mb-8">Sign in to your workspace.</p>

          <div className="flex flex-col gap-3 mb-6">
            {[['G', 'Continue with Google'], ['in', 'Continue with LinkedIn']].map(([icon, label]) => (
              <button key={label} className="btn btn-ghost w-full" style={{ justifyContent: 'center' }}>
                <span className="font-black text-sm">{icon}</span>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: '#e4e8f0' }} />
            <span className="text-xs" style={{ color: '#b0bcd4' }}>or</span>
            <div className="flex-1 h-px" style={{ background: '#e4e8f0' }} />
          </div>

          {done ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-5">✓</div>
              <div className="font-bold text-xl mb-4">Signed in!</div>
              <Link href="/dashboard" className="btn btn-blue">Go to dashboard →</Link>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setDone(true) }} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: '#3a4460' }}>Work email</label>
                <input className="input" type="email" placeholder="you@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold" style={{ color: '#3a4460' }}>Password</label>
                  <Link href="#" className="text-xs" style={{ color: '#1a4fff' }}>Forgot password?</Link>
                </div>
                <input className="input" type="password" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-blue mt-1">Log In →</button>
            </form>
          )}

          <p className="text-center text-sm mt-6 body-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/sign-up" style={{ color: '#1a4fff', fontWeight: 600 }}>Get started free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
