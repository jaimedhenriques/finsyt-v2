'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const FEATURES = [
  { icon: '⚡', title: 'Real-time signal monitoring', desc: 'Track macro and company signals the moment they move — no more checking 5 dashboards.' },
  { icon: '🤖', title: 'AI that reads the data', desc: "Finsyt's AI goes source-deep and surfaces what actually matters, ranked by your watchlist." },
  { icon: '🌍', title: '190+ countries, 50+ sources', desc: 'IMF, BIS, Fed, ECB — unified, normalised, continuously updated.' },
  { icon: '📊', title: 'Interactive charts', desc: 'Slice any indicator by country, region, or time. One click to export.' },
  { icon: '🔔', title: 'Smart alerts', desc: 'Set thresholds on any signal. Get notified via email, Slack, or mobile.' },
  { icon: '⚙️', title: 'Built for operators', desc: 'AlphaSense costs $20k/yr. Finsyt starts at $49/mo — and does more.' },
]

const BARS = [30, 38, 35, 50, 44, 60, 55, 68, 62, 76, 71, 84, 80, 91, 87, 96, 90, 100]

export default function Landing() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <div style={{ background: '#090d18', color: '#e8edf8', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,0.09), transparent)' }} />

        <div className="max-w-4xl mx-auto relative">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: '#0e1424', border: '1px solid #1a2540', color: '#6b7a99' }}>
            <span className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#14b8a6', boxShadow: '0 0 6px rgba(20,184,166,0.8)' }} />
            Private beta — join the waitlist
          </div>

          <h1 className="font-black leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', lineHeight: 1.02 }}>
            The intelligence edge.<br />
            <span className="gradient-text">Without the Wall St. price.</span>
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: '#8898b8' }}>
            Finsyt is the AI-powered financial intelligence workspace for founders, operators, and analysts. Real-time signals, AI insights, and workflow tools — from data to decision in minutes.
          </p>

          {joined ? (
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl mb-6"
              style={{ background: '#0e1424', border: '1px solid rgba(13,148,136,0.4)' }}>
              <span style={{ color: '#2dd4bf', fontWeight: 700 }}>✓ You&apos;re on the list — we&apos;ll be in touch!</span>
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); if (email) setJoined(true) }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <input type="email" required placeholder="Enter your work email"
                value={email} onChange={e => setEmail(e.target.value)}
                className="input" style={{ maxWidth: '22rem' }} />
              <button type="submit" className="btn btn-primary">Join the waitlist →</button>
            </form>
          )}
          <p className="text-xs" style={{ color: '#2a3450' }}>No credit card · 14-day free trial on Pro</p>
        </div>

        {/* Dashboard mockup */}
        <div className="max-w-4xl mx-auto mt-20 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: '#0e1424', border: '1px solid #1a2540', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
          <div className="flex items-center gap-1.5 px-5 py-4" style={{ borderBottom: '1px solid #1a2540' }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
            <div className="flex-1 flex justify-center">
              <div className="rounded-lg px-5 py-1 text-xs" style={{ background: '#090d18', border: '1px solid #1a2540', color: '#2a3450' }}>
                app.finsyt.com/dashboard
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { l: 'Portfolio', v: '$2.41M', ch: '+3.2% today', up: true },
                { l: 'Signals', v: '47 active', ch: '+12 new', up: true },
                { l: 'AI Insights', v: '18 new', ch: 'Updated 2m ago', up: null },
                { l: 'Alerts', v: '3 active', ch: '2 high priority', up: false },
              ].map((m, i) => (
                <div key={i} className="card-sm">
                  <div className="text-xs mb-2 font-semibold" style={{ color: '#6b7a99' }}>{m.l}</div>
                  <div className="text-xl font-black mb-1">{m.v}</div>
                  <div className="text-xs" style={{ color: m.up === true ? '#4ade80' : m.up === false ? '#f87171' : '#6b7a99' }}>{m.ch}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 flex items-end gap-1"
              style={{ background: '#090d18', border: '1px solid #1a2540', height: '7rem' }}>
              {BARS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, background: 'linear-gradient(180deg,#3b82f6,#0d9488)', opacity: 0.8 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ borderTop: '1px solid #1a2540', borderBottom: '1px solid #1a2540', background: 'rgba(14,20,36,0.5)' }}>
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[['50+', 'Data sources'], ['190+', 'Countries'], ['2.4M+', 'Daily signals'], ['$49', 'Starting /mo']].map(([v, l]) => (
            <div key={l}>
              <div className="text-3xl font-black mb-1 gradient-text">{v}</div>
              <div className="text-sm" style={{ color: '#6b7a99' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>Features</div>
            <h2 className="font-black tracking-tight" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}>
              Everything you need to move fast
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="card card-hover" style={{ cursor: 'default' }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8898b8' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: '1px solid #1a2540' }} className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-black tracking-tight mb-5" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
            Ready to move at the<br /><span className="gradient-text">speed of insight?</span>
          </h2>
          <p className="mb-10" style={{ color: '#8898b8' }}>Join hundreds of founders and analysts already on the waitlist.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/sign-up" className="btn btn-primary">Start free trial →</Link>
            <Link href="/pricing" className="btn btn-outline">See pricing</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #1a2540' }} className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center font-black text-white text-xs">F</div>
            <span className="font-bold">Finsyt</span>
          </div>
          <div className="flex gap-6 text-sm" style={{ color: '#6b7a99' }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" style={{ transition: 'color 0.12s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e8edf8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6b7a99')}>{l}</a>
            ))}
          </div>
          <div className="text-xs" style={{ color: '#2a3450' }}>© 2026 Finsyt</div>
        </div>
      </footer>
    </div>
  )
}
