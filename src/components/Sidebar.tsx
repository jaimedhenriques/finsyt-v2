'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { icon: '▣', label: 'Overview',      href: '/dashboard' },
  { icon: '◎', label: 'Watchlist',     href: '/dashboard/watchlist' },
  { icon: '◈', label: 'AI Insights',   href: '/dashboard/insights' },
  { icon: '◉', label: 'Alerts',        href: '/dashboard/alerts' },
  { icon: '⊞', label: 'Integrations',  href: '/dashboard/integrations' },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside className="w-56 shrink-0 flex flex-col"
      style={{ background: '#090d18', borderRight: '1px solid #1a2540', minHeight: '100vh' }}>
      <div className="px-4 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center font-black text-white text-sm">F</div>
          <span className="font-bold text-base tracking-tight">Finsyt</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-0.5">
        {NAV.map(item => (
          <Link key={item.href} href={item.href}
            className={`nav-link ${path === item.href ? 'active' : ''}`}>
            <span className="text-sm w-5 text-center">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3" style={{ borderTop: '1px solid #1a2540' }}>
        <Link href="/settings" className={`nav-link ${path === '/settings' ? 'active' : ''}`}>
          <span className="text-sm">⚙</span> Settings
        </Link>
        <div className="mt-3 px-3 py-2.5 rounded-xl" style={{ background: '#0e1424', border: '1px solid #1a2540' }}>
          <div className="text-xs font-semibold mb-0.5" style={{ color: '#6b7a99' }}>Pro Plan</div>
          <div className="text-sm font-semibold truncate">Jaime H.</div>
        </div>
      </div>
    </aside>
  )
}
