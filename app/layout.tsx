import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({ 
  subsets: ["latin"],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vahy — L\'IA au chevet de Madagascar',
  description: 'Vahy est une plateforme MedTech révolutionnaire qui combine l\'intelligence artificielle et les SMS pour transformer l\'accès aux soins de santé à Madagascar. 7 modules, des milliers de vies, une seule plateforme.',
  keywords: ['MedTech', 'Madagascar', 'IA', 'Santé', 'Télémédecine', 'AI Healthcare', 'Africa'],
  authors: [{ name: 'Vahy' }],
  openGraph: {
    title: 'Vahy — L\'IA au chevet de Madagascar',
    description: '7 modules. Des milliers de vies. Une seule plateforme.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#020917',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-vahy-deep text-vahy-text">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
