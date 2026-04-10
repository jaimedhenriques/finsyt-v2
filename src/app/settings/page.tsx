'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'

const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
  <button onClick={onClick} className="relative rounded-full border-none outline-none cursor-pointer transition-all duration-200"
    style={{ width: 44, height: 24, background: on ? 'linear-gradient(135deg,#2563eb,#0d9488)' : '#1a2540' }}>
    <div className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
      style={{ left: on ? 24 : 4 }} />
  </button>
)

export default function Settings() {
  const [tab, setTab] = useState('Profile')
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ name: 'Jaime Henriques', email: 'jaimedhenriques@gmail.com', company: 'Finsyt', tz: 'Europe/London' })
  const [notifs, setNotifs] = useState({ price: true, ai: true, macro: true, digest: true, email: true, slack: true, push: false })
  const p = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setProfile(prev => ({ ...prev, [k]: e.target.value }))
  const n = (k: string) => setNotifs(prev => ({ ...prev, [k]: !prev[k as keyof typeof prev] }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <AppShell>
      <div className="p-8 max-w-2xl">
        <div className="mb-7">
          <h1 className="text-2xl font-black tracking-tight mb-1">Settings</h1>
          <p className="text-sm" style={{ color: '#6b7a99' }}>Manage your account, notifications, and billing.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-8 w-fit"
          style={{ background: '#0e1424', border: '1px solid #1a2540' }}>
          {['Profile', 'Notifications', 'Billing'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`btn btn-sm ${t === tab ? 'btn-primary' : 'btn-ghost'}`}>{t}</button>
          ))}
        </div>

        {tab === 'Profile' && (
          <div className="flex flex-col gap-5">
            <div className="card">
              <div className="flex items-center gap-4 pb-6 mb-6" style={{ borderBottom: '1px solid #1a2540' }}>
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center font-black text-2xl shadow-lg">J</div>
                <div>
                  <div className="font-bold text-base mb-0.5">{profile.name}</div>
                  <div className="text-xs mb-3" style={{ color: '#6b7a99' }}>{profile.email}</div>
                  <button className="btn btn-outline btn-sm">Change photo</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {([['Full name', 'name', 'text'], ['Company', 'company', 'text'], ['Email', 'email', 'email']] as [string, string, string][]).map(([label, key, type]) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: '#6b7a99' }}>{label}</label>
                    <input className="input" type={type} value={profile[key as keyof typeof profile]} onChange={p(key)} />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: '#6b7a99' }}>Timezone</label>
                  <select className="input" value={profile.tz} onChange={p('tz')}
                    style={{ cursor: 'pointer' }}>
                    <option value="Europe/London">Europe/London (GMT+1)</option>
                    <option value="America/New_York">America/New_York (GMT-4)</option>
                    <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn btn-primary" onClick={save}>Save changes</button>
              {saved && <span className="text-sm font-semibold" style={{ color: '#2dd4bf' }}>✓ Saved!</span>}
            </div>
          </div>
        )}

        {tab === 'Notifications' && (
          <div className="flex flex-col gap-5">
            <div className="card">
              <div className="font-bold text-sm mb-5">Alert types</div>
              {[
                { k: 'price', l: 'Price alerts', d: 'When a watchlist item crosses a threshold' },
                { k: 'ai', l: 'AI insights', d: 'When new AI-generated insights arrive' },
                { k: 'macro', l: 'Macro events', d: 'Key economic releases and central bank decisions' },
                { k: 'digest', l: 'Weekly digest', d: 'Summary of your top signals every Monday' },
              ].map(({ k, l, d }) => (
                <div key={k} className="flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid rgba(26,37,64,0.6)' }}>
                  <div>
                    <div className="text-sm font-semibold mb-0.5">{l}</div>
                    <div className="text-xs" style={{ color: '#6b7a99' }}>{d}</div>
                  </div>
                  <Toggle on={notifs[k as keyof typeof notifs]} onClick={() => n(k)} />
                </div>
              ))}
            </div>
            <div className="card">
              <div className="font-bold text-sm mb-5">Channels</div>
              {[
                { k: 'email', l: 'Email', i: '📧' },
                { k: 'slack', l: 'Slack', i: '💬' },
                { k: 'push', l: 'Push', i: '📱' },
              ].map(({ k, l, i }) => (
                <div key={k} className="flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid rgba(26,37,64,0.6)' }}>
                  <div className="flex gap-3 items-center">
                    <span className="text-xl">{i}</span>
                    <div className="text-sm font-semibold">{l}</div>
                  </div>
                  <Toggle on={notifs[k as keyof typeof notifs]} onClick={() => n(k)} />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="btn btn-primary" onClick={save}>Save preferences</button>
              {saved && <span className="text-sm font-semibold" style={{ color: '#2dd4bf' }}>✓ Saved!</span>}
            </div>
          </div>
        )}

        {tab === 'Billing' && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-6"
              style={{ background: '#0e1424', border: '1px solid rgba(37,99,235,0.4)', boxShadow: '0 0 30px rgba(37,99,235,0.06)' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#60a5fa' }}>Current Plan</div>
                  <div className="font-black tracking-tight" style={{ fontSize: '2rem' }}>
                    Pro <span className="text-base font-normal" style={{ color: '#6b7a99' }}>· $49/mo</span>
                  </div>
                </div>
                <span className="badge" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>Active</span>
              </div>
              <div className="text-xs mb-5" style={{ color: '#6b7a99' }}>Renews May 10, 2026 · Monthly billing</div>
              <div className="flex gap-3">
                <button className="btn btn-primary btn-sm">Upgrade to Team</button>
                <button className="btn btn-outline btn-sm">Cancel plan</button>
              </div>
            </div>
            <div className="card">
              <div className="font-bold text-sm mb-4">Invoice history</div>
              {[['Apr 10, 2026', '$49.00'], ['Mar 10, 2026', '$49.00'], ['Feb 10, 2026', '$49.00']].map(([date, amt], i) => (
                <div key={i} className="flex items-center justify-between py-3.5"
                  style={{ borderBottom: i < 2 ? '1px solid rgba(26,37,64,0.6)' : 'none' }}>
                  <div>
                    <div className="text-sm font-semibold mb-1">Pro Plan · {date}</div>
                    <span className="badge" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80' }}>Paid</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{amt}</span>
                    <button className="btn btn-outline btn-sm">PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
