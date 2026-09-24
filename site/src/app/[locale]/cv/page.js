import { redirect } from '@/i18n/navigation';
import { PAGES } from '@/content/pages';

// The curriculum vitae now lives inside the paper.
export default async function CvRedirect({ params }) {
  const { locale } = await params;
  redirect({ href: `/#page-${PAGES.cv}`, locale });
}
