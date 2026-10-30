import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enlaces — Dani López González',
  description: 'Portfolio, GitHub, LinkedIn y otros enlaces de Dani López González.',
  alternates: {
    canonical: '/enlaces',
  },
}

const links = [
  {
    label: 'Portfolio',
    sub: 'danilopgon.com',
    href: '/',
    external: false,
  },
  {
    label: 'LinkedIn',
    sub: '/in/danilopgon',
    href: 'https://www.linkedin.com/in/danilopgon/',
    external: true,
  },
  {
    label: 'GitHub',
    sub: '@danilopgon',
    href: 'https://github.com/danilopgon',
    external: true,
  },
  {
    label: 'Instagram',
    sub: '@danilopgon',
    href: 'https://www.instagram.com/danilopgon/',
    external: true,
  },
  {
    label: 'Spotify',
    sub: 'Hotel Sur',
    href: 'https://open.spotify.com/intl-es/artist/5ZsW4wbMl8qYFZ0L9xvBeu',
    external: true,
  },
]

export default function EnlacesPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-bebas text-[40px] tracking-[0.06em] text-cream leading-none">
            Dani López González
          </h1>
          <p className="text-[15px] text-muted mt-2">Product Engineer, Frontend & AI</p>
        </div>

        {/* Links */}
        <ul className="flex flex-col border border-border">
          {links.map(({ label, sub, href, external }) => (
            <li key={label} className="border-b border-border last:border-b-0">
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center justify-between px-5 py-4 hover:bg-faint transition-colors"
              >
                <div>
                  <span className="block text-[15px] font-medium text-cream group-hover:text-coral transition-colors">
                    {label}
                  </span>
                  <span className="block text-[12px] text-muted mt-0.5">{sub}</span>
                </div>
                <span className="text-[16px] text-border group-hover:text-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[color,transform] leading-none">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
