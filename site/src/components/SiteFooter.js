import { getTranslations } from 'next-intl/server';
import { SITE } from '@/content/site';

export default async function SiteFooter() {
  const t = await getTranslations('Site');

  return (
    <footer className="site-footer">
      <hr className="rule-double" />
      <div className="footer-row">
        <span>© {new Date().getFullYear()} {t('footer.rights')} · {t('footer.printed')}</span>
        <span className="footer-links">
          <a href={`mailto:${SITE.email}`}>Email</a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </span>
        <a href="#masthead">{t('footer.top')} ↑</a>
      </div>
    </footer>
  );
}
