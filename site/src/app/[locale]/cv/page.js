import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RESUME_EXPERIENCE, RESUME_PROJECT, RESUME_SKILLS } from '@/content/resume';
import { SITE, stripProtocol } from '@/content/site';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Resume' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: { canonical: `/${locale}/cv` } };
}

function Band({ index, label, children }) {
  return (
    <section className="band" aria-labelledby={`cv-${index}`}>
      <header className="band-label">
        <span className="num mono">{index}</span>
        <h2 id={`cv-${index}`} className="eyebrow">{label}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

function Entry({ title, meta, period, points, stack, url, urlLabel }) {
  return (
    <article className="entry">
      <h3 className="entry-title">{title}</h3>
      <p className="entry-period mono">{period}</p>
      {meta && <p className="entry-meta">{meta}</p>}
      {points?.length > 0 && (
        <ul className="points">
          {points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      )}
      {(stack?.length > 0 || url) && (
        <p className="tags">
          {stack?.length > 0 && <span>{stack.join(' · ')}</span>}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="link muted">
              {urlLabel || stripProtocol(url)} <span className="arrow arrow-ne" aria-hidden="true">↗</span>
            </a>
          )}
        </p>
      )}
    </article>
  );
}

export default async function CvPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Resume');

  const contacts = [
    { label: t('contact.email'), value: SITE.email, href: `mailto:${SITE.email}` },
    { label: t('contact.github'), value: stripProtocol(SITE.github), href: SITE.github },
    { label: t('contact.linkedin'), value: stripProtocol(SITE.linkedin), href: SITE.linkedin },
  ];

  return (
    <>
      <header className="hero rise">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="display">{SITE.name}</h1>
        <p className="lede">{t('headline')}</p>

        <dl className="cv-contacts">
          <div>
            <dt className="eyebrow">{t('contact.location')}</dt>
            <dd>{t('contact.locationValue')}</dd>
          </div>
          {contacts.map(({ label, value, href }) => (
            <div key={label}>
              <dt className="eyebrow">{label}</dt>
              <dd>
                <a
                  href={href}
                  className="link"
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <div className="cv-actions">
          <a href={SITE.resume} download={SITE.resumeFilename} className="more" style={{ marginTop: 0 }}>
            PDF <span className="arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <Band index="01" label={t('sections.profile')}>
        <p className="prose" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2vw, 1.3rem)', lineHeight: 1.65 }}>
          {t('profile')}
        </p>
      </Band>

      <Band index="02" label={t('sections.experience')}>
        <div className="entries">
          {RESUME_EXPERIENCE.map(({ key, stack, url }) => (
            <Entry
              key={key}
              title={t(`experience.${key}.role`)}
              meta={`${t(`experience.${key}.org`)} · ${t(`experience.${key}.place`)}`}
              period={t(`experience.${key}.period`)}
              points={t.raw(`experience.${key}.points`)}
              stack={stack}
              url={url}
            />
          ))}
        </div>
      </Band>

      <Band index="03" label={t('sections.education')}>
        <Entry
          title={t('education.degree')}
          meta={`${t('education.school')} · ${t('education.place')}`}
          period={t('education.period')}
          points={t.raw('education.points')}
        />
      </Band>

      <Band index="04" label={t('sections.project')}>
        <Entry
          title={t('project.title')}
          period={t('project.period')}
          points={t.raw('project.points')}
          stack={RESUME_PROJECT.stack}
          url={RESUME_PROJECT.url}
          urlLabel={t('project.repo')}
        />
      </Band>

      <Band index="05" label={t('sections.skills')}>
        <dl className="skills">
          {RESUME_SKILLS.map(({ key, value }) => (
            <div key={key}>
              <dt>{t(`skills.${key}`)}</dt>
              <dd>{value ?? t(`skillValues.${key}`)}</dd>
            </div>
          ))}
        </dl>
        <p className="mono" style={{ marginTop: 40 }}>{t('footer.updated')}</p>
      </Band>
    </>
  );
}
