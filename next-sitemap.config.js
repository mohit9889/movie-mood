/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.filmvibe.fun',
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      // `${process.env.BASE_URL}/server-sitemap.xml`, // if we have dynamic server-side sitemap
    ],
  },
};
