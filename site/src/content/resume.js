// Structure for the CV page. Copy lives in messages/*.json under `Resume`.
export const RESUME_EXPERIENCE = [
  { key: 'narit', stack: ['Python', 'HDBSCAN', 'AutoGluon', 'HPC'] },
  { key: 'jaist', stack: ['Python', 'Knowledge Graphs', 'KAGAYAKI HPC', 'PBS'] },
  { key: 'cmuDev', stack: ['Python', 'SQL', 'GPT-3.5 API', 'Docker', 'CI/CD'] },
  { key: 'cmuTa', stack: ['Makefile', 'Technical Writing'], url: 'https://github.com/AppleBoiy/kiwis' },
];

export const RESUME_PROJECT = {
  stack: ['OWL', 'SPARQL', 'SWRL', 'Protégé', 'Python'],
  url: 'https://github.com/AppleBoiy/onto-augmented-PHSRS',
};

// Tool names are not translated; `research` is localized via Resume.skillValues.
export const RESUME_SKILLS = [
  { key: 'languages', value: 'Python, C/C++, MATLAB, Bash, SQL' },
  { key: 'computing', value: 'NumPy, Pandas, SciPy, KAGAYAKI HPC Cluster, PBS Job Scheduling' },
  { key: 'tools', value: 'Git, Docker, Linux, Makefile, Neo4j, Protégé' },
  { key: 'research' },
];
