# Personal website

Personal website of Chaipat Jainan — a minimal, monotone site in English, Thai, and Japanese.

## Pages

| Route | Content |
| --- | --- |
| `/[locale]` | Home: intro, current role, selected work, path, contact |
| `/[locale]/projects` | All projects |
| `/[locale]/projects/[slug]` | Project detail |
| `/[locale]/cv` | Curriculum vitae (PDF in `public/resume.pdf`) |

Locales: `en` (default), `th`, `ja`. `/` redirects to the visitor's preferred locale.

## Editing content

- **Text** (every language): `messages/{en,th,ja}.json`
  - `Home` — home page copy
  - `Projects.items.<slug>` — project title, category, context, summary, outcome
  - `Resume` — CV copy
- **Structure** (years, stacks, links, order): `src/content/projects.js`, `src/content/resume.js`
- **Identity** (email, social links, site URL): `src/content/site.js`

To add a project: add an entry to `src/content/projects.js` and a matching
`Projects.items.<slug>` block in all three message files. Set `featured: true` to show it on the home page.

## Design

"Sky & paper": full-screen scenes in ultramarine sky, night sky, and aged paper, framed by a
thin left rail (section ruler) and a top hairline. Type: Instrument Serif (display, with italic
accents), Inter Tight (text), IBM Plex Mono (labels). Styles live in `src/app/globals.css`;
palette tokens are at the top.

All imagery is generated in the browser, so there are no image assets to manage:

- `HalftoneClouds` — printed-halftone clouds (`clouds` boxes position them)
- `GalaxyPlate` — an engraved plate of a spiral galaxy
- `Starfield` — night sky with glowing stars
- `Constellation` — the projects as stars; edges are in `CONSTELLATION_EDGES`
  and each project's `star` position is in `src/content/projects.js`

Headings accept `<em>…</em>` in the message files for the italic accent word.

## Deploy

The site lives in the `site/` folder of this repository (the repository root is the GitHub profile
README). On Vercel, import the repository and set **Root Directory** to `site`.

## Develop

```bash
cd site
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin (defaults to `https://chaipat.cc`) so canonical
URLs, the sitemap, and robots.txt point at the right domain.
