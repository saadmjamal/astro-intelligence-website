/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://astrointelligence.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/api/*', '/admin/*', '/auth/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
    ],
    additionalSitemaps: [
      'https://astrointelligence.com/sitemap-blog.xml',
      'https://astrointelligence.com/sitemap-portfolio.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom transform for blog posts
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    // Custom transform for portfolio
    if (path.startsWith('/portfolio/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    // Default transform
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
