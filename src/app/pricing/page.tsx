'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const TIERS = [
  {
    name: 'Free', mo: 0, yr: 0,
    desc: 'For individuals getting started.',
    cta: 'Get started free', to: '/auth/sign-up',
    features: ['5 watchlist items', 'Daily AI digest', '10 data searches/mo', 'Email alerts', '1 connected source'],
    locked: ['Real-time AI insights', 'Slack alerts', 'API access', 'Team features'],
  },
  {
    name: 'Pro', mo: 49, yr: 39,
    desc: 'For founders and analysts who need the full picture.',
    cta: 'Start 14-day free trial', to: '/auth/sign-up',
    badge: 'Most popular', highlight: true,
    features: ['Unlimited watchlist', 'Real-time AI insights', 'Unlimited data explorer', 'Email + Slack alerts', '10 connected sources', 'CSV / JSON export', 'Priority support'],
    locked: ['Team collaboration', 'Full API access', 'SSO'],
  },
  {
    name: 'Team', mo: 149, yr: 119,
    desc: 'For investment teams who move together.',
    cta: 'Talk to sales', to: 'mailto:hello@finsyt.com',
    features: ['Everything in Pro', 'Up to 15 members', 'Shared watchlists', 'Unlimited sources', 'Full REST API', 'SSO / SAML', 'Dedicated manager'],
    locked: [],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div style={{ background: '#090d18', color: '#e8edf8', minHeight: '100vh' }}>
      <Navbar />

      <section className="pt-32 pb-12 px-6 text-center">
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>Pricing</div>
        <h1 className="font-black tracking-tight mb-4" style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)' }}>
          Simple, honest <span className="gradient-text">pricing</span>
        </h1>
        <p className="text-lg max-w-md mx-auto mb-10" style={{ color: '#8898b8' }}>
          Start free. No sales call. No hidden fees.
        </p>

        {/* Toggle */}
        <div className="inline-flex p-1 rounded-xl gap-1"
          style={{ background: '#0e1424', border: '1px solid #1a2540' }}>
          {['Monthly', 'Annual'].map((t, i) => (
            <button key={t}
              onClick={() => setAnnual(i === 1)}
              className={`btn btn-sm ${i === 1 === annual ? 'btn-primary' : 'btn-ghost'}`}>
              {t} {i === 1 && <span className="text-xs opacity-70 ml-1">−20%</span>}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          {TIERS.map((tier, i) => (
            <div key={i} className="rounded-2xl p-7 relative"
              style={tier.highlight
                ? { background: '#0e1424', border: '1px solid rgba(37,99,235,0.45)', boxShadow: '0 0 50px rgba(37,99,235,0.08)' }
                : { background: '#121929', border: '1px solid #1a2540' }}>
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-bg text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  {tier.badge}
                </div>
              )}
              <div className="font-bold text-lg mb-1">{tier.name}</div>
              <div className="text-xs mb-6" style={{ color: '#6b7a99' }}>{tier.desc}</div>
              <div className="mb-7">
                <span className="font-black" style={{ fontSize: '2.75rem' }}>
                  ${annual ? tier.yr : tier.mo}
                </span>
                <span className="text-sm ml-1" style={{ color: '#6b7a99' }}>{tier.mo > 0 ? '/mo' : 'free'}</span>
                {annual && tier.mo > 0 && (
                  <div className="text-xs mt-1" style={{ color: '#2dd4bf' }}>
                    Billed annually · save ${(tier.mo - tier.yr) * 12}/yr
                  </div>
                )}
              </div>
              <Link href={tier.to}
                className={`btn ${tier.highlight ? 'btn-primary' : 'btn-outline'} w-full mb-6`}
                style={{ display: 'flex' }}>
                {tier.cta}
              </Link>
              <div className="flex flex-col gap-2.5" style={{ borderTop: '1px solid #1a2540', paddingTop: '1.25rem' }}>
                {tier.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm" style={{ color: '#c8d4ec' }}>
                    <span style={{ color: '#2dd4bf', flexShrink: 0 }}>✓</span> {f}
                  </div>
                ))}
                {tier.locked.map((f, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm" style={{ color: '#2a3450' }}>
                    <span style={{ flexShrink: 0 }}>—</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-16 px-6" style={{ borderTop: '1px solid #1a2540' }}>
        <h2 className="text-2xl font-black mb-3">Questions?</h2>
        <p className="mb-7" style={{ color: '#8898b8' }}>Happy to help you pick the right plan.</p>
        <a href="mailto:hello@finsyt.com" className="btn btn-primary">Talk to us →</a>
      </section>
    </div>
  )
}
