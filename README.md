# Diego González Suárez — Personal Website

[![CI](https://img.shields.io/github/actions/workflow/status/diegoglezsu/portfolio/deploy.yml?branch=main)](https://github.com/diegoglezsu/portfolio/actions/workflows/deploy.yml) [![Deploy](https://github.com/diegoglezsu/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/diegoglezsu/portfolio/actions/workflows/deploy.yml)

Personal portfolio and blog built with React, Vite, TypeScript, and Tailwind CSS. Deployed on GitHub Pages.

## Stack

| Layer | Choice |
|-------|--------|
| Bundler | Vite |
| UI | React + TypeScript |
| Styles | Tailwind CSS |
| Posts | Markdown files in `src/posts/` |
| Deploy | GitHub Actions → GitHub Pages |

## Project structure

```
src/
├── config.ts          # ← Edit this: name, handle, social links
├── posts/             # ← Add .md files here to publish posts
│   ├── 2025/
│   └── 2026/
├── pages/
│   ├── Home.tsx
│   ├── Posts.tsx
│   ├── Post.tsx
│   └── About.tsx
└── components/
    ├── Layout.tsx
    ├── PostCard.tsx
    └── SocialLinks.tsx
```

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## Adding a post

Create a Markdown file under `src/posts/<year>/your-slug.md`:

```markdown
---
title: "My Post Title"
date: "2026-03-11"
description: "Short summary shown in listings."
tags: [tag1, tag2]
---

Post content here…
```

## Deployment

Pushes to `main` automatically build and deploy via GitHub Actions.  
Enable Pages in **Settings → Pages → Source: GitHub Actions**.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details. © Diego González Suárez

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
