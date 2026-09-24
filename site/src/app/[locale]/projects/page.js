import { redirect } from '@/i18n/navigation';

// The projects now live inside the paper, one per page.
export default async function ProjectsRedirect({ params }) {
  const { locale } = await params;
  redirect({ href: '/#page-2', locale });
}
