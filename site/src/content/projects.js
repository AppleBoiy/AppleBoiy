// Structure only. Titles and descriptions live in messages/*.json under `Projects.items`.
// `star` places the project on the home-page constellation (percent of width, height).
export const PROJECTS = [
  {
    slug: 'onto-phsrs',
    star: [16, 30],
    year: '2026',
    featured: true,
    stack: ['OWL', 'SPARQL', 'SWRL', 'Protégé', 'Python'],
    source: 'https://github.com/AppleBoiy/onto-augmented-PHSRS',
  },
  {
    slug: 'knowledge-graph-jaist',
    star: [34, 12],
    year: '2025',
    featured: true,
    stack: ['Python', 'Knowledge Graphs', 'KAGAYAKI HPC', 'PBS'],
  },
  {
    slug: 'galaxy-figure-archive',
    star: [64, 16],
    year: '2026',
    featured: true,
    stack: ['Next.js', 'HST Catalogs', 'Density Models'],
    live: 'https://archive.chaipat.cc',
  },
  {
    slug: 'fits-viewer',
    star: [88, 44],
    year: '2026',
    featured: true,
    stack: ['Next.js', 'Canvas API', 'FITS'],
    live: 'https://sky.chaipat.cc',
  },
  {
    slug: 'graph-explorer',
    star: [44, 50],
    year: '2025',
    stack: ['Next.js', 'D3.js', 'PostgreSQL', 'Redis'],
    live: 'https://graph.chaipat.cc',
  },
  {
    slug: 'auto-grader',
    star: [26, 86],
    year: '2024',
    stack: ['Python', 'GPT-3.5 API', 'Docker', 'SQL', 'CI/CD'],
  },
  {
    slug: 'word-games',
    star: [70, 80],
    year: '2026',
    stack: ['React', 'Vite', 'Trie', 'DFS'],
    live: 'https://wp.chaipat.cc',
  },
  {
    slug: 'kiwis',
    star: [6, 64],
    year: '2022 — 2025',
    stack: ['Makefile', 'Bash', 'Technical Writing'],
    live: 'https://kiwis.chaipat.cc',
    source: 'https://github.com/AppleBoiy/kiwis',
  },
];

// Lines of the constellation on the home page: related projects are joined.
export const CONSTELLATION_EDGES = [
  ['kiwis', 'onto-phsrs'],
  ['onto-phsrs', 'knowledge-graph-jaist'],
  ['knowledge-graph-jaist', 'graph-explorer'],
  ['onto-phsrs', 'graph-explorer'],
  ['knowledge-graph-jaist', 'galaxy-figure-archive'],
  ['galaxy-figure-archive', 'fits-viewer'],
  ['graph-explorer', 'word-games'],
  ['fits-viewer', 'word-games'],
  ['kiwis', 'auto-grader'],
  ['auto-grader', 'graph-explorer'],
];

export function getProject(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}
