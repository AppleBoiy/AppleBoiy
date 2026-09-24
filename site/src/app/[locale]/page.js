import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PROJECTS } from '@/content/projects';
import { RESUME_EXPERIENCE, RESUME_PROJECT, RESUME_SKILLS } from '@/content/resume';
import { SITE, stripProtocol } from '@/content/site';
import { edition as makeEdition } from '@/lib/edition';
import { PAGES, TOTAL_PAGES, projectPage } from '@/content/pages';
import Masthead from '@/components/Masthead';
import Page from '@/components/Page';
import PageTurner from '@/components/PageTurner';
import GalaxyPlate from '@/components/GalaxyPlate';
import ContactForm from '@/components/ContactForm';

function Story({ project, index, t, paper }) {
  const { slug } = project;
  const links = [
    project.live && { href: project.live, label: t('labels.live') },
    project.source && { href: project.source, label: t('labels.source') },
  ].filter(Boolean);

  return (
    <article id={`story-${slug}`} className="feature">
      <header className="feature-head">
        <p className="feature-meta">
          <span className="kicker">{t(`items.${slug}.category`)}</span>
          <span className="byline">{paper('storyOf', { n: index + 1, total: PROJECTS.length })}</span>
        </p>
        <h2 className="headline">{t(`items.${slug}.title`)}</h2>
        <p className="deck">{t(`items.${slug}.role`)} · {project.year}</p>
      </header>

      <div className="feature-body">
        <div className="feature-text">
          <p className="feature-lede dropcap">{t(`items.${slug}.summary`)}</p>
          <blockquote className="pull-quote">
            <span className="label">{paper('pullQuote')}</span>
            <p>{t(`items.${slug}.outcome`)}</p>
          </blockquote>
        </div>

        <aside>
          <h3 className="box-title">{t('labels.factFile')}</h3>
          <dl className="facts">
            <div>
              <dt>{t('labels.year')}</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>{t('labels.role')}</dt>
              <dd>{t(`items.${slug}.role`)}</dd>
            </div>
            <div>
              <dt>{t('labels.stack')}</dt>
              <dd>{project.stack.join(', ')}</dd>
            </div>
            {links.length > 0 && (
              <div>
                <dt>{t('labels.links')}</dt>
                <dd>
                  {links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </article>
  );
}

function Entry({ title, meta, period, points, stack, url, urlLabel }) {
  return (
    <article className="entry">
      <div className="entry-top">
        <h3 className="entry-title">{title}</h3>
        <span className="entry-period">{period}</span>
      </div>
      {meta && <p className="entry-meta">{meta}</p>}
      {points?.length > 0 && (
        <ul className="points">
          {points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      )}
      {(stack?.length > 0 || url) && (
        <p className="stack">
          {stack?.join(' · ')}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {urlLabel || stripProtocol(url)} ↗
            </a>
          )}
        </p>
      )}
    </article>
  );
}

function PosterAd({ kicker, script, line, sub, cta, href, download, footnote }) {
  return (
    <div className="ad">
      <span className="ad-kicker">{kicker}</span>
      <div className="ad-poster">
        <span className="ad-script" lang="en">{script}</span>
        <span className="ad-ribbon">{line}</span>
        <p className="ad-sub">{sub}</p>
        <a href={href} className="ad-cta" {...(download ? { download } : {})}>
          {cta} <span aria-hidden="true">→</span>
        </a>
        {footnote && <span className="ad-address">{footnote}</span>}
      </div>
    </div>
  );
}

export default async function Edition({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tp = await getTranslations('Projects');
  const tr = await getTranslations('Resume');
  const paper = await getTranslations('Paper');
  const site = await getTranslations('Site');
  const edition = makeEdition(locale);
  const pageProps = { total: TOTAL_PAGES, date: edition.date };

  const contacts = [
    { label: tr('contact.email'), value: SITE.email, href: `mailto:${SITE.email}` },
    { label: tr('contact.github'), value: stripProtocol(SITE.github), href: SITE.github },
    { label: tr('contact.linkedin'), value: stripProtocol(SITE.linkedin), href: SITE.linkedin },
  ];

  const index = [
    ...PROJECTS.map((project) => ({ label: tp(`items.${project.slug}.title`), page: projectPage(project.slug) })),
    { label: paper('inside.cv'), page: PAGES.cv },
    { label: paper('inside.letters'), page: PAGES.letters },
  ];

  return (
    <>
      {/* ── Page 1: front page ── */}
      <Page n={PAGES.front} {...pageProps}>
        <Masthead edition={edition} />
        <div className="front">
          <article className="lead">
            <span className="kicker">{t('lead.kicker')}</span>
            <h2 className="headline">{t('lead.headline')}</h2>
            <p className="deck">{t('lead.deck')}</p>
            <div className="lead-meta">
              <span className="byline">{t('lead.byline')}</span>
              <span className="byline">{SITE.name}</span>
            </div>
            <div className="lead-body">
              <div className="columns">
                {t.raw('lead.body').map((paragraph, i) => (
                  <p key={paragraph}>
                    {i === 0 && <span className="dateline">{t('lead.dateline')}</span>}
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="photo">
                <GalaxyPlate caption={t('lead.caption')} />
              </div>
            </div>
          </article>

          <aside>
            <h2 className="box-title">{paper('inside.title')}</h2>
            <p className="inside-group label">{paper('inside.projects')}</p>
            <ol className="inside">
              {index.map((item) => (
                <li key={item.page}>
                  <a href={`#page-${item.page}`}>
                    <span>{item.label}</span>
                    <span className="inside-dots" aria-hidden="true" />
                    <span className="inside-page">{item.page}</span>
                  </a>
                </li>
              ))}
            </ol>

            <PosterAd
              kicker={t('ad.kicker')}
              script={t('ad.script')}
              line={t('ad.line')}
              sub={t('ad.sub')}
              cta={t('ad.cta')}
              href={`#page-${PAGES.letters}`}
              footnote={SITE.email}
            />
          </aside>
        </div>
      </Page>

      {/* ── One page per project ── */}
      {PROJECTS.map((project, i) => (
        <Page
          key={project.slug}
          n={projectPage(project.slug)}
          head={`${paper('pageHeads.projects')} · ${tp(`items.${project.slug}.category`)}`}
          {...pageProps}
        >
          <Story project={project} index={i} t={tp} paper={paper} />
        </Page>
      ))}

      {/* ── Curriculum vitae, two pages ── */}
      <Page n={PAGES.cv} head={paper('pageHeads.cv')} {...pageProps}>
        <header className="cv-head">
          <span className="kicker">{tr('kicker')}</span>
          <h2 className="headline">{tr('heading')}</h2>
          <p className="deck">{tr('deck')}</p>
        </header>

        <dl className="cv-contacts">
          <div>
            <dt>{tr('contact.location')}</dt>
            <dd>{tr('contact.locationValue')}</dd>
          </div>
          {contacts.map(({ label, value, href }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <div className="cv-download">
          <a href={SITE.resume} download={SITE.resumeFilename} className="btn">
            {tr('download')} <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="cv-page">
          <section className="cv-block">
            <h3 className="box-title">{tr('sections.profile')}</h3>
            <p className="profile-text dropcap">{tr('profile')}</p>
          </section>
          <section className="cv-block">
            <h3 className="box-title">{tr('sections.experience')}</h3>
            {RESUME_EXPERIENCE.map(({ key, stack, url }) => (
              <Entry
                key={key}
                title={tr(`experience.${key}.role`)}
                meta={`${tr(`experience.${key}.org`)} · ${tr(`experience.${key}.place`)}`}
                period={tr(`experience.${key}.period`)}
                points={tr.raw(`experience.${key}.points`)}
                stack={stack}
                url={url}
              />
            ))}
          </section>
        </div>
      </Page>

      <Page n={PAGES.cvMore} head={paper('pageHeads.cvMore')} {...pageProps}>
        <div className="cv-page">
          <section className="cv-block">
            <h3 className="box-title">{tr('sections.education')}</h3>
            <Entry
              title={tr('education.degree')}
              meta={`${tr('education.school')} · ${tr('education.place')}`}
              period={tr('education.period')}
              points={tr.raw('education.points')}
            />
          </section>
          <section className="cv-block">
            <h3 className="box-title">{tr('sections.project')}</h3>
            <Entry
              title={tr('project.title')}
              period={tr('project.period')}
              points={tr.raw('project.points')}
              stack={RESUME_PROJECT.stack}
              url={RESUME_PROJECT.url}
              urlLabel={tr('project.repo')}
            />
          </section>
          <section className="cv-block">
            <h3 className="box-title">{tr('sections.skills')}</h3>
            <dl className="skills">
              {RESUME_SKILLS.map(({ key, value }) => (
                <div key={key}>
                  <dt>{tr(`skills.${key}`)}</dt>
                  <dd>{value ?? tr(`skillValues.${key}`)}</dd>
                </div>
              ))}
            </dl>
            <p className="byline" style={{ marginTop: 16 }}>{tr('footer.updated')}</p>
          </section>
        </div>
      </Page>

      {/* ── Letters and the back-page advertisement ── */}
      <Page n={PAGES.letters} head={paper('pageHeads.letters')} {...pageProps}>
        <div className="back-page">
          <section id="letters" aria-labelledby="letters-title">
            <header className="section-head">
              <h2 id="letters-title">{t('letters.title')}</h2>
            </header>
            <p className="letters-intro">{t('letters.text')}</p>
            <ContactForm email={SITE.email} labels={t.raw('letters.form')} />
          </section>
          <PosterAd
            kicker={t('ad.kicker')}
            script={t('ad.script')}
            line={t('ad.line')}
            sub={t('ad.sub')}
            cta={t('ad.cta')}
            href={`mailto:${SITE.email}`}
            footnote={SITE.email}
          />
        </div>
        <p className="colophon">
          © {new Date().getFullYear()} {site('footer.rights')} · {site('footer.printed')} ·{' '}
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a> ·{' '}
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{' '}
          <a href="#page-1">{site('footer.top')} ↑</a>
        </p>
      </Page>

      <PageTurner total={TOTAL_PAGES} />
    </>
  );
}
