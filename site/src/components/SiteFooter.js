import { getTranslations } from 'next-intl/server';
import { SITE, stripProtocol } from '@/content/site';

export default async function SiteFooter() {
  const t = await getTranslations('Site');

  return (
    <footer className="site-footer">
      <div className="page">
        <div className="footer-grid">
          <p className="wordmark">Chaipat Jainan</p>
          <div>
            <p className="eyebrow">{t('footer.contact')}</p>
            <ul style={{ marginTop: 12 }}>
              <li><a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">{t('footer.elsewhere')}</p>
            <ul style={{ marginTop: 12 }}>
              <li><a className="link" href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a className="link" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {t('footer.rights')}</span>
          <span>{stripProtocol(SITE.url)}</span>
          <a href="#top" className="link">{t('footer.top')} ↑</a>
        </div>
      </div>
    </footer>
  );
}
