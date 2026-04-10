'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'

const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
  <button onClick={onClick}
    className="toggle"
    style={{ background: on ? '#1a4fff' : 'rgba(255,255,255,0.12)' }}>
    <div className="toggle-thumb" style={{ left: on ? 24 : 4 }} />
  </button>
)

export default function Settings() {
  const [tab, setTab] = useState('Profile')
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Jaime Henriques', email: 'jaimedhenriques@gmail.com',
    company: 'Finsyt', tz: 'Europe/London'
  })
  const [n, setN] = useState({ price: true, ai: true, macro: true, digest: true, email: true, slack: true, push: false })
  const pChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setProfile(p => ({ ...p, [k]: e.target.value }))
  const nToggle = (k: string) => setN(p => ({ ...p, [k]: !p[k as keyof typeof p] }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  const TABS = ['Profile', 'Notifications', 'Billing', 'API']

  return (
    <AppShell>
      <div className="p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="font-extrabold text-2xl text-white tracking-tight mb-1.5">Settings</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Manage your account, preferences, and billing.</p>
        </div>

        <div className="flex gap-1 p-1 rounded-xl mb-8 w-fit"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="btn btn-sm"
              style={t === tab
                ? { background: '#1a4fff', color: '#fff', border: 'none' }
                : { background: 'transparent', color: 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'Profile' && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-7" style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-5 pb-7 mb-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>J</div>
                <div>
                  <div className="font-bold text-base text-white mb-0.5">{profile.name}</div>
                  <div className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>{profile.email}</div>
                  <button className="btn btn-sm"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    Change photo
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {([['Full name','name','text'],['Company','company','text'],['Email','email','email']] as [string,string,string][]).map(([label,key,type]) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</label>
                    <input className="input" type={type} value={profile[key as keyof typeof profile]} onChange={pChange(key)}
                      style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>Timezone</label>
                  <select className="input" value={profile.tz} onChange={pChange('tz')}
                    style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}>
                    <option value="Europe/London">Europe/London (GMT+1)</option>
                    <option value="America/New_York">America/New_York (GMT-4)</option>
                    <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn btn-blue" onClick={save}>Save changes</button>
              {saved && <span className="text-sm font-semibold" style={{ color: '#00c2a8' }}>✓ Saved</span>}
            </div>
          </div>
        )}

        {tab === 'Notifications' && (
          <div className="flex flex-col gap-5">
            {[
              { title: 'Alert types', items: [
                { k: 'price', l: 'Price alerts', d: 'When a watchlist item crosses a threshold' },
                { k: 'ai', l: 'AI insights', d: 'When new AI-generated insights arrive' },
                { k: 'macro', l: 'Macro events', d: 'Key economic releases and central bank decisions' },
                { k: 'digest', l: 'Weekly digest', d: 'Summary of your top signals every Monday' },
              ]},
              { title: 'Channels', items: [
                { k: 'email', l: 'Email', d: 'Alerts sent to your registered email' },
                { k: 'slack', l: 'Slack', d: 'Delivered to your connected Slack workspace' },
                { k: 'push', l: 'Push notifications', d: 'Mobile and desktop push' },
              ]},
            ].map(section => (
              <div key={section.title} className="rounded-2xl p-6" style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="font-semibold text-white mb-5 text-sm">{section.title}</div>
                {section.items.map(({ k, l, d }, i, arr) => (
                  <div key={k} className="flex items-center justify-between py-4"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5">{l}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{d}</div>
                    </div>
                    <Toggle on={n[k as keyof typeof n]} onClick={() => nToggle(k)} />
                  </div>
                ))}
              </div>
            ))}
            <div className="flex items-center gap-3">
              <button className="btn btn-blue" onClick={save}>Save preferences</button>
              {saved && <span className="text-sm font-semibold" style={{ color: '#00c2a8' }}>✓ Saved</span>}
            </div>
          </div>
        )}

        {tab === 'Billing' && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-7" style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="label mb-3" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.625rem' }}>Current Plan</div>
                  <div className="font-black text-3xl text-white tracking-tight mb-1">
                    Pro <span className="text-base font-normal" style={{ color: 'rgba(255,255,255,0.35)' }}>· $49/mo</span>
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Renews May 10, 2026 · Monthly billing</div>
                </div>
                <span className="badge badge-green">Active</span>
              </div>
              <div className="flex gap-3 mt-5">
                <button className="btn btn-blue btn-sm">Upgrade to Team</button>
                <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Cancel plan
                </button>
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="font-semibold text-white mb-5 text-sm">Invoice history</div>
              {[['Apr 10, 2026','$49.00'],['Mar 10, 2026','$49.00'],['Feb 10, 2026','$49.00']].map(([date,amt],i) => (
                <div key={i} className="flex items-center justify-between py-4"
                  style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1.5">Pro Plan · {date}</div>
                    <span className="badge badge-green" style={{ fontSize: '0.6875rem' }}>Paid</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">{amt}</span>
                    <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'API' && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-7" style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="font-semibold text-white mb-2">API Key</div>
              <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Use your API key to access the Finsyt REST API.</p>
              <div className="flex gap-2">
                <input className="input flex-1" readOnly value="fs_live_•••••••••••••••••••••••" type="password"
                  style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                <button className="btn btn-blue btn-sm shrink-0">Reveal</button>
                <button className="btn btn-sm shrink-0" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Rotate
                </button>
              </div>
            </div>
            <div className="rounded-2xl p-7" style={{ background: '#101829', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="font-semibold text-white mb-5">Usage this month</div>
              <div className="grid grid-cols-3 gap-4">
                {[['API calls','2,841','/ 50k'],['Data points','184k','/ 1M'],['Webhooks','12','/ unlimited']].map(([l,v,m]) => (
                  <div key={l}>
                    <div className="text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{l}</div>
                    <div className="text-xl font-black text-white mb-0.5">{v}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{m}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
