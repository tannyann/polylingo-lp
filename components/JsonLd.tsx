import { pages } from '@/lib/copy';

const copy = pages.ja;
const siteUrl = 'https://polylingo.app';

export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'PolyLingo',
        url: siteUrl,
        description: copy.meta.description,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#app`,
        name: 'PolyLingo',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'iOS',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'JPY',
        },
        description: copy.meta.description,
        url: siteUrl,
        publisher: { '@id': `${siteUrl}/#organization` },
        featureList: [
          '30構文 × 8言語横断学習',
          'エビングハウス忘却曲線ベース SRS',
          '脳構造適応型解説言語切替',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
