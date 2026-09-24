# Personal website

Personal website of Chaipat Jainan — a minimal, monotone site in English, Thai, and Japanese.

## Pages

The site is one newspaper edition per language, printed as numbered pages on a single URL
(`/[locale]`), so nothing is hidden behind tabs:

| Page | Content |
| --- | --- |
| 1 | Front page: masthead, lead story, Inside Today index, In Brief, poster ad, positions held |
| 2–3 | Section B: all eight projects printed in full, plus a CV advertisement |
| 4 | Classified: curriculum vitae (PDF in `public/resume.pdf`) |
| 5 | Letters to the editor (composes an email) and the back-page advertisement |

The masthead's "Vol." counts years since 2022 and "No." is the day of the year the edition was
built (`src/lib/edition.js`). A floating page turner tracks and turns pages. Old routes redirect
into the paper: `/projects` → page 2, `/projects/<slug>` → that story, `/cv` → page 4.

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

"The Chaipat Chronicle": an old broadsheet newspaper. Newsprint background with a fibre
texture, black-ink rules, a blackletter masthead (UnifrakturMaguntia), Playfair Display
headlines, Libre Caslon body text set in ruled columns with drop caps, Oswald for kickers
and labels, and a vintage red-and-cream poster advertisement (Yellowtail script, sunburst)
for contact. Styles live in `src/app/globals.css`; palette tokens are at the top.

- Front page: lead story, "In Brief" sidebar, poster ad, project stories, positions held,
  and a letters-to-the-editor form that composes an email
- Section B (`/projects`) and one article page per project
- Classified curriculum vitae (`/cv`), print-friendly
- `GalaxyPlate` draws the halftone "photograph" on the front page

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
