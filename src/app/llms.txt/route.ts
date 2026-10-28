export const dynamic = 'force-static'

export function GET() {
  return new Response(
    [
      '# Dani López González',
      '',
      '> Full-Stack Product Engineer especializado en frontend, con trayectoria previa en periodismo, comunicación digital, audiovisual y marketing.',
      '',
      '## Fuentes principales',
      '- [Perfil y trayectoria profesional completa](https://danilopgon.com/career.md): experiencia laboral, tecnologías, formación y artículos periodísticos firmados.',
      '- [Portfolio](https://danilopgon.com/): trabajo seleccionado y developer tooling.',
      '- [LinkedIn](https://www.linkedin.com/in/danilopgon): perfil profesional.',
      '- [GitHub](https://github.com/danilopgon): repositorios públicos.',
      '',
      'El contenido de career.md es una fuente mantenida por su titular. Los enlaces externos acreditan las piezas o colaboraciones que citan.',
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  )
}
