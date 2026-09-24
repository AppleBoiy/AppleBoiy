import { PROJECTS } from './projects';

// Page plan of the edition. Projects are grouped by section, one page per section,
// and each section page has its own layout.
export const SECTIONS = ['research', 'tools'];

export const PAGES = {
  front: 1,
  research: 2,
  tools: 3,
  cv: 4,
  cvMore: 5,
  letters: 6,
};

export const TOTAL_PAGES = PAGES.letters;

export function projectsIn(section) {
  return PROJECTS.filter((project) => project.section === section);
}

export function projectPage(slug) {
  const project = PROJECTS.find((entry) => entry.slug === slug);
  return project ? PAGES[project.section] : PAGES.research;
}
