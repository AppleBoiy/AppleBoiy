import { notFound } from 'next/navigation';
import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { PROJECTS, getProject } from '@/content/projects';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PROJECTS.map(({ slug }) => ({ locale, slug })));
}

export const dynamicParams = false;

// Each project is printed in full inside the paper; old links jump to its story.
export default async function ProjectRedirect({ params }) {
  const { locale, slug } = await params;
  if (!getProject(slug)) notFound();
  redirect({ href: `/#story-${slug}`, locale });
}
