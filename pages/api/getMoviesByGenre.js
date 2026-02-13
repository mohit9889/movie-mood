import { fetchMoviesByGenre } from '~/utils/tmdb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ success: false, error: 'Method Not Allowed', status: 405 });
  }

  const { genreId, page = 1 } = req.query;

  if (!genreId) {
    return res
      .status(400)
      .json({ success: false, error: 'Genre ID is required' });
  }

  try {
    const moviesData = await fetchMoviesByGenre(genreId, page);
    res.status(200).json({
      success: true,
      movies: moviesData.results,
      total_pages: moviesData.total_pages,
    });
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
}
