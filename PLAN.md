# Portfolio plan: "The Engineer's Notebook"

## Idea (the meaning behind it)
Engineers are judged by results, but good engineers are trusted for their decisions. The site shows both: what I built and why I chose it. Everything is styled as an engineer's working notebook: blueprint paper, specs, decision records, a git-log career.

Stance line (dummy, edit later): "I build software that holds up, and I write down why."

## Look
- Light = drafting paper (warm off-white, faint blue grid, ink-dark text).
- Dark = blueprint (deep blue background, white hairline grid).
- One accent colour (signal orange) for links and highlights.
- Type: big clean sans for headings, one italic serif word for contrast, mono for labels (file names, hashes, dates).
- Parallax stays light: the hero grid and a system diagram drift at different speeds. No heavy effects on reading pages.

## Pages
1. Home `/`: stance line, a live system diagram (D3) drawn on the grid, latest notes, 3 featured specs, short "now" strip.
2. Projects `/projects` and `/projects/[slug]`: each project is a spec sheet: Problem, Constraints, Decisions (and what I rejected), Outcome, Stack.
3. Journey `/journey`: career as a git log (commit hash, date, message), starting `Jan 2023: joined 47Billion`.
4. Notes `/notes` and `/notes/[slug]`: blog in MDX. Tags, reading time, table of contents, ADR-style posts ("Decision: X over Y").
5. Skills `/skills`: D3 force graph of tools and how they connect, grouped by area. Drag to explore.
6. About `/about`: short story, achievements, links.
7. Footer status bar on every page: build hash, last updated, theme toggle.
Chatbot: later, as a floating "Ask the notebook" widget (answers from my own content).

## Tech
- Next.js 16 (App Router), TypeScript, Tailwind v4, Motion for scroll, D3 for graphs.
- MDX files in `content/notes/` for posts, `content/projects/` for specs. Read the Next.js MDX guide in `node_modules/next/dist/docs/` before wiring it.
- Content stays in plain files so it is easy to edit; dummy items are marked DUMMY.
- Accessibility: reduced-motion respected, keyboard-friendly nav, good contrast in both themes.

## Build order
1. Design tokens, grid background, layout, nav, footer, theme toggle.
2. Home hero with parallax grid and D3 system diagram.
3. MDX setup, Notes list and post page, reading time, tags.
4. Projects spec pages, Journey git log, Skills graph, About.
5. Polish: responsive pass, reduced motion, metadata and OG image.
6. Verify: build, lint, open in a real browser at phone and desktop widths, check for blank sections.
7. Review with Adi locally, then git repo, then deploy (Vercel, Cloudflare Turnstile on any form), then domain.

## Open for Adi
- Stance line and real About text, achievements, LinkedIn link.
- Real project details (finance tracker, Perry /usage PR, others).
- Domain name when ready.
