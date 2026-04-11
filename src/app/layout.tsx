import type { Metadata } from 'next'
import { Bebas_Neue, DM_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CursorDot from '@/components/ui/CursorDot'
import { Toaster } from '@/components/ui/Toaster'
import { LanguageProvider } from '@/lib/i18n/context'
import SkipLink from '@/components/ui/SkipLink'

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
    'Frontend Developer based in Cuenca, Spain. TypeScript · Angular · React · Next.js · UX/UI · Node.js · .NET',
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/',
      'en-US': '/',
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Dani López González — Frontend Developer',
    description:
      'Frontend Developer based in Cuenca, Spain. Interfaces where design and architecture are non-negotiable.',
    url: 'https://danilopgon.com',
    siteName: 'Dani López González',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dani López González — Frontend Developer',
    description:
      'Frontend Developer based in Cuenca, Spain. Interfaces where design and architecture are non-negotiable.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dani López González',
              url: 'https://danilopgon.com',
              jobTitle: 'Frontend Developer',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cuenca',
                addressRegion: 'Castilla-La Mancha',
                addressCountry: 'ES',
              },
              sameAs: ['https://linkedin.com/in/danilopgon', 'https://github.com/danilopgon'],
            }),
          }}
        />
        <LanguageProvider>
          <SkipLink />
          <CursorDot />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
