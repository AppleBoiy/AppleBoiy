// Structure for the CV page. Copy lives in messages/*.json under `Resume`.
// `start`/`end` (YYYY-MM, end null = present) draw the "service at a glance" timeline.
export const RESUME_EXPERIENCE = [
  { key: 'narit', start: '2026-04', end: null, stack: ['Python', 'HDBSCAN', 'AutoGluon', 'DOLPHOT', 'Slurm', 'A100 GPU'] },
  { key: 'jaist', start: '2025-04', end: '2025-09', stack: ['Python', 'Knowledge Graphs', 'KAGAYAKI HPC', 'PBS'] },
  { key: 'cmuDev', start: '2024-04', end: '2025-03', stack: ['Python', 'SQL', 'GPT-3.5 API', 'Docker', 'CI/CD'] },
  { key: 'cmuTa', start: '2022-08', end: '2025-03', stack: ['Makefile', 'Technical Writing'], url: 'https://github.com/AppleBoiy/kiwis' },
];

export const TIMELINE_FROM = 2022;

export const RESUME_PROJECT = {
  stack: ['OWL', 'SPARQL', 'SWRL', 'Protégé', 'Python'],
  url: 'https://github.com/AppleBoiy/onto-augmented-PHSRS',
};

// Tool names are not translated; `research` is localized via Resume.skillValues.
export const RESUME_SKILLS = [
  { key: 'languages', value: 'Python, C/C++, MATLAB, Bash, SQL' },
  { key: 'computing', value: 'NumPy, Pandas, SciPy, KAGAYAKI at JAIST (PBS), LANTA at ThaiSC (Slurm, A100 GPU), DOLPHOT photometry, Large-scale data transfer' },
  { key: 'tools', value: 'Git, Docker, Linux, Makefile, Neo4j, Protégé' },
  { key: 'research' },
];
