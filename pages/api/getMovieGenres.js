const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

if (!MOVIE_API_KEY) {
  throw new Error('Missing MOVIE_API_KEY in environment variables');
}

/**
 * Fetch movie genres from TMDb API.
 * @returns {Promise<Object>} - The JSON response containing movie genres.
 * @throws {Error} - If the fetch request fails.
 */
async function fetchMovieGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}&language=en-US`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movie genres: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * API handler to fetch movie genres.
 * @param {import('next').NextApiRequest} req - The request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ success: false, error: 'Method Not Allowed', status: 405 });
  }

  try {
    const data = await fetchMovieGenres();
    res.status(200).json({ success: true, genres: data.genres });
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
}
