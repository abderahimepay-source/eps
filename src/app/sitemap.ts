import { MetadataRoute } from 'next'

/**
 * @fileOverview ينشئ خريطة الموقع (Sitemap) تلقائياً لتحسين SEO.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://modakira.dz'
  
  // الروابط الثابتة للموقع
  const routes = [
    '',
    '/blog',
    '/blog/competencies-guide',
    '/blog/curriculum-2023',
    '/blog/curriculum-data',
    '/pricing',
    '/pricing-guide',
    '/privacy-policy',
    '/terms-of-service',
    '/auth/sign-in',
    '/auth/sign-up',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
