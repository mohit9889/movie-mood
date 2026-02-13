/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL || 'https://moviemood-psi.vercel.app',
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      // `${process.env.BASE_URL}/server-sitemap.xml`, // if we have dynamic server-side sitemap
    ],
  },
};
