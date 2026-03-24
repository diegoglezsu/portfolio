# AGENTS.md

Guía para agentes de código que trabajen en este repositorio.

## 1) Objetivo del proyecto

Sitio personal + blog construido con **React + TypeScript + Vite + Tailwind CSS**.
Los posts se cargan desde archivos Markdown y se renderizan dentro de la app.

## 2) Entorno y comandos

- Instalar dependencias: `npm install`
- Desarrollo local: `npm run dev`
- Build de producción: `npm run build`
- Preview de build: `npm run preview`

Notas:
- No hay script de tests configurado en `package.json`.
- Validación mínima esperada tras cambios de código: `npm run build`.

## 3) Estructura relevante

- `src/config.ts`: datos personales, links y configuración principal del portfolio.
- `src/pages/`: páginas (`Home`, `Posts`, `Post`, `About`).
- `src/components/`: componentes reutilizables (`Layout`, `PostCard`, `SocialLinks`).
- `src/lib/posts.ts`: utilidades para leer/parsear posts.
- `src/posts/<año>/*.md`: contenido del blog en Markdown.
- `public/fonts/`: tipografías estáticas.

## 4) Convenciones de implementación

- Mantener cambios **mínimos y enfocados** en el requerimiento.
- Seguir el estilo existente de TypeScript/React y la estructura actual.
- No introducir nuevas dependencias sin una razón clara.
- Evitar refactors amplios si no son parte explícita del pedido.
- No modificar contenido de `dist/` manualmente.

## 5) Trabajo con posts (Markdown)

Al crear un post nuevo, usar frontmatter con esta forma:

```md
---
title: "Título"
date: "YYYY-MM-DD"
description: "Resumen corto"
tags: [tag1, tag2]
---
```

Buenas prácticas:
- Usar slugs legibles en el nombre del archivo (`mi-post.md`).
- Mantener fechas válidas y consistentes para el ordenado.
- Ubicar el archivo en el año correcto (`src/posts/2026/...`).

## 6) Checklist de entrega para agentes

Antes de finalizar un cambio:

1. Ejecutar `npm run build` y confirmar que termina sin errores.
2. Verificar que no se rompieron rutas de `react-router-dom`.
3. Confirmar que los cambios visuales respetan el diseño existente.
4. Si se tocaron posts/config, validar contenido y formato.

## 7) Alcance y límites

- Este repositorio es frontend estático; no agregar backend a menos que se solicite.
- No añadir funcionalidades “nice to have” fuera del alcance pedido.
- Si un requerimiento es ambiguo, elegir la opción más simple que cumpla.
