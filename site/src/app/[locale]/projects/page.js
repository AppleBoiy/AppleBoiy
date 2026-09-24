import { redirect } from '@/i18n/navigation';

// The projects now live on pages 2–3 of the paper.
export default async function ProjectsRedirect({ params }) {
  const { locale } = await params;
  redirect({ href: '/#page-2', locale });
}
