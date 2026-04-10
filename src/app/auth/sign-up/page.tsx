'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [done, setDone] = useState(false)
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-16"
      style={{ background: '#f7f8fc', color: '#0a0e1a' }}>
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg"
              style={{ background: 'linear-gradient(135deg,#1a4fff,#00c2a8)' }}>F</div>
            <span className="font-extrabold text-xl tracking-tight">Finsyt</span>
          </Link>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          <h1 className="font-extrabold text-2xl tracking-tight mb-1.5">Create your account</h1>
          <p className="body-sm mb-8">14-day free trial. No credit card required.</p>

          <div className="flex flex-col gap-3 mb-6">
            {[['G', 'Continue with Google'], ['in', 'Continue with LinkedIn']].map(([icon, label]) => (
              <button key={label} className="btn btn-ghost w-full" style={{ justifyContent: 'center' }}>
                <span className="font-black text-sm">{icon}</span>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: '#e4e8f0' }} />
            <span className="text-xs" style={{ color: '#b0bcd4' }}>or sign up with email</span>
            <div className="flex-1 h-px" style={{ background: '#e4e8f0' }} />
          </div>

          {done ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-5">🎉</div>
              <div className="font-bold text-xl mb-3">Account created!</div>
              <p className="body-sm mb-7">Check your email to verify your address.</p>
              <Link href="/dashboard" className="btn btn-blue">Go to dashboard →</Link>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setDone(true) }} className="flex flex-col gap-5">
              {([
                ['Full name', 'text', 'name', 'Jaime Henriques'],
                ['Work email', 'email', 'email', 'you@company.com'],
                ['Password', 'password', 'password', 'Min. 8 characters'],
              ] as [string, string, string, string][]).map(([label, type, key, ph]) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: '#3a4460' }}>{label}</label>
                  <input className="input" type={type} placeholder={ph}
                    value={form[key as keyof typeof form]} onChange={set(key)} required />
                </div>
              ))}
              <button type="submit" className="btn btn-blue mt-1">Create account →</button>
              <p className="text-xs text-center" style={{ color: '#b0bcd4' }}>
                By signing up you agree to our{' '}
                <a href="#" style={{ color: '#1a4fff' }}>Terms</a> and{' '}
                <a href="#" style={{ color: '#1a4fff' }}>Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>

        <p className="text-center body-sm mt-6">
          Already have an account?{' '}
          <Link href="/auth/sign-in" style={{ color: '#1a4fff', fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}
