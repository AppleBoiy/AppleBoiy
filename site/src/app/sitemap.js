import { routing } from '@/i18n/routing';
import { SITE } from '@/content/site';

// The whole paper is one page per edition (language).
export default function sitemap() {
  return routing.locales.map((locale) => ({ url: `${SITE.url}/${locale}`, changeFrequency: 'monthly' }));
}
