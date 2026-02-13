const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

if (!TMDB_ACCESS_TOKEN) {
  throw new Error('Missing TMDB_ACCESS_TOKEN in environment variables');
}

/**
 * Fetch movie details, videos, and watch providers in a single call.
 * @param {string} movieId - The movie ID.
 * @returns {Promise<Object>} - The JSON response containing movie details.
 */
async function fetchMovieDetails(movieId) {
  const url = `${process.env.TMDB_API_URL}/movie/${movieId}?append_to_response=videos,watch/providers&language=en-US`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movie details: ${response.status} ${response.statusText}`
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
    const response = await fetch('http://ip-api.com/json/');
    if (!response.ok) throw new Error('Failed to fetch country data');

    const countryData = await response.json();
    return {
      country: countryData.country || defaultCountry.country,
      code: countryData.countryCode || defaultCountry.code,
    };
  } catch (error) {
    console.warn(
      'Warning: Could not fetch country data, using default.',
      error
    );
    return defaultCountry;
  }
}

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
    const [movieData, userCountry] = await Promise.all([
      fetchMovieDetails(movieId),
      fetchUserCountry(),
    ]);

    res.status(200).json({ success: true, ...movieData, country: userCountry });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
}
