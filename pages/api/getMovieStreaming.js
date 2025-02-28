const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

/**
 * API handler to fetch movie streaming providers based on movie ID.
 * Determines the user's country using IP geolocation.
 * @param {import('next').NextApiRequest} req - The request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed', status: 405 });
  }

  const { movieId } = req.query;
  if (!movieId) {
    return res.status(400).json({ error: 'Movie ID is required' });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${MOVIE_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movie streaming data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();

    // Default country
    let country = {
      country: 'India',
      code: 'IN',
    };

    try {
      const countryResponse = await fetch('https://ipapi.co/json/');
      if (countryResponse.ok) {
        const countryData = await countryResponse.json();
        country = {
          country: countryData.country_name || country.country,
          code: countryData.country_code || country.code,
        };
      }
    } catch (countryError) {
      console.warn(
        'Warning: Could not fetch country data, using default.',
        countryError
      );
    }

    res.status(200).json({ streaming: data, country });
  } catch (error) {
    console.error('Error fetching movie streaming data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
