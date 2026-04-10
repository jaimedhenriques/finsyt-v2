'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const LOGOS = ['Goldman Sachs', 'JPMorgan', 'Blackrock', 'Sequoia', 'a16z', 'KKR', 'Bridgewater', 'Citadel']

const FEATURES = [
  {
    tag: '01',
    title: 'The most trusted financial data, unified',
    body: "500M+ premium documents — earnings calls, filings, broker research, expert transcripts, and macro data — all normalised and searchable in seconds. No more toggling between Bloomberg, FactSet, and PDFs.",
    img: true,
  },
  {
    tag: '02',
    title: 'AI that reasons, not just retrieves',
    body: "Finsyt's multi-agent AI reads across your entire content universe, cross-references sources, and delivers cited, verifiable answers. No hallucinations. Every claim traceable to a primary source.",
    img: true,
  },
  {
    tag: '03',
    title: 'From signal to decision in minutes',
    body: "Set watchlists, configure alerts, and let Finsyt surface the events that matter — before they move markets. Your morning briefing writes itself.",
    img: true,
  },
]

const TESTIMONIALS = [
  {
    quote: "Finsyt replaced three tools and cut our weekly market review from 4 hours to 45 minutes. The AI citations alone make it worth it.",
    name: 'Sarah K.',
    role: 'CFO',
    co: 'Series B SaaS',
  },
  {
    quote: "We use it every morning before the open. The macro signal feed is unlike anything else at this price point.",
    name: 'Marcus T.',
    role: 'Portfolio Manager',
    co: 'L/S Equity Fund',
  },
  {
    quote: "Finally a tool built for operators, not just quants. The search quality is exceptional.",
    name: 'Priya N.',
    role: 'Head of Strategy',
    co: 'Global Consulting Firm',
  },
]

const STATS = [
  { v: '500M+', l: 'Premium documents' },
  { v: '6,500+', l: 'Enterprise customers' },
  { v: '190+', l: 'Countries covered' },
  { v: '<2min', l: 'Avg. time to insight' },
]

function ScreenMock() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d1221' }}>
        {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md text-xs"
            style={{ background: '#161d30', color: '#4a5578', border: '1px solid rgba(255,255,255,0.05)' }}>
            app.finsyt.com
          </div>
        </div>
      </div>
      {/* App chrome */}
      <div className="flex" style={{ height: '340px' }}>
        {/* Sidebar */}
        <div className="w-44 shrink-0 p-3 flex flex-col gap-0.5" style={{ background: '#080c16', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-2 px-2 py-3 mb-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center font-black text-white text-xs"
              style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>F</div>
            <span className="text-xs font-bold text-white">Finsyt</span>
          </div>
          {['Overview','Watchlist','AI Insights','Alerts','Reports'].map((l, i) => (
            <div key={l} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs"
              style={{
                color: i === 2 ? '#93c5fd' : 'rgba(255,255,255,0.35)',
                background: i === 2 ? 'rgba(26,79,255,0.15)' : 'transparent',
                fontWeight: i === 2 ? 600 : 400,
              }}>{l}</div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-5 overflow-hidden">
          <div className="text-sm font-bold text-white mb-4">AI Insights — Today</div>
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[
              { l: 'Signals', v: '47', up: true },
              { l: 'Alerts', v: '3', up: false },
              { l: 'Docs read', v: '2.1k', up: null },
            ].map((m) => (
              <div key={m.l} className="rounded-xl p-3" style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{m.l}</div>
                <div className="text-lg font-black text-white">{m.v}</div>
                <div className="text-xs mt-0.5" style={{ color: m.up === true ? '#4ade80' : m.up === false ? '#f87171' : 'rgba(255,255,255,0.25)' }}>
                  {m.up === true ? '▲ 12 new' : m.up === false ? '2 high' : 'updated 1m ago'}
                </div>
              </div>
            ))}
          </div>
          {[
            { tag: 'MACRO', col: '#3b82f6', text: 'US CPI beats — markets reprice Fed cuts timeline', t: '2m' },
            { tag: 'EARNINGS', col: '#8b5cf6', text: 'NVIDIA Q1 beat: revenue +262% YoY, guidance raised', t: '18m' },
            { tag: 'MACRO', col: '#0d9488', text: 'ECB signals pause in rate cuts, services inflation sticky', t: '1h' },
          ].map((ins, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl mb-2"
              style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-xs font-bold px-2 py-0.5 rounded mt-0.5"
                style={{ background: `${ins.col}18`, color: ins.col, flexShrink: 0 }}>{ins.tag}</span>
              <div className="text-xs text-white flex-1 leading-relaxed">{ins.text}</div>
              <span className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>{ins.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <div style={{ background: '#fff', color: '#0a0e1a' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-32 pb-0" style={{ borderBottom: '1px solid #e4e8f0' }}>
        <div className="container" style={{ maxWidth: 1120 }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center pb-20">
            {/* Left */}
            <div>
              <div className="badge badge-blue mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" style={{ background: '#1a4fff' }} />
                Now in private beta
              </div>

              <h1 className="display mb-7">
                Accelerate decisions with<br />
                <span className="accent">AI insights you can trust</span>
              </h1>

              <p className="body-lg mb-10 max-w-lg">
                Your biggest decisions deserve the most trusted AI platform for financial intelligence. See why the best teams choose Finsyt.
              </p>

              {joined ? (
                <div className="flex items-center gap-3 mb-5 p-4 rounded-xl"
                  style={{ background: '#ecfdf5', border: '1px solid rgba(5,150,105,0.2)' }}>
                  <span className="text-green-600 font-bold">✓ You&apos;re on the list.</span>
                  <span className="text-sm text-green-700">We&apos;ll be in touch soon.</span>
                </div>
              ) : (
                <form
                  onSubmit={e => { e.preventDefault(); if (email) setJoined(true) }}
                  className="flex gap-3 flex-col sm:flex-row mb-5">
                  <input type="email" required placeholder="Enter your work email"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="input" style={{ maxWidth: '20rem' }} />
                  <button type="submit" className="btn btn-blue shrink-0">Get Started for Free →</button>
                </form>
              )}
              <Link href="#" className="btn btn-text">
                Take the Tour <span>→</span>
              </Link>
            </div>

            {/* Right — Screen mock */}
            <div className="hidden lg:block">
              <ScreenMock />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="section-sm" style={{ background: '#f7f8fc', borderBottom: '1px solid #e4e8f0' }}>
        <div className="container" style={{ maxWidth: 1120 }}>
          <p className="label text-center mb-10" style={{ color: '#8491ad' }}>
            Trusted by the world&apos;s leading investment firms
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-14">
            {LOGOS.map(l => (
              <div key={l} className="text-sm font-bold tracking-wide" style={{ color: '#b0bcd4', letterSpacing: '0.04em' }}>
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section-sm" style={{ borderBottom: '1px solid #e4e8f0' }}>
        <div className="container" style={{ maxWidth: 1120 }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map(s => (
              <div key={s.l} className="text-center">
                <div className="heading-lg accent mb-2">{s.v}</div>
                <div className="body-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES ── */}
      <section className="section" id="platform">
        <div className="container" style={{ maxWidth: 1120 }}>
          <div className="container-narrow mb-16" style={{ padding: 0 }}>
            <p className="label accent mb-4">The Platform</p>
            <h2 className="heading-lg mb-5">AI workflows built for your market</h2>
            <p className="body-lg" style={{ maxWidth: '34rem' }}>
              Finsyt unifies your entire research process — from data ingestion to AI synthesis to decision-ready output.
            </p>
          </div>

          <div className="flex flex-col gap-0" style={{ border: '1.5px solid #e4e8f0', borderRadius: 20, overflow: 'hidden' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-0"
                style={{ borderBottom: i < FEATURES.length - 1 ? '1.5px solid #e4e8f0' : 'none' }}>
                {/* Text */}
                <div className="p-10 lg:p-14 flex flex-col justify-center"
                  style={{ borderRight: '1.5px solid #e4e8f0' }}>
                  <div className="label accent mb-5">{f.tag}</div>
                  <h3 className="heading-md mb-4">{f.title}</h3>
                  <p className="body-md" style={{ maxWidth: '26rem' }}>{f.body}</p>
                  <Link href="#" className="btn btn-text mt-7">Learn more →</Link>
                </div>
                {/* Visual */}
                <div className="p-10 flex items-center justify-center min-h-[280px]"
                  style={{ background: '#f7f8fc' }}>
                  <div className="w-full max-w-sm rounded-2xl overflow-hidden"
                    style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                    {/* Fake UI block */}
                    <div className="p-5">
                      <div className="h-2.5 rounded-full w-3/4 mb-3" style={{ background: 'rgba(255,255,255,0.12)' }} />
                      <div className="h-2 rounded-full w-full mb-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
                      <div className="h-2 rounded-full w-5/6 mb-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
                      <div className="h-2 rounded-full w-2/3 mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
                      <div className="flex gap-2">
                        {[
                          { c: '#1a4fff', w: '40%' },
                          { c: '#00c2a8', w: '28%' },
                          { c: 'rgba(255,255,255,0.12)', w: '20%' },
                        ].map((b, j) => (
                          <div key={j} className="rounded-lg h-16"
                            style={{ width: b.w, background: b.c, opacity: j === 0 ? 1 : j === 1 ? 0.8 : 1 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="section" id="solutions" style={{ background: '#f7f8fc', borderTop: '1px solid #e4e8f0', borderBottom: '1px solid #e4e8f0' }}>
        <div className="container" style={{ maxWidth: 1120 }}>
          <p className="label accent mb-4 text-center">Solutions</p>
          <h2 className="heading-lg mb-4 text-center">Built for every team that moves markets</h2>
          <p className="body-lg mb-14 text-center" style={{ maxWidth: '36rem', margin: '0 auto 3.5rem' }}>
            Whether you&apos;re running a fund, advising on deals, or building strategy — Finsyt has a workflow for you.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {['Investment Banking', 'Hedge Funds', 'Private Equity', 'Asset Management', 'Consulting', 'Corporate Strategy', 'Life Sciences', 'Tech & Telecom'].map((s, i) => (
              <div key={i} className="card card-hover p-5 cursor-pointer"
                style={{ background: '#fff' }}>
                <div className="label accent mb-3 text-[10px]">Solution</div>
                <div className="font-semibold text-sm leading-snug" style={{ color: '#0a0e1a' }}>{s}</div>
                <Link href="#" className="btn btn-text mt-3" style={{ fontSize: '0.8125rem' }}>Explore →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 1120 }}>
          <p className="label accent mb-4 text-center">What customers say</p>
          <h2 className="heading-lg mb-14 text-center">Teams that move on insight, not instinct</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card flex flex-col justify-between">
                <p className="body-md mb-8 leading-relaxed" style={{ color: '#3a4460', fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: '#eef2ff', color: '#1a4fff' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs" style={{ color: '#8491ad' }}>{t.role}, {t.co}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: '#0a0e1a' }}>
        <div className="container-narrow text-center">
          <p className="label mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>Get Started</p>
          <h2 className="heading-lg mb-6" style={{ color: '#fff' }}>
            Transform intelligence<br />into advantage
          </h2>
          <p className="body-lg mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Develop bold strategies, seize opportunities, and lead with clarity and confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up" className="btn btn-blue">Get Started for Free →</Link>
            <Link href="/pricing" className="btn"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', padding: '0.8125rem 1.75rem', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 8 }}>
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080c16', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container py-14" style={{ maxWidth: 1120 }}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs"
                  style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>F</div>
                <span className="font-bold text-white text-sm">Finsyt</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                AI-powered financial intelligence for the teams that move markets.
              </p>
            </div>
            {[
              { h: 'Platform', links: ['Features', 'Security', 'Integrations', 'Pricing'] },
              { h: 'Solutions', links: ['Hedge Funds', 'Private Equity', 'Consulting', 'Corporate'] },
              { h: 'Resources', links: ['Blog', 'Case Studies', 'Documentation', 'API'] },
              { h: 'Company', links: ['About', 'Careers', 'Contact', 'Legal'] },
            ].map(col => (
              <div key={col.h}>
                <div className="text-xs font-bold uppercase tracking-widest mb-5"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>{col.h}</div>
                <div className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <a key={l} href="#"
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="divider mb-8" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2026 Finsyt, Inc. All rights reserved.</span>
            <div className="flex gap-6 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {['Privacy Policy', 'Terms', 'Cookies'].map(l => (
                <a key={l} href="#"
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
