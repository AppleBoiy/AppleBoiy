import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PROJECTS } from '@/content/projects';
import { SITE } from '@/content/site';
import rich from '@/components/Rich';
import HalftoneClouds from '@/components/HalftoneClouds';
import Starfield from '@/components/Starfield';
import GalaxyPlate from '@/components/GalaxyPlate';
import Constellation from '@/components/Constellation';
import ContactForm from '@/components/ContactForm';

const INTRO_CLOUDS = [
  { x: 0.2, y: 0.0, w: 0.6, h: 0.24 },
  { x: 0.6, y: 0.3, w: 0.4, h: 0.16 },
];

const CONTACT_CLOUDS = [
  { x: -0.05, y: 0.2, w: 0.45, h: 0.5 },
  { x: 0.62, y: 0.35, w: 0.45, h: 0.45 },
];

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tp = await getTranslations('Projects');

  const projects = PROJECTS.map((project) => ({
    slug: project.slug,
    star: project.star,
    year: project.year,
    title: tp(`items.${project.slug}.title`),
    category: tp(`items.${project.slug}.category`),
    summary: tp(`items.${project.slug}.summary`),
  }));

  return (
    <>
      <section id="intro" data-scene="sky" data-label={t('sections.intro')} className="scene scene-sky intro">
        <div className="scene-art clouds-intro">
          <HalftoneClouds clouds={INTRO_CLOUDS} seed={11} />
        </div>
        <div>
          <p className="tag" data-reveal>{t('intro.tag')}</p>
          <h1 className="display" data-reveal="2">{rich(t, 'intro.title')}</h1>
        </div>
        <div className="intro-foot">
          <p className="lead" data-reveal="3">{t('intro.text')}</p>
          <div className="intro-now" data-reveal="4">
            <p className="tag">{t('intro.nowTag')}</p>
            <p className="body">{t('intro.now')}</p>
          </div>
        </div>
      </section>

      <section id="research" data-scene="paper" data-label={t('sections.research')} className="scene scene-paper">
        <div className="research">
          <div data-reveal>
            <GalaxyPlate caption={t('research.plate')} />
          </div>
          <div className="research-text">
            <p className="tag" data-reveal>{t('research.tag')}</p>
            <h2 className="h2" data-reveal="2">{rich(t, 'research.title')}</h2>
            <p className="lead" data-reveal="3">{t('research.text')}</p>
            <div className="focus" data-reveal="4">
              <p className="tag">{t('research.focusTag')}</p>
              <ul className="body">
                {t.raw('research.focus').map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="work" data-scene="sky" data-label={t('sections.work')} className="scene scene-night">
        <div className="scene-art">
          <Starfield seed={5} bright={9} />
        </div>
        <header className="work-head">
          <div>
            <p className="tag" data-reveal>{t('work.tag')}</p>
            <h2 className="h2" data-reveal="2">{rich(t, 'work.title')}</h2>
          </div>
          <p className="work-hint" data-reveal="3">{t('work.hint')}</p>
        </header>
        <div data-reveal="3">
          <Constellation projects={projects} labels={{ read: t('work.read') }} />
        </div>
        <Link href="/projects" className="text-link work-all">
          {t('work.all')} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      <section id="path" data-scene="paper" data-label={t('sections.path')} className="scene scene-paper">
        <div className="path">
          <header className="path-head">
            <p className="tag" data-reveal>{t('path.tag')}</p>
            <h2 className="h2" data-reveal="2">{rich(t, 'path.title')}</h2>
            <Link href="/cv" className="text-link path-cta" data-reveal="3">
              {t('path.cv')} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </header>
          <ol className="path-list" data-reveal="3">
            {t.raw('path.items').map((item) => (
              <li key={`${item.period}-${item.title}`}>
                <span className="tag path-period">{item.period}</span>
                <div>
                  <p className="path-title">{item.title}</p>
                  <p className="path-org">{item.org}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" data-scene="sky" data-label={t('sections.contact')} className="scene scene-night">
        <div className="scene-art">
          <Starfield seed={21} bright={12} density={0.0003} />
        </div>
        <div className="scene-art clouds-contact">
          <HalftoneClouds clouds={CONTACT_CLOUDS} seed={4} color="196, 214, 244" />
        </div>
        <div className="contact">
          <div className="contact-text">
            <p className="tag" data-reveal>{t('contact.tag')}</p>
            <h2 className="h2" data-reveal="2">{rich(t, 'contact.title')}</h2>
            <p className="lead" data-reveal="3">{t('contact.text')}</p>
          </div>
          <div data-reveal="3">
            <ContactForm email={SITE.email} labels={t.raw('contact.form')} />
          </div>
        </div>
      </section>
    </>
  );
}
