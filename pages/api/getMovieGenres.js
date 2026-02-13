import { fetchMovieGenres } from '~/utils/tmdb';

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
