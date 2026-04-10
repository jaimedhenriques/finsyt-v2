'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'

const WATCHLIST = [
  { t: 'SPY',    n: 'S&P 500 ETF',       p: '521.34', ch: '+1.24%',  up: true },
  { t: 'BTC',    n: 'Bitcoin / USD',      p: '68,420', ch: '+3.41%',  up: true },
  { t: 'EURUSD', n: 'Euro / US Dollar',   p: '1.0842', ch: '−0.31%',  up: false },
  { t: 'GLD',    n: 'Gold ETF',           p: '218.56', ch: '+0.82%',  up: true },
  { t: 'TLT',    n: '20yr Treasury ETF',  p: '94.12',  ch: '−0.47%',  up: false },
]

const INSIGHTS = [
  { tag: 'MACRO',    tc: '#3b82f6', title: 'US CPI beats estimates — markets reprice Fed rate cuts', t: '2m ago',   imp: 'High' },
  { tag: 'EARNINGS', tc: '#8b5cf6', title: 'NVIDIA Q1 beat: revenue +262% YoY, full-year guidance raised', t: '18m ago',  imp: 'High' },
  { tag: 'MACRO',    tc: '#0d9488', title: 'ECB signals pause in rate cuts — services inflation remains sticky', t: '1h ago',   imp: 'Med' },
  { tag: 'SIGNAL',   tc: '#f59e0b', title: 'USD/JPY hits 158 — BOJ intervention risk elevated', t: '3h ago',   imp: 'Med' },
]

const BARS = [32, 40, 36, 52, 46, 62, 57, 70, 64, 78, 73, 86, 82, 93, 89, 98, 91, 100]
const PERIODS = ['1W', '1M', '3M', '1Y', 'All']

export default function Dashboard() {
  const [period, setPeriod] = useState('1M')

  return (
    <AppShell>
      {/* Topbar */}
      <div className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between"
        style={{ background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <h1 className="font-extrabold text-lg text-white tracking-tight">Good afternoon, Jaime</h1>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Friday, 10 Apr 2026 · London markets close in 1h 40m</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span>🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-black text-white"
              style={{ background: '#1a4fff', fontSize: 9 }}>3</span>
          </button>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>J</div>
        </div>
      </div>

      <div className="p-8">
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { l: 'Portfolio Value', v: '$2.41M',  ch: '+$28.4K today',       up: true  },
            { l: 'Active Signals',  v: '47',       ch: '+12 since yesterday',  up: true  },
            { l: 'AI Insights',     v: '18 new',   ch: 'Updated 2 min ago',    up: null  },
            { l: 'Open Alerts',     v: '3',        ch: '2 high priority',       up: false },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl p-5"
              style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.3)' }}>{m.l}</div>
              <div className="text-2xl font-black text-white tracking-tight mb-1">{m.v}</div>
              <div className="text-xs" style={{
                color: m.up === true ? '#4ade80' : m.up === false ? '#f87171' : 'rgba(255,255,255,0.3)'
              }}>{m.ch}</div>
            </div>
          ))}
        </div>

        {/* Chart + Watchlist */}
        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          {/* Chart */}
          <div className="lg:col-span-2 rounded-2xl p-6"
            style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <div className="font-bold text-white">Portfolio Performance</div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Total value over time</div>
              </div>
              <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {PERIODS.map(t => (
                  <button key={t} onClick={() => setPeriod(t)}
                    className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                    style={period === t
                      ? { background: '#1a4fff', color: '#fff' }
                      : { background: 'transparent', color: 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-1.5" style={{ height: '9rem' }}>
              {BARS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${h}%`,
                    background: i === BARS.length - 1
                      ? 'linear-gradient(180deg,#1a4fff,#00c2a8)'
                      : `linear-gradient(180deg, rgba(26,79,255,${0.3 + h / 200}), rgba(0,194,168,${0.2 + h / 250}))`,
                  }} />
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              <span>Mar 10</span><span>Mar 20</span><span>Apr 1</span><span>Apr 10</span>
            </div>
          </div>

          {/* Watchlist */}
          <div className="rounded-2xl p-5"
            style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="font-bold text-white">Watchlist</div>
              <button className="btn btn-blue btn-sm">+ Add</button>
            </div>
            <div className="flex flex-col">
              {WATCHLIST.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3.5"
                  style={{ borderBottom: i < WATCHLIST.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div className="flex gap-3 items-center">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black"
                      style={{ background: 'rgba(26,79,255,0.1)', color: '#93c5fd', fontSize: 8, letterSpacing: '-0.02em' }}>
                      {s.t}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{s.t}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.n}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{s.p}</div>
                    <div className="text-xs" style={{ color: s.up ? '#4ade80' : '#f87171' }}>{s.ch}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="rounded-2xl p-6"
          style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="font-bold text-white">AI Insights Feed</div>
            <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
              View all →
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {INSIGHTS.map((ins, i) => (
              <div key={i} className="p-4 rounded-xl cursor-pointer transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(26,79,255,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${ins.tc}14`, color: ins.tc }}>{ins.tag}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={ins.imp === 'High'
                      ? { background: 'rgba(239,68,68,0.1)', color: '#f87171' }
                      : { background: 'rgba(245,158,11,0.1)', color: '#fbbf24' }}>
                    {ins.imp} impact
                  </span>
                  <span className="text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.2)' }}>{ins.t}</span>
                </div>
                <div className="text-sm font-semibold text-white leading-snug">{ins.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
