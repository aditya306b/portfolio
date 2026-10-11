# The Engineer's Notebook

Aditya Pathak's portfolio: a multi-page site where projects are specs, the career is a git log and the blog is engineering notes.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind v4, Motion (scroll parallax), D3 (diagrams and skills graph), MDX (notes).

## What is in it

- **Home:** parallax hero, a diagram you can click to "break", and an interactive terminal.
- **Terminal / Ctrl+K:** `help`, `whoami`, `ls`, `cat`, `decisions`, `git log`, `open`, `theme`, `accent`.
- **Projects:** each project is a spec: problem, constraints, decisions, outcome.
- **Decisions:** every "X over Y" call in one searchable log.
- **Journey, Notes (MDX), Skills graph, About.**
- Light and dark themes, four accent colours, sitemap, RSS (`/feed.xml`), share card, custom 404.

## Run it

```bash
pnpm install
pnpm dev
```

## Edit the content

- `src/content/data.ts`: profile, projects, journey, skills. Anything marked `DUMMY` is a placeholder.
- `src/content/notes/*.mdx`: blog posts (each exports a `meta` object).
- Set `NEXT_PUBLIC_SITE_URL` to the real domain once it exists (sitemap, feed and share card use it).

## Checks

```bash
pnpm lint && pnpm build
```
