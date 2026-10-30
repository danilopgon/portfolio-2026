# Portfolio — Dani López González

> Full-Stack Product Engineer | AI Engineering.
>
> Construyo productos de extremo a extremo, desde la experiencia de usuario y la arquitectura hasta las APIs y los datos.

![Preview del portfolio](public/images/preview.png)

Stack: Next.js 16 · TypeScript · Tailwind CSS · GSAP · WebGL (shader propio, sin librería)

## Arrancar

```bash
pnpm install
cp .env.local.example .env.local
# rellenar RESEND_API_KEY, FROM_EMAIL y CONTACT_EMAIL
pnpm dev
```

Usamos **pnpm como gestor único de dependencias** (`pnpm@10.18.0`): `pnpm-lock.yaml` es el lockfile canónico. En CI/Vercel, instalar con `pnpm install --frozen-lockfile` para respetar las versiones fijadas.

## Dependencias externas (mínimas y justificadas)

| Paquete                   | Por qué                                              |
| ------------------------- | ---------------------------------------------------- |
| `@radix-ui/react-label`   | `<Label>` accesible con `htmlFor` y ARIA correctos   |
| `sonner`                  | Toast de feedback del formulario                     |
| `clsx` + `tailwind-merge` | `cn()` helper para clases condicionales              |
| `zod`                     | Validación del formulario de contacto                |
| `gray-matter`             | Leer metadatos de las fichas Markdown de trayectoria |
| `react-hook-form`         | Gestión de estado y errores del formulario           |
| `resend`                  | Envío de emails desde el API route                   |
| `@react-email/*`          | Template HTML del email de contacto                  |

Todo lo demás es vanilla — sin shadcn, sin component libraries. El efecto de dither es un shader WebGL escrito a mano (`DitherImage`), sin three.js.

## Trayectoria profesional mantenible

La trayectoria completa se mantiene en [`content/career/`](content/career/README.md) como Markdown editable. Las fichas con `featured: true` alimentan las experiencias ES/EN de la home y, junto al perfil y los proyectos, generan el endpoint público `/career.md`.

La home conserva su selección breve y ofrece solo un enlace discreto a **Trayectoria completa (.md)**. `/llms.txt` sirve como índice para agentes que descubran el sitio; no hay una página HTML adicional.

## Estructura

```
src/
├── app/
│   ├── layout.tsx              # fuentes (Bebas Neue, Source Serif 4, DM Mono), Toaster global
│   ├── page.tsx
│   ├── globals.css             # tokens de marca y sello de Hallmark
│   ├── opengraph-image.tsx     # tarjeta para compartir (misma composición que el hero)
│   ├── career.md/route.ts      # trayectoria completa en Markdown
│   ├── llms.txt/route.ts       # índice para agentes
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── enlaces/page.tsx        # página de links (bio link)
│   └── api/contact/route.ts    # Resend
├── assets/
│   └── og-portrait.png         # retrato en B/N para la tarjeta OG
├── fonts/                      # fuentes que lee la tarjeta OG
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx            # nombre como titular de portada + lupa de dither
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx        # datos desde lib/projects.ts
│   │   ├── Tooling.tsx         # datos desde lib/tooling.ts
│   │   ├── Experience.tsx      # datos desde content/career
│   │   └── Contact.tsx         # react-hook-form + zod + Sonner
│   └── ui/
│       ├── SectionHeader.tsx   # filete coral + título en Bebas
│       ├── DitherImage.tsx     # lupa de dither en WebGL (hero y proyectos)
│       ├── BalancedChips.tsx   # filas de chips equilibradas, sin huérfanos
│       ├── CursorDot.tsx
│       ├── RevealOnScroll.tsx
│       ├── Label.tsx           # Radix Label
│       └── Toaster.tsx         # Sonner con tokens del diseño
├── emails/
│   └── ContactEmail.tsx        # template React Email
└── lib/
    ├── utils.ts                # cn()
    ├── career.ts               # fichas de content/career → home y /career.md
    ├── projects.ts
    ├── skills.ts
    ├── tooling.ts
    ├── motion.ts               # tokens de movimiento (GSAP + CSS)
    ├── rate-limit.ts
    └── schemas/contact.ts      # schema Zod compartido
```

## About this project

Personal portfolio built by **Dani López González** ([@danilopgon](https://github.com/danilopgon)), full-stack Product Engineer specialised in frontend, based in Cuenca, Spain.

Designed like a dark magazine feature: Bebas Neue for the name and section heads, Source Serif 4 for reading text, one coral rule as the only signal, and a hand-written WebGL dither loupe over the portrait and project captures. Built without component libraries: every element is intentional. The project presents work across React, Next.js, Angular, TypeScript, Node.js, Python/FastAPI and applied AI tooling, while the codebase demonstrates production-grade full-stack architecture: typed forms with Zod + React Hook Form, scroll-driven animations with GSAP, accessible UI primitives via Radix, and transactional email via Resend and React Email.

Stack: Next.js · TypeScript · Tailwind CSS · GSAP · WebGL  
Live: [danilopgon.com](https://danilopgon.com)
