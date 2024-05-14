import Head from "next/head";
import { useRouter } from "next/router";

const SEO = ({ title, description, ogImage, keywords }) => {
  const router = useRouter();
  const ogUrl = process.env.BASE_URL + router.asPath;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default SEO;
