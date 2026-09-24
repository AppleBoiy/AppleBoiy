import { routing } from '@/i18n/routing';
import { PROJECTS } from '@/content/projects';
import { SITE } from '@/content/site';

export default function sitemap() {
  const paths = ['', '/projects', '/cv', ...PROJECTS.map(({ slug }) => `/projects/${slug}`)];
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({ url: `${SITE.url}/${locale}${path}`, changeFrequency: 'monthly' }))
  );
}
