# Ayush Gandhi — Portfolio

Personal portfolio built with [Astro](https://astro.build): static HTML, ~4 KB of JavaScript, self-hosted fonts and optimized images.

Design: Swiss grid layout with a "Sage paper" palette (light and dark, follows the system with a toggle). Type is Inter Tight, Inter and JetBrains Mono.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the built site
```

## Editing content

| What | Where |
|---|---|
| Name, tagline, email, résumé, socials, nav | `src/config/site.ts` |
| About text, "Currently" list, toolkit | `src/config/site.ts` |
| Projects and case studies | `src/content/projects/*.md` — `featured: true` gets a case-study page at `/work/<file-name>/` |
| Journey (work and education) | `src/content/experience.json` (sorted by `order`) |
| Photography link | `photographyUrl` in `src/config/site.ts` (empty shows "Work in progress") |
| Colors and global styles | `src/styles/global.css` |

### Adding a project screenshot

Put the image in `src/assets/projects/` and reference it from the project's front matter:

```yaml
cover: ../../assets/projects/acmp.png
```

Without a cover, the card shows a typographic placeholder on a sage or sand block (`tone: sage | sand`).
