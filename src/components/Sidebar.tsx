'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { icon: '▣', label: 'Overview',     href: '/dashboard' },
  { icon: '◎', label: 'Watchlist',    href: '/dashboard/watchlist' },
  { icon: '◈', label: 'AI Insights',  href: '/dashboard/insights' },
  { icon: '◉', label: 'Alerts',       href: '/dashboard/alerts' },
  { icon: '⊞', label: 'Reports',      href: '/dashboard/reports' },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside className="app-sidebar w-[220px] flex flex-col shrink-0">
      <div className="px-4 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs"
            style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>F</div>
          <span className="font-bold text-[0.9375rem] text-white tracking-tight">Finsyt</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        {NAV.map(item => (
          <Link key={item.href} href={item.href}
            className={`app-nav-link ${path === item.href ? 'active' : ''}`}>
            <span className="text-sm w-4 text-center opacity-60">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/settings" className={`app-nav-link ${path === '/settings' ? 'active' : ''}`}>
          <span className="text-sm opacity-60">⚙</span> Settings
        </Link>
        <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="label mb-1" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.625rem' }}>Pro Plan</div>
          <div className="text-sm font-semibold text-white truncate">Jaime H.</div>
        </div>
      </div>
    </aside>
  )
}
