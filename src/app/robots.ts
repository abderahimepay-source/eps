import { MetadataRoute } from 'next'

/**
 * @fileOverview ينشئ ملف robots.txt لتوجيه محركات البحث.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://modakira.dz'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // منع أرشفة الصفحات الخاصة بالمستخدمين
      disallow: [
        '/dashboard', 
        '/profile', 
        '/lesson-plans/', 
        '/admin',
        '/payment-status'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
