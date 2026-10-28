# Mantener la trayectoria profesional

Esta carpeta es la fuente editorial de la experiencia profesional, no una nueva sección HTML del portfolio.

## Qué editar

1. `experience/*.md`: **una ficha por etapa**, en texto Markdown, con metadatos YAML en la cabecera.
2. `profile.md`: biografía, trayectoria transversal y formación.
3. `projects.md`: proyectos propios y herramientas complementarias.

`src/lib/career.ts` convierte estas fichas en:

- Las **tres experiencias destacadas** de la home, tanto en ES como EN (`featured: true` y `highlights.es/en`).
- El documento público completo **`/career.md`**, generado al construir el sitio, sin cabeceras YAML.
- La ficha del puesto actual se marca automáticamente a partir de `end: null`.

`/llms.txt` enlaza el documento completo y otras fuentes de identidad profesional. Los agentes pueden consultarlo, pero su existencia **no garantiza** que un buscador o modelo lo utilice ni mejora automáticamente el posicionamiento.

## Cómo actualizar

- Añadir una experiencia: crear una ficha con nombre `slug.md`, copiar la estructura de otra ficha y editar fechas, rol y contenido. Se ordenan por fecha de inicio descendente.
- Actualizar una experiencia existente: editar **solo su ficha**. El Markdown público se actualiza en el siguiente despliegue.
- Mostrar un puesto en la home: poner `featured: true` y rellenar `highlights` en castellano e inglés. Revisar cuántas fichas quedan destacadas.
- Actualizar funciones o tecnologías de TyP: editar `experience/tecnologia-y-personas.md`, distinguiendo contexto de la arquitectura y contribuciones individuales.
- Añadir publicaciones firmadas o formación: enlazarlas en la ficha correspondiente o en `profile.md`.

## Privacidad y atribución

- No incluir nombres de clientes, repositorios internos, rutas, puertos ni componentes no públicos.
- No convertir el uso de una arquitectura o tecnología del equipo en un logro personal sin contexto.
- Los puestos se basan en el historial profesional declarado por el titular: **no hace falta una prueba pública de cada práctica o contrato antiguo**.
- Los enlaces externos acreditan las piezas que contienen; no prueban automáticamente todos los detalles de la experiencia.

## Comprobación

```bash
pnpm test:run
pnpm build
```

Tras desplegar, comprobar que `https://danilopgon.com/career.md` responde con `text/markdown`, `https://danilopgon.com/llms.txt` con `text/plain` y que el enlace discreto aparece bajo la experiencia en la home.
