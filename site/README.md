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

Plain CSS in `src/app/globals.css` — one ink, one paper, three greys, defined as custom properties
at the top of the file. Dark mode follows the operating system. Type: EB Garamond (display),
IBM Plex Sans (text), IBM Plex Mono (dates), with Noto Serif/Sans Thai and Shippori Mincho /
Noto Sans JP for the Thai and Japanese editions.

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
