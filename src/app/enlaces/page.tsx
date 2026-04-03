import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enlaces — Dani López González',
  description: 'GitHub, LinkedIn, Instagram, Spotify y más.',
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
          <p className="text-[10px] tracking-[0.3em] uppercase text-coral mb-3">{'// enlaces'}</p>
          <h1 className="font-bebas text-[40px] tracking-[0.06em] text-cream leading-none">
            Dani López González
          </h1>
          <p className="text-[11px] text-muted mt-2 tracking-[0.05em]">Frontend Developer</p>
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
                  <span className="block text-[13px] font-medium tracking-[0.04em] text-cream group-hover:text-coral transition-colors">
                    {label}
                  </span>
                  <span className="block text-[10px] text-muted tracking-[0.05em] mt-0.5">
                    {sub}
                  </span>
                </div>
                <span className="text-[16px] text-border group-hover:text-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all leading-none">
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
