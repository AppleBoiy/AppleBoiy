// Structure only. Titles and descriptions live in messages/*.json under `Projects.items`.
// `section` decides which page of the paper prints the story.
export const PROJECTS = [
  {
    slug: 'm81-ddo66',
    section: 'research',
    year: '2026',
    stack: ['Slurm', 'A100 GPU', 'DOLPHOT', 'DBSCAN', 'H I cubes', 'N-body'],
  },
  {
    slug: 'onto-phsrs',
    section: 'research',
    year: '2026',
    featured: true,
    stack: ['OWL', 'SPARQL', 'SWRL', 'Protégé', 'Python'],
    source: 'https://github.com/AppleBoiy/onto-augmented-PHSRS',
  },
  {
    slug: 'knowledge-graph-jaist',
    section: 'research',
    year: '2025',
    featured: true,
    stack: ['Python', 'Knowledge Graphs', 'KAGAYAKI HPC', 'PBS'],
  },
  {
    slug: 'galaxy-figure-archive',
    section: 'research',
    year: '2026',
    featured: true,
    stack: ['Next.js', 'HST Catalogs', 'Density Models'],
    live: 'https://archive.chaipat.cc',
  },
  {
    slug: 'fits-viewer',
    section: 'tools',
    year: '2026',
    featured: true,
    stack: ['Next.js', 'Canvas API', 'FITS'],
    live: 'https://sky.chaipat.cc',
  },
  {
    slug: 'graph-explorer',
    section: 'tools',
    year: '2025',
    stack: ['Next.js', 'D3.js', 'PostgreSQL', 'Redis'],
    live: 'https://graph.chaipat.cc',
  },
  {
    slug: 'auto-grader',
    section: 'tools',
    year: '2024',
    stack: ['Python', 'GPT-3.5 API', 'Docker', 'SQL', 'CI/CD'],
  },
  {
    slug: 'word-games',
    section: 'tools',
    year: '2026',
    stack: ['React', 'Vite', 'Trie', 'DFS'],
    live: 'https://wp.chaipat.cc',
  },
  {
    slug: 'kiwis',
    section: 'tools',
    year: '2022 — 2025',
    stack: ['Makefile', 'Bash', 'Technical Writing'],
    live: 'https://kiwis.chaipat.cc',
    source: 'https://github.com/AppleBoiy/kiwis',
  },
];

export function getProject(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}
