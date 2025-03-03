const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

if (!MOVIE_API_KEY) {
  throw new Error('Missing MOVIE_API_KEY in environment variables');
}

/**
 * Fetches movie streaming providers from TMDb.
 * @param {string} movieId - The movie ID.
 * @returns {Promise<Object>} - The JSON response containing streaming providers.
 */
async function fetchStreamingProviders(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${MOVIE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movie streaming data: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Determines the user's country using IP geolocation.
 * Falls back to 'India' (IN) if unable to fetch country data.
 * @returns {Promise<{ country: string, code: string }>}
 */
async function fetchUserCountry() {
  const defaultCountry = { country: 'India', code: 'IN' };

  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch country data');
    }

    const countryData = await response.json();
    return {
      country: countryData.country_name || defaultCountry.country,
      code: countryData.country_code || defaultCountry.code,
    };
  } catch (error) {
    console.warn(
      'Warning: Could not fetch country data, using default.',
      error
    );
    return defaultCountry;
  }
}

/**
 * API handler to fetch movie streaming providers based on movie ID.
 * Determines the user's country using IP geolocation.
 * @param {import('next').NextApiRequest} req - The request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ success: false, error: 'Method Not Allowed', status: 405 });
  }

  const { movieId } = req.query;
  if (!movieId) {
    return res
      .status(400)
      .json({ success: false, error: 'Movie ID is required' });
  }

  try {
    // Fetch streaming providers and user country in parallel
    const [streamingData, userCountry] = await Promise.all([
      fetchStreamingProviders(movieId),
      fetchUserCountry(),
    ]);

    res
      .status(200)
      .json({ success: true, streaming: streamingData, country: userCountry });
  } catch (error) {
    console.error('Error fetching movie streaming data:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
}
