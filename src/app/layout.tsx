import type { Metadata } from 'next'
import { Bebas_Neue, DM_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CursorDot from '@/components/ui/CursorDot'
import { Toaster } from '@/components/ui/Toaster'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})
const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://danilopgon.com'),
  title: 'Dani López González — Frontend Developer',
  description:
    'Frontend Developer. TypeScript · Angular · React · Next.js · UX/UI · Node.js · .NET',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Dani López González — Frontend Developer',
    description: 'Construyo interfaces donde diseño y arquitectura no se negocian por separado.',
    url: 'https://danilopgon.com',
    siteName: 'Dani López González',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dani López González — Frontend Developer',
    description: 'Construyo interfaces donde diseño y arquitectura no se negocian por separado.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmMono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-coral focus:text-black focus:text-xs focus:font-mono focus:tracking-widest focus:uppercase"
        >
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dani López González',
              url: 'https://danilopgon.com',
              jobTitle: 'Frontend Developer',
              sameAs: ['https://linkedin.com/in/danilopgon', 'https://github.com/danilopgon'],
            }),
          }}
        />
        <CursorDot />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
