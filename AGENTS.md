# AGENTS.md

Code agent guide for this repository (React + TypeScript + Vite + Tailwind).

## 1) Project Overview

Personal site + blog. Posts are served from Markdown files in `src/posts/<year>/<slug>.md`, processed with `gray-matter` + `react-markdown`.

---

## 2) Environment & Commands

- Install dependencies: `npm install`
- Local dev: `npm run dev` (Vite, default port 5173)
- Production build: `npm run build` (runs `tsc -b && vite build`)
- Preview build: `npm run preview` (serves `dist/`)
- Standalone TS check: `npx tsc --noEmit` (build already runs `tsc -b`)

**Note:** No lint/test scripts in `package.json`. To run a linter or test runner locally, use `npx` (e.g. `npx eslint <file>` or `npx vitest`).

Agent utility commands:
- Run build (required before merge): `npm run build`
- TS check only: `npx tsc --noEmit`
- Run a single test (with Vitest): `npx vitest run <path/to/test-file>` or `npx vitest -t "test name"`
- Run a single test (with Jest): `npx jest <path/to/test-file> -t "test name"`

---

## 3) CI / Deployment

`.github/workflows/deploy.yml` runs `npm ci` and `npm run build`, then deploys to GitHub Pages.

If you change CI, keep `npm run build` error-free.

---

## 4) Project Structure

```
src/
├─ config.ts
├─ App.tsx
├─ lib/posts.ts
├─ pages/
├─ components/
└─ posts/<year>/*.md
```

---

## 5) Code Style & Conventions

### TypeScript
- `strict: true` is enabled in `tsconfig.json`.
- Avoid `any`; allow only with clearly justified type assertions.
- Declare `interface Props` for components; prefer `type` for complex compositions.
- Always type return values of non-trivial functions.
- Prefer `?.` and `??` over manual checks.

### Imports
- Suggested order: 1) React / react-router, 2) external dependencies, 3) local components, 4) utils / config / types.
- Use relative paths (`../`) for in-repo modules.
- When importing only a type, use `import type { ... } from '...'`.

### React Components
- Use `export default` for pages and main components.
- PascalCase for component names and filenames (e.g. `PostCard.tsx`).
- Prefer `export default function ComponentName()` over arrow functions for default exports.
- Hooks must start with `use`.
- Use `useParams()` with explicit destructuring for route params (`const { slug, "*": rest } = useParams();`).

### Naming
- Variables/functions: camelCase (`getAllPosts`).
- Components/files: PascalCase.
- Global constants: UPPER_SNAKE_CASE (`HOME_POST_LIMIT`).
- Types/interfaces: PascalCase (`PostMeta`).
- Post slugs: kebab-case or `YYYY/slug`.

### Formatting & Tools
- No Prettier/ESLint configured by default. Recommendation: install `eslint` + `eslint-config-airbnb-typescript` and `prettier`.
- When using `eslint --fix`, review changes before committing.

### Error Handling
- Render 404 pages for missing posts with a back link.
- Use `onError` on images to hide or show a fallback.
- Don't throw errors without context; wrap with clear messages and logs when appropriate.

Short examples:
```ts
interface Props { post: PostMeta }
export default function PostCard({ post }: Props) {
  if (!post) return <div>Post not found — <Link to="/posts">Back</Link></div>
  return <article>{post.title}</article>
}
```

---

## 6) Tailwind / Styles

- Use Tailwind utility classes (no CSS modules unless necessary).
- Include `dark:` variants where needed for dark mode compatibility.
- Avoid hardcoded colors; use Tailwind palette classes.
- `src/index.css` contains `prose-*` rules for rendered Markdown content.

---

## 7) Markdown Posts

Required frontmatter: `title`, `date` (YYYY-MM-DD), `description`, `tags`.
Location: `src/posts/<year>/<slug>.md`.
Add `draft: true` to exclude from public listing.

Example:
```md
---
title: "My post"
date: "2026-03-01"
description: "Summary"
tags: [javascript, react]
---

Content here...
```

---

## 8) Delivery Rules & Pre-Merge Checklist

- `npm run build` must exit without errors (TypeScript is checked as part of build).
- Visually verify main routes (HashRouter `#/`), post listing, and post rendering.
- Keep changes scoped; avoid large refactors without approval.

Quick checklist:
- `npm run build` passes ✔
- Routes and posts verified ✔
- No unnecessary dependencies added ✔

---

## 9) Git / Commits for Agents

- Don't create commits automatically unless asked.
- When creating commits, write short messages focused on the "why" (e.g. `fix: ensure build passes after X`).
- Don't use `git reset --hard` or `push --force`.

---

## 10) Cursor / Copilot Rules

- No Cursor rules (`.cursor/` or `.cursorrules`) or Copilot instructions (`.github/copilot-instructions.md`) detected. If you add them, update this doc.

---

If you need linters, a test runner, or specific scripts to run a test per file, I can propose changes with a minimal dependency set (e.g. Vitest + ESLint + Prettier) and update `package.json` and CI.
