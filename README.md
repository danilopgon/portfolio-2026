# Portfolio — Dani López González

Stack: Next.js 15 · TypeScript · Tailwind CSS · GSAP · Lenis

## Arrancar

```bash
npm install
cp .env.local.example .env.local
# añadir RESEND_API_KEY para el formulario de contacto
npm run dev
```

## Dependencias externas (mínimas y justificadas)

| Paquete | Por qué |
|---|---|
| `@radix-ui/react-label` | `<Label>` accesible con `htmlFor` y ARIA correctos |
| `sonner` | Toast de feedback del formulario |
| `clsx` + `tailwind-merge` | `cn()` helper para clases condicionales |

Todo lo demás es vanilla — sin shadcn, sin component libraries.

## Estructura

```
src/
├── app/
│   ├── layout.tsx              # fuentes, Toaster global
│   ├── page.tsx
│   ├── globals.css
│   └── api/contact/route.ts    # Resend
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx            # ScrambleText
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx        # datos desde lib/projects.ts
│   │   └── Contact.tsx         # Label + Sonner, inputs vanilla
│   └── ui/
│       ├── ScrambleText.tsx
│       ├── CursorDot.tsx
│       ├── RevealOnScroll.tsx
│       ├── Label.tsx           # Radix Label, sin estilos propios de shadcn
│       └── Toaster.tsx         # Sonner con tokens del diseño
└── lib/
    ├── utils.ts                # cn()
    ├── scramble.ts
    └── projects.ts
```
