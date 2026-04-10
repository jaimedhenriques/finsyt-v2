'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [done, setDone] = useState(false)
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ background: '#090d18', color: '#e8edf8' }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center font-black text-white text-sm">F</div>
            <span className="font-black text-lg">Finsyt</span>
          </Link>
        </div>

        <h1 className="text-2xl font-black tracking-tight mb-2">Create your account</h1>
        <p className="text-sm mb-8" style={{ color: '#6b7a99' }}>14-day free trial. No credit card required.</p>

        {done ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <div className="font-bold text-lg mb-2">Account created!</div>
            <p className="text-sm mb-6" style={{ color: '#6b7a99' }}>Check your email to verify your account.</p>
            <Link href="/dashboard" className="btn btn-primary">Go to dashboard →</Link>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setDone(true) }} className="flex flex-col gap-4">
            {([['Full name', 'text', 'name', 'Jaime Henriques'], ['Work email', 'email', 'email', 'you@company.com'], ['Password', 'password', 'password', 'Min. 8 characters']] as [string, string, string, string][]).map(([label, type, key, ph]) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: '#6b7a99' }}>{label}</label>
                <input className="input" type={type} placeholder={ph}
                  value={form[key as keyof typeof form]} onChange={set(key)} required />
              </div>
            ))}
            <button type="submit" className="btn btn-primary mt-1">Create account →</button>
            <p className="text-xs text-center" style={{ color: '#2a3450' }}>
              By signing up you agree to our Terms and Privacy Policy.
            </p>
          </form>
        )}
        <p className="text-center text-sm mt-6" style={{ color: '#6b7a99' }}>
          Already have an account? <Link href="/auth/sign-in" style={{ color: '#60a5fa' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
