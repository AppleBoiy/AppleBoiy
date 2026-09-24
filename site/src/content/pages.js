import { PROJECTS } from './projects';

// Page plan of the edition. One project per page so every story has room to breathe.
export const PAGES = {
  front: 1,
  firstProject: 2,
  cv: 2 + PROJECTS.length,
  cvMore: 3 + PROJECTS.length,
  letters: 4 + PROJECTS.length,
};

export const TOTAL_PAGES = PAGES.letters;

export function projectPage(slug) {
  return PAGES.firstProject + PROJECTS.findIndex((project) => project.slug === slug);
}
