'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'

const WATCHLIST = [
  { t: 'SPY',    name: 'S&P 500 ETF',    price: '521.34', ch: '+1.2%',  up: true },
  { t: 'BTC',    name: 'Bitcoin',         price: '68,420', ch: '+3.4%',  up: true },
  { t: 'EURUSD', name: 'EUR/USD',         price: '1.0842', ch: '-0.3%',  up: false },
  { t: 'GLD',    name: 'Gold ETF',        price: '218.56', ch: '+0.8%',  up: true },
  { t: 'TLT',    name: '20yr Treasury',   price: '94.12',  ch: '-0.5%',  up: false },
]

const INSIGHTS = [
  { tag: 'MACRO',    col: '#3b82f6', title: 'US CPI beats estimates — markets reprice rate cuts', t: '2m ago',  impact: 'High' },
  { tag: 'EARNINGS', col: '#8b5cf6', title: 'NVIDIA Q1 beat: revenue +262% YoY, stock +8% AH',   t: '18m ago', impact: 'High' },
  { tag: 'GLOBAL',   col: '#0d9488', title: 'ECB signals pause in rate cuts — services CPI sticky', t: '1h ago',  impact: 'Med' },
  { tag: 'SIGNAL',   col: '#f59e0b', title: 'USD/JPY at 158 — BOJ intervention risk elevated',     t: '3h ago',  impact: 'Med' },
]

const BARS = [30, 38, 35, 50, 44, 60, 55, 68, 62, 76, 71, 84, 80, 91, 87, 96, 90, 100]

export default function Dashboard() {
  const [period, setPeriod] = useState('1M')

  return (
    <AppShell>
      {/* Topbar */}
      <div className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between"
        style={{ background: 'rgba(9,13,24,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a2540' }}>
        <div>
          <h1 className="text-xl font-black tracking-tight">Good afternoon, Jaime 👋</h1>
          <p className="text-xs mt-0.5" style={{ color: '#6b7a99' }}>Friday, 10 April 2026 · Markets open</p>
        </div>
        <div className="flex gap-2.5 items-center">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center relative"
            style={{ background: '#0e1424', border: '1px solid #1a2540' }}>
            🔔
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-bg flex items-center justify-center font-black"
              style={{ fontSize: '9px' }}>3</span>
          </button>
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-black text-sm">J</div>
        </div>
      </div>

      <div className="p-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { l: 'Portfolio Value', v: '$2.41M', ch: '+$28.4K today', up: true },
            { l: 'Active Signals',  v: '47',     ch: '+12 since yesterday', up: true },
            { l: 'AI Insights',     v: '18 new', ch: 'Updated 2 min ago', up: null },
            { l: 'Alerts',          v: '3',      ch: '2 high priority', up: false },
          ].map((m, i) => (
            <div key={i} className="card">
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6b7a99' }}>{m.l}</div>
              <div className="text-2xl font-black tracking-tight mb-1">{m.v}</div>
              <div className="text-xs" style={{ color: m.up === true ? '#4ade80' : m.up === false ? '#f87171' : '#6b7a99' }}>{m.ch}</div>
            </div>
          ))}
        </div>

        {/* Chart + Watchlist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <div className="font-bold">Portfolio Performance</div>
                <div className="text-xs mt-0.5" style={{ color: '#6b7a99' }}>Last 30 days</div>
              </div>
              <div className="flex gap-1">
                {['1W', '1M', '3M', '1Y'].map(t => (
                  <button key={t} onClick={() => setPeriod(t)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={period === t
                      ? { background: '#2563eb', color: '#fff' }
                      : { border: '1px solid #1a2540', color: '#6b7a99' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-1" style={{ height: '9rem' }}>
              {BARS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, background: 'linear-gradient(180deg,#3b82f6,#0d9488)', opacity: i === BARS.length - 1 ? 1 : 0.5 }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs" style={{ color: '#2a3450' }}>
              <span>Mar 10</span><span>Mar 20</span><span>Apr 1</span><span>Apr 10</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold">Watchlist</div>
              <button className="btn btn-primary btn-sm">+ Add</button>
            </div>
            {WATCHLIST.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3"
                style={{ borderBottom: i < WATCHLIST.length - 1 ? '1px solid rgba(26,37,64,0.6)' : 'none' }}>
                <div className="flex gap-2.5 items-center">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black"
                    style={{ background: '#090d18', border: '1px solid #1a2540', color: '#60a5fa', fontSize: '8px' }}>
                    {s.t}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{s.t}</div>
                    <div className="text-xs" style={{ color: '#6b7a99' }}>{s.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{s.price}</div>
                  <div className="text-xs" style={{ color: s.up ? '#4ade80' : '#f87171' }}>{s.ch}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card">
          <div className="font-bold mb-4">AI Insights Feed</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INSIGHTS.map((ins, i) => (
              <div key={i} className="p-4 rounded-xl cursor-pointer"
                style={{ background: '#090d18', border: '1px solid #1a2540' }}>
                <div className="flex gap-2 items-center mb-2.5 flex-wrap">
                  <span className="badge" style={{ background: `${ins.col}15`, color: ins.col }}>{ins.tag}</span>
                  <span className="badge" style={ins.impact === 'High'
                    ? { background: 'rgba(239,68,68,0.1)', color: '#f87171' }
                    : { background: 'rgba(245,158,11,0.1)', color: '#fbbf24' }}>
                    {ins.impact} impact
                  </span>
                  <span className="text-xs ml-auto" style={{ color: '#2a3450' }}>{ins.t}</span>
                </div>
                <div className="text-sm font-semibold leading-snug">{ins.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
