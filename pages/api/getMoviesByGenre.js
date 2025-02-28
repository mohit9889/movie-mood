const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

/**
 * API handler to fetch movies by genre with video trailers.
 * @param {import('next').NextApiRequest} req - The request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed', status: 405 });
  }

  const { genreId, page } = req.query;
  if (!genreId) {
    return res.status(400).json({ error: 'Genre ID is required' });
  }

  try {
    // Fetch movies by genre
    const moviesResponse = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
    );
    if (!moviesResponse.ok) {
      throw new Error(
        `Failed to fetch movies: ${moviesResponse.status} ${moviesResponse.statusText}`
      );
    }
    const moviesData = await moviesResponse.json();

    // Extract movie IDs
    const movieIds = moviesData.results.map((movie) => movie.id);

    // Fetch videos and details for each movie
    const moviesWithVideos = await Promise.all(
      movieIds.map(async (id) => {
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

          return {
            ...movieDetailsData,
            video,
          };
        } catch (error) {
          console.warn(
            `Warning: Failed to fetch data for movie ID ${id}`,
            error
          );
          return null;
        }
      })
    );

    res
      .status(200)
      .json({ ...moviesData, results: moviesWithVideos.filter(Boolean) });
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
