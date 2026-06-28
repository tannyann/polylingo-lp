import type { MetadataRoute } from 'next';

const siteUrl = 'https://polylingo.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/learning-system', '/privacy', '/terms'];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.5,
  }));
}
