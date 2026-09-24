import type { Locale } from './i18n/translations'

/**
 * Developer Tooling section data.
 *
 * Copy rules for this section, learned the hard way from a critique pass:
 *
 * - Never define a tool by what it is not. "No sustituye Sonar por un LLM"
 *   plants the accusation it is trying to deny. State what the tool does.
 * - No summary ends in an epigram. Setup-colon-aphorism three times in four
 *   cards is a cadence readers recognize as machine-written.
 * - "real" is capped at one use in the whole section. When every noun needs
 *   that adjective, the nouns are too abstract.
 * - `summary` is the whole argument in two sentences: one for what it does,
 *   one for the guarantee it adds. Keep it in the 170-210 character range so
 *   the four cards scan as one pattern instead of four ragged blocks.
 * - `detail` carries mechanism only, for the reader who opens the disclosure.
 */
export type Tool = {
  slug: string
  name: string
  kind: string
  summary: string
  detail: string
  stack: string[]
}

const toolsData: Record<Locale, Tool[]> = {
  es: [
    {
      slug: 'apereview',
      name: 'ApeReview',
      kind: 'Servidor MCP',
      summary:
        'Convierte el conocimiento disperso de un proyecto (convenciones, criterios técnicos, aprendizajes de revisiones anteriores) en una base que los agentes consultan antes de responder.',
      detail:
        'Backend en Python/FastAPI con SQLite + FTS5 para búsqueda full-text sobre la base de conocimiento, expuesto como servidor MCP. La ingesta es dinámica, así que la base crece con cada revisión y un criterio acordado hace seis meses sigue disponible hoy.',
      stack: ['Python', 'FastAPI', 'MCP', 'SQLite + FTS5', 'Retrieval'],
    },
    {
      slug: 'figma-dom-audit',
      name: 'figma-dom-audit',
      kind: 'Auditoría automatizada',
      summary:
        'Mide la pantalla en navegador contra Figma y el design system, y señala cada desviación en píxeles y en tokens, con su selector y su responsable. Cada corrección guarda capturas de antes y después.',
      detail:
        'Orquesta los MCPs de Figma y Chrome DevTools y cubre spacing, layout, tipografía, color, bordes, estructura y overflow. Un comparador determinista lee las escalas de tokens en vivo y contrasta cada valor con el design system, porque el Figma de una pantalla puede ir desfasado. Cada hallazgo se asigna a código propio, componentes comunes, librería o diseño, y el informe sale como página compartible o como work item de Azure DevOps, siempre tras confirmar la vista previa.',
      stack: ['MCP', 'Figma', 'Chrome DevTools', 'Design tokens', 'Azure DevOps'],
    },
    {
      slug: 'sonar-diff-review',
      name: 'sonar-diff-review',
      kind: 'Análisis estático',
      summary:
        'Analiza solo los archivos tocados por un diff con el motor de SonarLint/SonarQube dentro del IDE. Sonar produce los hallazgos y el agente los ordena según lo que el cambio toca.',
      detail:
        'Abre los archivos afectados, recoge los diagnostics del IDE y separa las reglas Sonar del ruido de otras herramientas. El agente aporta interpretación y prioridad, y cada hallazgo conserva la regla Sonar que lo originó.',
      stack: ['SonarQube', 'SonarLint', 'IDE diagnostics', 'Git diff'],
    },
    {
      slug: 'docker-push-acr',
      name: 'docker-push-acr',
      kind: 'Automatización de despliegue',
      summary:
        'Build y publicación de imágenes Docker en Azure Container Registry. Antes de cualquier push muestra registry, entorno, imagen y tag, y exige confirmación humana explícita.',
      detail:
        'Recoge los parámetros necesarios, ejecuta el build con los scripts que ya existen en el proyecto y prepara el destino. La confirmación bloquea el push, así que un tag equivocado se ve antes de publicarse, no después.',
      stack: ['Docker', 'Azure Container Registry', 'Bash', 'CI/CD'],
    },
  ],
  en: [
    {
      slug: 'apereview',
      name: 'ApeReview',
      kind: 'MCP server',
      summary:
        "Turns a project's scattered knowledge (conventions, technical criteria, lessons from earlier reviews) into a base agents query before they answer.",
      detail:
        'Python/FastAPI backend with SQLite + FTS5 for full-text search over the knowledge base, exposed as an MCP server. Ingestion is dynamic, so the base grows with every review and a criterion agreed six months ago is still available today.',
      stack: ['Python', 'FastAPI', 'MCP', 'SQLite + FTS5', 'Retrieval'],
    },
    {
      slug: 'figma-dom-audit',
      name: 'figma-dom-audit',
      kind: 'Automated audit',
      summary:
        'Measures the screen in the browser against Figma and the design system, and flags every deviation in pixels and tokens, with its selector and its owner. Every applied fix keeps before and after screenshots.',
      detail:
        "It orchestrates the Figma and Chrome DevTools MCPs and covers spacing, layout, typography, color, borders, structure and overflow. A deterministic comparator reads the token scales live and checks every value against the design system, because a screen's Figma can lag behind. Each finding is assigned to our code, shared components, a library or design, and the report ships as a shareable page or an Azure DevOps work item, always after the preview is confirmed.",
      stack: ['MCP', 'Figma', 'Chrome DevTools', 'Design tokens', 'Azure DevOps'],
    },
    {
      slug: 'sonar-diff-review',
      name: 'sonar-diff-review',
      kind: 'Static analysis',
      summary:
        'Analyzes only the files touched by a diff with the SonarLint/SonarQube engine inside the IDE. Sonar produces the findings and the agent orders them by what the change touches.',
      detail:
        'It opens the affected files, collects the IDE diagnostics and separates Sonar rules from the noise of other tools. The agent supplies interpretation and priority, and every finding keeps the Sonar rule that produced it.',
      stack: ['SonarQube', 'SonarLint', 'IDE diagnostics', 'Git diff'],
    },
    {
      slug: 'docker-push-acr',
      name: 'docker-push-acr',
      kind: 'Deployment automation',
      summary:
        'Builds and publishes Docker images to Azure Container Registry. Before any push it prints registry, environment, image and tag, and requires explicit human confirmation.',
      detail:
        'It collects the required parameters, runs the build through the scripts the project already has and prepares the destination. The confirmation blocks the push, so a wrong tag is caught before it ships, not after.',
      stack: ['Docker', 'Azure Container Registry', 'Bash', 'CI/CD'],
    },
  ],
}

export function getTools(locale: Locale): Tool[] {
  return toolsData[locale]
}
