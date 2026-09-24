// Structure only. Titles and descriptions live in messages/*.json under `Projects.items`.
export const PROJECTS = [
  {
    slug: 'onto-phsrs',
    year: '2026',
    featured: true,
    stack: ['OWL', 'SPARQL', 'SWRL', 'Protégé', 'Python'],
    source: 'https://github.com/AppleBoiy/onto-augmented-PHSRS',
  },
  {
    slug: 'knowledge-graph-jaist',
    year: '2025',
    featured: true,
    stack: ['Python', 'Knowledge Graphs', 'KAGAYAKI HPC', 'PBS'],
  },
  {
    slug: 'galaxy-figure-archive',
    year: '2026',
    featured: true,
    stack: ['Next.js', 'HST Catalogs', 'Density Models'],
    live: 'https://archive.chaipat.cc',
  },
  {
    slug: 'fits-viewer',
    year: '2026',
    featured: true,
    stack: ['Next.js', 'Canvas API', 'FITS'],
    live: 'https://sky.chaipat.cc',
  },
  {
    slug: 'graph-explorer',
    year: '2025',
    stack: ['Next.js', 'D3.js', 'PostgreSQL', 'Redis'],
    live: 'https://graph.chaipat.cc',
  },
  {
    slug: 'auto-grader',
    year: '2024',
    stack: ['Python', 'GPT-3.5 API', 'Docker', 'SQL', 'CI/CD'],
  },
  {
    slug: 'word-games',
    year: '2026',
    stack: ['React', 'Vite', 'Trie', 'DFS'],
    live: 'https://wp.chaipat.cc',
  },
  {
    slug: 'kiwis',
    year: '2022 — 2025',
    stack: ['Makefile', 'Bash', 'Technical Writing'],
    live: 'https://kiwis.chaipat.cc',
    source: 'https://github.com/AppleBoiy/kiwis',
  },
];

export function getProject(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}
