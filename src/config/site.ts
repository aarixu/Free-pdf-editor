/**
 * Site configuration
 */
export const siteConfig = {
  name: 'FreePDF',
  description: 'FreePDF gives you 90+ professional PDF tools completely free. Merge, split, compress, convert and edit PDFs — no signup, no limits, 100% private.',
  url: 'https://piscis.live',
  ogImage: '/images/og-image.png',
  links: {
    github: 'https://github.com/PDFCraftTool/pdfcraft',
    twitter: 'https://twitter.com/freepdfhub',
  },
  creator: 'FreePDF',
  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'free PDF tools',
    'online PDF editor',
    'browser-based PDF',
    'private PDF processing',
  ],
  // SEO-related settings
  seo: {
    titleTemplate: '%s | FreePDF',
    defaultTitle: 'FreePDF — 90+ Free PDF Tools Online',
    twitterHandle: '@FreePDFHub',
    locale: 'en_US',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Tools', href: '/tools' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { title: 'Privacy', href: '/privacy' },
    { title: 'Terms', href: '/terms' },
    { title: 'Contact', href: '/contact' },
  ],
};
