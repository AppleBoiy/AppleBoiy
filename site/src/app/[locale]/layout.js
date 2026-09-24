import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/app/fonts';
import { SITE } from '@/content/site';
import Chrome from '@/components/Chrome';
import SiteFooter from '@/components/SiteFooter';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Site' });

  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('title'), template: `%s — ${t('name')}` },
    description: t('description'),
    authors: [{ name: SITE.name, url: SITE.url }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: { type: 'website', siteName: SITE.name, title: t('title'), description: t('description'), locale },
    twitter: { card: 'summary', title: t('title'), description: t('description') },
    icons: { icon: '/logo.png', apple: '/logo.png' },
  };
}

export const viewport = {
  themeColor: '#0f64b0',
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Site' });

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <NextIntlClientProvider>
          <a href="#main" className="skip">{t('nav.skip')}</a>
          <Chrome />
          <main id="main">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
