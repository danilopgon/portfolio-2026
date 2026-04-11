import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { stack } from '@/lib/about'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-border">
      <div className="flex justify-between items-center px-6 py-4 md:px-16 md:py-5 border-b border-border">
        <h2
          id="about-heading"
          className="text-[12px] tracking-[0.3em] uppercase text-muted font-normal"
        >
          <span aria-hidden="true" className="text-coral mr-2">
            {'//'}
          </span>
          Sobre mí
        </h2>
        <span aria-hidden="true" className="font-bebas text-[13px] text-muted tracking-[0.1em]">
          01
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <RevealOnScroll className="px-6 py-8 md:px-16 md:py-12 border-b border-border lg:border-b-0 lg:border-r space-y-4">
          <p className="text-[16px] text-[var(--dim)] leading-[1.8]">
            Estudié periodismo y trabajé en{' '}
            <strong className="text-cream font-medium">medios digitales</strong>. El máster en
            narrativa transmedia fue donde aprendí a pensar en estructura, flujo y propósito. Eso,
            sin buscarlo demasiado, fue lo que me llevó más tarde a la programación.
          </p>
          <p className="text-[16px] text-[var(--dim)] leading-[1.8]">
            Trabajo principalmente en <strong className="text-cream font-medium">frontend</strong>{' '}
            con Angular, React y Next.js, y en backend con soltura. Me importa que el código sea
            claro, que la interfaz responda a quien la usa y que el resultado tenga coherencia de
            principio a fin.
          </p>
          <p className="text-[16px] text-[var(--dim)] leading-[1.8]">
            Con más de dos años de experiencia, trabajo como mid-level en{' '}
            <strong className="text-cream font-medium">Servinet</strong>, en proyectos que me piden
            crecer, con la mirada puesta en arquitectura y decisiones técnicas de mayor alcance.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="px-6 py-8 md:px-12 md:py-12 flex flex-col gap-8" delay={100}>
          <div>
            <p className="text-[12px] tracking-[0.25em] uppercase text-coral mb-3">Stack técnico</p>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((tag) => (
                <span
                  key={tag}
                  className="text-[13px] tracking-[0.1em] px-2.5 py-1 border border-border text-muted hover:border-coral hover:text-cream transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] tracking-[0.25em] uppercase text-coral mb-3">
              Contacto directo
            </p>
            <div className="flex">
              {[
                {
                  label: 'LinkedIn',
                  href: 'https://linkedin.com/in/danilopgon',
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="14"
                      height="14"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/danilopgon',
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="14"
                      height="14"
                      aria-hidden="true"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  ),
                },
                {
                  label: 'Email',
                  href: 'mailto:contacto@danilopgon.com',
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      width="14"
                      height="14"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label} (abre en nueva pestaña)`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-9 h-9 border border-border border-r-0 last:border-r flex items-center justify-center text-muted hover:bg-coral hover:text-black hover:border-coral transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
