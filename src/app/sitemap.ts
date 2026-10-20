import type { MetadataRoute } from 'next';
import { getPublishedPostFiles } from '@/lib/blogUtils';

// Generated at build time, so it only ever lists posts that are live
export const dynamic = 'force-static';

const SITE = 'https://roscas.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/your-circle`, lastModified: '2026-07-12', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/get-started`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/community-liaison`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/contact`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const posts: MetadataRoute.Sitemap = getPublishedPostFiles()
    .sort((a, b) => new Date(a.data.date as string).getTime() - new Date(b.data.date as string).getTime())
    .map(({ slug, data }) => ({
      url: `${SITE}/blog/${slug}`,
      lastModified: new Date(data.date as string).toISOString().slice(0, 10),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...pages, ...posts];
}
