export async function getServerSideProps({ res }) {
  const BASE_URL = process.env.BASE_URL;

  try {
    // Fetch the sitemap XML from the existing API
    const response = await fetch(`${BASE_URL}/api/sitemap`);
    const sitemap = await response.text();

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return { props: {} };
  }
}

// This page does not render anything on the frontend
export default function Sitemap() {
  return null;
}
