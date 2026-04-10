import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Finsyt — AI Financial Intelligence', template: '%s | Finsyt' },
  description: 'The AI-powered financial intelligence workspace for founders, operators, and analysts.',
  openGraph: {
    siteName: 'Finsyt',
    type: 'website',
  },
  metadataBase: new URL('https://finsyt.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
