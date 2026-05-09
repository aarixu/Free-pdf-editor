import type { Metadata } from 'next';
import '@/app/globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieBanner from '@/components/CookieBanner';


export const metadata: Metadata = {
  title: {
    default: 'FreePDF — 90+ Free PDF Tools Online',
    template: '%s | FreePDF'
  },
  description: 'FreePDF gives you 90+ professional PDF tools completely free. Merge, split, compress, convert and edit PDFs — no signup, no limits, 100% private and browser-based.',
  metadataBase: new URL('https://piscis.live'),
  alternates: {
    canonical: 'https://piscis.live'
  },
  openGraph: {
    siteName: 'FreePDF',
    images: ['/images/og-image.png'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FreePDFHub'
  },
  keywords: ['free pdf tools', 'merge pdf', 'split pdf', 'compress pdf', 'convert pdf', 'pdf editor online', 'free pdf converter'],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

// Root layout - provides the basic HTML structure
// The actual layout with i18n is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5946103455054975" crossOrigin="anonymous"></script>
        <style dangerouslySetInnerHTML={{ __html: 'html{scrollbar-gutter:stable}' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <GoogleAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
