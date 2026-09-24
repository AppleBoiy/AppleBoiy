export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chaipat.cc',
  name: 'Chaipat Jainan',
  email: 'contact@chaipat.cc',
  github: 'https://github.com/AppleBoiy',
  linkedin: 'https://www.linkedin.com/in/chaipat-jainan/',
  resume: '/resume.pdf',
  resumeFilename: 'Chaipat_Jainan_CV.pdf',
};

export function stripProtocol(url) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
