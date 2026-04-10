'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const TIERS = [
  {
    name: 'Starter',
    mo: 0, yr: 0,
    desc: 'For individuals exploring financial intelligence.',
    cta: 'Get started free',
    to: '/auth/sign-up',
    features: [
      '5 watchlist items',
      'Daily AI digest',
      '10 document searches / month',
      'Email alerts',
      '1 data integration',
    ],
    missing: ['Real-time AI insights', 'Unlimited searches', 'Slack + mobile alerts', 'API access', 'Team workspace'],
  },
  {
    name: 'Pro',
    mo: 49, yr: 39,
    desc: 'For founders and analysts who need the full picture.',
    cta: 'Start 14-day free trial',
    to: '/auth/sign-up',
    badge: 'Most popular',
    highlight: true,
    features: [
      'Unlimited watchlist',
      'Real-time AI insights with citations',
      'Unlimited document searches',
      'Email + Slack + mobile alerts',
      '10 data integrations',
      'CSV / JSON / PDF export',
      'Priority support',
    ],
    missing: ['Team workspace', 'Full API access', 'SSO / SAML'],
  },
  {
    name: 'Team',
    mo: 149, yr: 119,
    desc: 'For investment teams who move together.',
    cta: 'Talk to sales',
    to: 'mailto:hello@finsyt.com',
    features: [
      'Everything in Pro',
      'Up to 20 team members',
      'Shared watchlists & workspaces',
      'Unlimited integrations',
      'Full REST API',
      'SSO / SAML',
      'Dedicated success manager',
      'SLA & audit logs',
    ],
    missing: [],
  },
]

const FAQ = [
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your settings page with no questions asked. Your data is exported and yours to keep.' },
  { q: 'Is there a free trial on Pro?', a: 'Yes — 14 days on the Pro plan, no credit card required.' },
  { q: "What's included in 'AI insights with citations'?", a: 'Every AI-generated insight links directly to the source document, paragraph, or filing so you can verify and drill in.' },
  { q: 'How does billing work?', a: 'Monthly or annual billing. Annual plans save 20% and can be changed at any time.' },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: '#fff', color: '#0a0e1a', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 text-center" style={{ borderBottom: '1px solid #e4e8f0' }}>
        <div className="container-narrow">
          <p className="label accent mb-5">Pricing</p>
          <h1 className="display mb-5">Simple, honest pricing</h1>
          <p className="body-lg mb-10" style={{ maxWidth: '28rem', margin: '0 auto 2.5rem' }}>
            Start free. No sales call. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="inline-flex p-1 rounded-xl gap-1"
            style={{ background: '#f4f6fb', border: '1.5px solid #e4e8f0' }}>
            {(['Monthly', 'Annual'] as const).map((t, i) => (
              <button key={t}
                onClick={() => setAnnual(i === 1)}
                className="btn btn-sm transition-all"
                style={i === 1 === annual
                  ? { background: '#fff', color: '#0a0e1a', boxShadow: '0 1px 4px rgba(10,14,26,0.1)', border: '1.5px solid #e4e8f0' }
                  : { background: 'transparent', color: '#8491ad', border: '1.5px solid transparent' }}>
                {t}{i === 1 && <span className="text-xs ml-1.5 font-normal" style={{ color: '#059669' }}>−20%</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section">
        <div className="container" style={{ maxWidth: 1120 }}>
          <div className="grid md:grid-cols-3 gap-5">
            {TIERS.map((tier, i) => (
              <div key={i} className="rounded-2xl relative flex flex-col"
                style={tier.highlight
                  ? { background: '#0a0e1a', border: '2px solid rgba(26,79,255,0.5)', boxShadow: '0 20px 60px rgba(26,79,255,0.1)' }
                  : { background: '#fff', border: '1.5px solid #e4e8f0' }}>
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>
                    {tier.badge}
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="font-bold text-lg mb-1" style={{ color: tier.highlight ? '#fff' : '#0a0e1a' }}>{tier.name}</div>
                  <div className="text-sm mb-7" style={{ color: tier.highlight ? 'rgba(255,255,255,0.45)' : '#8491ad' }}>{tier.desc}</div>
                  <div className="mb-8">
                    <span className="font-black" style={{ fontSize: '3rem', color: tier.highlight ? '#fff' : '#0a0e1a', letterSpacing: '-0.03em' }}>
                      ${annual ? tier.yr : tier.mo}
                    </span>
                    <span className="text-sm ml-1" style={{ color: tier.highlight ? 'rgba(255,255,255,0.4)' : '#8491ad' }}>
                      {tier.mo > 0 ? '/mo' : 'free forever'}
                    </span>
                    {annual && tier.mo > 0 && (
                      <div className="text-xs mt-1.5" style={{ color: '#059669' }}>
                        Billed annually · save ${(tier.mo - tier.yr) * 12}/yr
                      </div>
                    )}
                  </div>
                  <Link href={tier.to}
                    className={`btn ${tier.highlight ? 'btn-blue' : 'btn-ghost'} mb-8`}
                    style={{ justifyContent: 'center', display: 'flex' }}>
                    {tier.cta}
                  </Link>
                  <div className="flex flex-col gap-3 flex-1"
                    style={{ borderTop: `1px solid ${tier.highlight ? 'rgba(255,255,255,0.08)' : '#e4e8f0'}`, paddingTop: '1.75rem' }}>
                    {tier.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-2.5 text-sm">
                        <span className="shrink-0 mt-0.5" style={{ color: '#1a4fff' }}>✓</span>
                        <span style={{ color: tier.highlight ? 'rgba(255,255,255,0.8)' : '#3a4460' }}>{f}</span>
                      </div>
                    ))}
                    {tier.missing.map((f, j) => (
                      <div key={j} className="flex items-start gap-2.5 text-sm">
                        <span className="shrink-0 mt-0.5" style={{ color: '#d0d7e8' }}>—</span>
                        <span style={{ color: tier.highlight ? 'rgba(255,255,255,0.2)' : '#c0c9d8' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: '#f7f8fc', borderTop: '1px solid #e4e8f0' }}>
        <div className="container-narrow">
          <h2 className="heading-lg mb-12 text-center">Frequently asked questions</h2>
          <div className="flex flex-col" style={{ border: '1.5px solid #e4e8f0', borderRadius: 16, overflow: 'hidden', background: '#fff' }}>
            {FAQ.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQ.length - 1 ? '1px solid #e4e8f0' : 'none' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-8 py-5 flex items-center justify-between gap-4"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <span className="font-semibold" style={{ color: '#0a0e1a' }}>{faq.q}</span>
                  <span className="text-xl shrink-0" style={{ color: '#8491ad', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.15s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 body-md" style={{ color: '#3a4460' }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ borderTop: '1px solid #e4e8f0', textAlign: 'center' }}>
        <div className="container-narrow">
          <h2 className="heading-lg mb-4">Still have questions?</h2>
          <p className="body-lg mb-8">Our team is happy to help you find the right plan.</p>
          <a href="mailto:hello@finsyt.com" className="btn btn-blue">Talk to us →</a>
        </div>
      </section>
    </div>
  )
}
