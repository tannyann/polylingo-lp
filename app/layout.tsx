import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import MotionProvider from '@/components/MotionProvider';
import { JsonLd } from '@/components/JsonLd';
import { getSiteUrl } from '@/lib/site';
import { pages } from '@/lib/copy';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const siteUrl = getSiteUrl();
const defaultCopy = pages.ja;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultCopy.meta.title,
    template: '%s — PolyLingo',
  },
  description: defaultCopy.meta.description,
  keywords: defaultCopy.meta.keywords,
  authors: [{ name: 'PolyLingo' }],
  creator: 'PolyLingo',
  openGraph: {
    title: defaultCopy.meta.ogTitle,
    description: defaultCopy.meta.ogDescription,
    url: siteUrl,
    siteName: 'PolyLingo',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultCopy.meta.ogTitle,
    description: defaultCopy.meta.ogDescription,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#1F3864',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJp.variable}`}>
      <body>
        <MotionProvider>
          <JsonLd />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
          >
            コンテンツへスキップ
          </a>
          {children}
          <AnalyticsProvider />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
