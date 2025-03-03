const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

if (!MOVIE_API_KEY) {
  throw new Error('Missing MOVIE_API_KEY in environment variables');
}

/**
 * Fetch movies by genre with pagination.
 * @param {string} genreId - The genre ID to filter movies.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<Object>} - The JSON response containing movie data.
 */
async function fetchMoviesByGenre(genreId, page = 1) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Fetch movie details along with video trailers.
 * @param {number} id - The movie ID.
 * @returns {Promise<Object|null>} - The movie details with a trailer or null if fetching fails.
 */
async function fetchMovieDetailsWithVideo(id) {
  try {
    const [videoResponse, movieDetailsResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${MOVIE_API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_KEY}`
      ),
    ]);

    if (!videoResponse.ok || !movieDetailsResponse.ok) {
      throw new Error(`Failed to fetch movie details for ID ${id}`);
    }

    const [videoData, movieDetailsData] = await Promise.all([
      videoResponse.json(),
      movieDetailsResponse.json(),
    ]);

    const video =
      videoData.results.find((result) => result.type === 'Trailer') ||
      videoData.results[0] ||
      null;

    return { ...movieDetailsData, video };
  } catch (error) {
    console.warn(`Warning: Failed to fetch data for movie ID ${id}`, error);
    return null;
  }
}

/**
 * API handler to fetch movies by genre with video trailers.
 * @param {import('next').NextApiRequest} req - The request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
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
    // Fetch movies by genre
    const moviesData = await fetchMoviesByGenre(genreId, page);

    // Fetch videos and details for each movie
    const moviesWithVideos = await Promise.all(
      moviesData.results.map((movie) => fetchMovieDetailsWithVideo(movie.id))
    );

    res.status(200).json({
      success: true,
      ...moviesData,
      results: moviesWithVideos.filter(Boolean),
    });
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
}
