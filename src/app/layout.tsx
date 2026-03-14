import type { Metadata } from 'next'
import { Bebas_Neue, DM_Mono } from 'next/font/google'
import './globals.css'
import Navbar    from '@/components/layout/Navbar'
import Footer    from '@/components/layout/Footer'
import CursorDot from '@/components/ui/CursorDot'
import { Toaster } from '@/components/ui/Toaster'

const bebasNeue = Bebas_Neue({
  weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap',
})
const dmMono = DM_Mono({
  weight: ['300', '400', '500'], subsets: ['latin'], variable: '--font-dm-mono', display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dani López González — Frontend Developer',
  description: 'Frontend Developer. TypeScript · Angular · React · Next.js · UX/UI · Node.js · .NET',
  openGraph: {
    title: 'Dani López González — Frontend Developer',
    description: 'Construyo interfaces donde diseño y arquitectura no se negocian por separado.',
    url: 'https://danilopgue.com',
    siteName: 'Dani López González',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmMono.variable}`}>
      <body>
        <CursorDot />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
