import type { Metadata } from 'next'
import { Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-syne',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'CORI — Risk Inference Control Infrastructure',
  description: 'Privacy is already lost. You are just measuring it too late.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  )
}
