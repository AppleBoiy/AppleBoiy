import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PROJECTS } from '@/content/projects';
import { RESUME_EXPERIENCE, RESUME_PROJECT, RESUME_SKILLS } from '@/content/resume';
import { SITE, stripProtocol } from '@/content/site';
import { edition as makeEdition } from '@/lib/edition';
import Masthead from '@/components/Masthead';
import Page from '@/components/Page';
import PageTurner from '@/components/PageTurner';
import GalaxyPlate from '@/components/GalaxyPlate';
import ContactForm from '@/components/ContactForm';

const TOTAL = 5;

function Story({ project, t, feature = false }) {
  const { slug } = project;
  const links = [
    project.live && { href: project.live, label: t('labels.live') },
    project.source && { href: project.source, label: t('labels.source') },
  ].filter(Boolean);

  return (
    <article id={`story-${slug}`} className={`story ${feature ? 'story-feature' : ''}`}>
      <span className="kicker">{t(`items.${slug}.category`)}</span>
      <h3>{t(`items.${slug}.title`)}</h3>
      <p className="byline">{t(`items.${slug}.role`)} · {project.year}</p>
      <div className={feature ? 'columns columns-2' : 'story-text'}>
        <p className="dropcap">{t(`items.${slug}.summary`)}</p>
        <p>{t(`items.${slug}.outcome`)}</p>
      </div>
      <p className="story-facts">
        <span>{project.stack.join(' · ')}</span>
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} ↗
          </a>
        ))}
      </p>
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
  const pageProps = { total: TOTAL, date: edition.date };

  const contacts = [
    { label: tr('contact.email'), value: SITE.email, href: `mailto:${SITE.email}` },
    { label: tr('contact.github'), value: stripProtocol(SITE.github), href: SITE.github },
    { label: tr('contact.linkedin'), value: stripProtocol(SITE.linkedin), href: SITE.linkedin },
  ];

  return (
    <>
      {/* ── Page 1: front page ── */}
      <Page n={1} {...pageProps}>
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
            <ol className="inside">
              {paper.raw('inside.items').map((item) => (
                <li key={item.page}>
                  <a href={`#page-${item.page}`}>
                    <span>{item.label}</span>
                    <span className="inside-dots" aria-hidden="true" />
                    <span className="inside-page">{paper('page', { n: item.page })}</span>
                  </a>
                </li>
              ))}
            </ol>

            <h2 className="box-title" style={{ marginTop: 24 }}>{t('brief.title')}</h2>
            <ul className="brief">
              {t.raw('brief.items').map((item) => (
                <li key={item.head}>
                  <h4>{item.head}</h4>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>

            <PosterAd
              kicker={t('ad.kicker')}
              script={t('ad.script')}
              line={t('ad.line')}
              sub={t('ad.sub')}
              cta={t('ad.cta')}
              href="#page-5"
              footnote={SITE.email}
            />
          </aside>
        </div>

        <section className="positions" aria-labelledby="record">
          <header className="section-head">
            <h2 id="record">{t('record.title')}</h2>
            <p>{t('record.subtitle')}</p>
          </header>
          <ol className="record record-row">
            {t.raw('record.items').map((item) => (
              <li key={`${item.period}-${item.title}`}>
                <span className="record-period">{item.period}</span>
                <p className="record-title">{item.title}</p>
                <p className="record-org">{item.org}</p>
              </li>
            ))}
          </ol>
        </section>
      </Page>

      {/* ── Pages 2–3: the projects, printed in full ── */}
      <Page n={2} head={paper('pageHeads.projects')} {...pageProps}>
        <header className="section-front">
          <span className="kicker">{tp('section')}</span>
          <h2 className="headline">{tp('heading')}</h2>
          <p className="deck">{tp('intro')}</p>
        </header>
        <div className="stories">
          {PROJECTS.slice(0, 4).map((project, i) => (
            <Story key={project.slug} project={project} t={tp} feature={i === 0} />
          ))}
        </div>
      </Page>

      <Page n={3} head={paper('pageHeads.projectsMore')} {...pageProps}>
        <div className="stories stories-with-ad">
          {PROJECTS.slice(4).map((project) => (
            <Story key={project.slug} project={project} t={tp} />
          ))}
          <div className="story story-ad">
            <PosterAd
              kicker={paper('adCv.kicker')}
              script={paper('adCv.script')}
              line={paper('adCv.line')}
              sub={paper('adCv.sub')}
              cta={paper('adCv.cta')}
              href={SITE.resume}
              download={SITE.resumeFilename}
            />
          </div>
        </div>
      </Page>

      {/* ── Page 4: curriculum vitae ── */}
      <Page n={4} head={paper('pageHeads.cv')} {...pageProps}>
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

        <div className="cv-grid">
          <div>
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
          <div className="cv-side">
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
        </div>
      </Page>

      {/* ── Page 5: letters and the back-page advertisement ── */}
      <Page n={5} head={paper('pageHeads.letters')} {...pageProps}>
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

      <PageTurner total={TOTAL} />
    </>
  );
}
