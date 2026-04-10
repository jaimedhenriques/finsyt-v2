'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { useDashboard } from '@/lib/hooks'

const WATCHLIST = [
  { t: 'SPY',    name: 'S&P 500 ETF',    price: '521.34', ch: '+1.2%',  up: true },
  { t: 'BTC',    name: 'Bitcoin',         price: '68,420', ch: '+3.4%',  up: true },
  { t: 'EURUSD', name: 'EUR/USD',         price: '1.0842', ch: '-0.3%',  up: false },
  { t: 'GLD',    name: 'Gold ETF',        price: '218.56', ch: '+0.8%',  up: true },
  { t: 'TLT',    name: '20yr Treasury',   price: '94.12',  ch: '-0.5%',  up: false },
]

const BARS = [30, 38, 35, 50, 44, 60, 55, 68, 62, 76, 71, 84, 80, 91, 87, 96, 90, 100]

const SIGNAL_COLORS: Record<string, string> = {
  positive: '#4ade80',
  negative: '#f87171',
  neutral: '#fbbf24'
}

const IMPACT_STYLES: Record<string, { bg: string; color: string }> = {
  high: { bg: 'rgba(239,68,68,0.1)', color: '#f87171' },
  medium: { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24' },
  low: { bg: 'rgba(96,165,250,0.1)', color: '#60a5fa' }
}

export default function Dashboard() {
  const [period, setPeriod] = useState('1M')
  const { data, loading, error, refetch } = useDashboard()

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
            {
              l: 'Countries Tracked',
              v: loading ? '...' : `${data?.countries?.length || 0}`,
              ch: 'Real-time World Bank data',
              up: null
            },
            {
              l: 'Active Signals',
              v: loading ? '...' : `${data?.summary?.signalCount || 0}`,
              ch: `${data?.summary?.highImpactSignals || 0} high impact`,
              up: data?.summary?.highImpactSignals ? false : null
            },
            {
              l: 'Indicators',
              v: loading ? '...' : `${data?.summary?.totalIndicators || 0}`,
              ch: `${data?.summary?.positiveChanges || 0} positive trends`,
              up: (data?.summary?.positiveChanges || 0) > (data?.summary?.negativeChanges || 0)
            },
            {
              l: 'Data Sources',
              v: '50+',
              ch: 'IMF, BIS, World Bank',
              up: null
            },
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

        {/* AI Insights - World Bank Macro Signals */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-bold">Macro Signals</div>
              <div className="text-xs mt-0.5" style={{ color: '#6b7a99' }}>
                {loading ? 'Loading...' : `${data?.summary?.signalCount || 0} signals from World Bank data`}
              </div>
            </div>
            <button onClick={refetch} className="btn btn-primary btn-sm" disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl mb-3" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <div className="text-sm text-red-400">Error loading signals: {error}</div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl animate-pulse"
                  style={{ background: '#090d18', border: '1px solid #1a2540' }}>
                  <div className="h-4 w-24 rounded mb-3" style={{ background: '#1a2540' }} />
                  <div className="h-4 w-full rounded mb-2" style={{ background: '#1a2540' }} />
                  <div className="h-4 w-3/4 rounded" style={{ background: '#1a2540' }} />
                </div>
              ))
            ) : data?.signals?.length ? (
              data.signals.slice(0, 8).map((signal) => (
                <div key={signal.id} className="p-4 rounded-xl cursor-pointer hover:border-blue-500/50 transition-colors"
                  style={{ background: '#090d18', border: '1px solid #1a2540' }}>
                  <div className="flex gap-2 items-center mb-2.5 flex-wrap">
                    <span className="badge" style={{
                      background: `${SIGNAL_COLORS[signal.type]}15`,
                      color: SIGNAL_COLORS[signal.type]
                    }}>
                      {signal.country}
                    </span>
                    <span className="badge" style={IMPACT_STYLES[signal.impact]}>
                      {signal.impact} impact
                    </span>
                    <span className="text-xs ml-auto" style={{ color: '#2a3450' }}>
                      {signal.indicator}
                    </span>
                  </div>
                  <div className="text-sm font-semibold leading-snug">{signal.title}</div>
                  <div className="text-xs mt-2" style={{ color: '#6b7a99' }}>
                    {signal.data.changePercent >= 0 ? '+' : ''}{signal.data.changePercent.toFixed(1)}% YoY
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-sm" style={{ color: '#6b7a99' }}>
                No signals available. Data may still be loading from World Bank API.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
