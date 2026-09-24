import { SITE } from '@/content/site';

export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE.url}/sitemap.xml` };
}
