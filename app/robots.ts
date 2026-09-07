import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/** Served at /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing here should ever be indexed or crawled
        disallow: ['/api/', '/admin', '/enquiries', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}