import { redirect } from '@/i18n/navigation';

// The curriculum vitae is page 4 of the paper.
export default async function CvRedirect({ params }) {
  const { locale } = await params;
  redirect({ href: '/#page-4', locale });
}
