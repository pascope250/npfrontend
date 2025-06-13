// lib/sitemap.ts
export interface SitemapPage {
  path: string;
  lastmod?: Date;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const getStaticPages = (): SitemapPage[] => [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  { path: '/dmca', priority: 0.3, changefreq: 'yearly' },
  { path: '/sitemap', priority: 0.5, changefreq: 'monthly' },
];

export const getDynamicPages = async (): Promise<SitemapPage[]> => {
  const videoCategories = ['woodworking', 'photography', 'cooking', 'gardening'];
  const movieGenres = ['documentary', 'biography', 'sports'];

  const videoPages: SitemapPage[] = videoCategories.map((category) => ({
    path: `/videos/${category}`,
    priority: 0.7,
    changefreq: 'weekly',
  }));

  const moviePages: SitemapPage[] = movieGenres.map((genre) => ({
    path: `/movies/${genre}`,
    priority: 0.6,
    changefreq: 'weekly',
  }));

  return [
    { path: '/videos', priority: 0.8, changefreq: 'weekly' },
    ...videoPages,
    { path: '/movies', priority: 0.7, changefreq: 'weekly' },
    ...moviePages,
    { path: '/quotes', priority: 0.6, changefreq: 'monthly' },
  ];
};

export const getAllPages = async (): Promise<SitemapPage[]> => {
  const staticPages = getStaticPages();
  const dynamicPages = await getDynamicPages();
  return [...staticPages, ...dynamicPages];
};
