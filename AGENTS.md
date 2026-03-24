# AGENTS.md

Guía para agentes de código que trabajen en este repositorio (React + TypeScript + Vite + Tailwind).

1) Objetivo
- Sitio personal + blog. Los posts se sirven desde Markdown en `src/posts/<año>/<slug>.md` y se procesan con `gray-matter` + `react-markdown`.

---

2) Entorno y comandos (rápido)
- Instalar dependencias: `npm install`
- Desarrollo local: `npm run dev` (Vite, servidor en 5173 por defecto)
- Build de producción: `npm run build` (ejecuta `tsc -b && vite build`)
- Preview build: `npm run preview` (sirve `dist/`)
- TypeScript check independiente: `npx tsc --noEmit` o `npm run build` (el build ya hace `tsc -b`).

Nota: No hay scripts de lint/test en `package.json`. Si necesitas ejecutar un linter o runner localmente, usa `npx` con la herramienta que prefieras (ej. `npx eslint <file>` o `npx vitest`).

Comandos útiles para agentes:
- Ejecutar build (validación obligatoria antes de merge): `npm run build`
- Ejecutar solo la comprobación de TS: `npx tsc --noEmit`
- Ejecutar un único test (si se añade Vitest): `npx vitest run <path/to/test-file>` o `npx vitest -t "test name"` para ejecutar por nombre.
- Ejecutar un único test (si se añade Jest): `npx jest <path/to/test-file> -t "test name"`.

---

3) CI / despliegue
- Hay un workflow en `.github/workflows/deploy.yml` que hace `npm ci` y `npm run build`, luego despliega a GitHub Pages.

Si cambias CI asegúrate de mantener `npm run build` sin errores.

---

4) Estructura principal
```
src/
├─ config.ts
├─ App.tsx
├─ lib/posts.ts
├─ pages/
├─ components/
└─ posts/<año>/*.md
```

---

5) Normas de estilo y convenciones de código

- TypeScript
  - `strict: true` está habilitado en `tsconfig.json`.
  - Evitar `any`; permitir solo con type assertions claramente justificadas.
  - Declarar `interface Props` para componentes y preferir `type` para composiciones más complejas.
  - Tipar siempre valores de retorno de funciones no triviales.
  - Preferir `?.` y `??` sobre checks manuales.

- Imports
  - Orden sugerido: 1) React / react-router, 2) dependencias externas, 3) componentes locales, 4) utilidades / config / tipos.
  - Usar rutas relativas (`../`) para módulos dentro del repo.
  - Cuando solo se importa un tipo usar `import type { ... } from '...'`.

- Componentes React
  - Export default para páginas y componentes principales.
  - Componentes: PascalCase filenames and names (e.g. `PostCard.tsx`).
  - Preferir `export default function ComponentName()` en vez de arrow functions para los componentes exportados por defecto.
  - Hooks deben empezar con `use`.
  - Para rutas con params usar `useParams()` y desestructurar explícitamente (`const { slug, "*": rest } = useParams();`).

- Nomenclatura
  - Variables y funciones: camelCase (`getAllPosts`).
  - Componentes / archivos: PascalCase.
  - Constantes globales: UPPER_SNAKE_CASE (`HOME_POST_LIMIT`).
  - Tipos / interfaces: PascalCase (`PostMeta`).
  - Slugs de posts: kebab-case o `YYYY/slug`.

- Formato y herramientas
  - No hay Prettier/ESLint configurados por defecto. Recomendación: instalar `eslint` + `eslint-config-airbnb-typescript` y `prettier` en el futuro.
  - Cuando uses `eslint` con `--fix` asegúrate de revisar cambios antes de commitear.

- Manejo de errores
  - Renderizar errores en UI: manejar 404 de posts mostrando un mensaje y link de retorno.
  - Para imágenes usar `onError` para ocultar o mostrar fallback.
  - No lanzar errores sin contexto; envolver con mensajes claros y logs si procede.

Ejemplos cortos:
```ts
interface Props { post: PostMeta }
export default function PostCard({ post }: Props) {
  if (!post) return <div>Post not found — <Link to="/posts">Back</Link></div>
  return <article>{post.title}</article>
}
```

---

6) Tailwind / estilos
- Usar utilidades de Tailwind en las clases (sin CSS modules salvo casos puntuales).
- Incluir variantes `dark:` donde sea necesario para asegurar compatibilidad con modo oscuro.
- Evitar colores hardcoded; usar las clases de la paleta de Tailwind.
- El archivo `src/index.css` contiene reglas `prose-*` para el contenido Markdown.

---

7) Posts en Markdown
- Frontmatter requerido: `title`, `date` (YYYY-MM-DD), `description`, `tags`.
- Ubicación: `src/posts/<año>/<slug>.md`.
- Añadir `draft: true` para excluir de la lista pública.

Ejemplo:
```md
---
title: "Mi post"
date: "2026-03-01"
description: "Resumen"
tags: [javascript, react]
---

Contenido...
```

---

8) Reglas de entrega y checklist antes de merge
- `npm run build` debe terminar sin errores (TypeScript comprobado como parte del build).
- Revisar visualmente rutas principales (HashRouter `#/`), listado y renderizado de posts.
- Mantener cambios limitados al scope pedido; evitar refactors masivos sin aprobación.

Checklist rápido:
- Ejecuté `npm run build` ✔
- Verifiqué rutas y posts ✔
- No añadí dependencias innecesarias ✔

---

9) Git / commits para agentes
- No crear commits automáticamente a menos que se pida.
- Si creas commits, escribe mensajes cortos y enfocados en el "por qué" (ej. `fix: ensure build passes after X`).
- No usar `git reset --hard` ni `push --force`.

---

10) Cursor / Copilot rules
- No se han detectado reglas de Cursor (`.cursor/` o `.cursorrules`) ni instrucciones para Copilot en `.github/`. Si las añades, actualiza este doc.

---

Si necesitas que añada linters, runner de tests o scripts específicos para ejecutar un test por archivo, puedo proponer cambios y un conjunto mínimo de dependencias (ej. Vitest + ESLint + Prettier) y actualizar `package.json` y CI.
