const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TMDB_API_URL = process.env.TMDB_API_URL;

if (!TMDB_ACCESS_TOKEN) {
  throw new Error('Missing TMDB_ACCESS_TOKEN in environment variables');
}

/**
 * Helper to fetch data from TMDB
 */
async function fetchTmdb(endpoint, params = {}) {
  const url = new URL(`${TMDB_API_URL}${endpoint}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch from TMDB: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Fetch movie genres from TMDb API.
 * @returns {Promise<Object>} - The JSON response containing movie genres.
 */
export async function fetchMovieGenres() {
  return fetchTmdb('/genre/movie/list', { language: 'en-US' });
}

/**
 * Fetch movies by genre ID.
 * @param {string} genreId
 * @param {number} page
 * @returns {Promise<Object>}
 */
export async function fetchMoviesByGenre(genreId, page = 1) {
  // 1. Fetch movies for this genre
  const moviesData = await fetchTmdb('/discover/movie', {
    with_genres: genreId,
    page: page.toString(),
    sort_by: 'popularity.desc',
    'vote_count.gte': '100', // Filter out movies with very few votes
    language: 'en-US',
  });

  // 2. Fetch all genres to map IDs to names (for the movie cards)
  const genresData = await fetchMovieGenres();
  const genresMap = genresData.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  // 3. Map genre IDs to names in the movie results
  const results = moviesData.results.map((movie) => ({
    ...movie,
    genres: movie.genre_ids.map((id) => ({ id, name: genresMap[id] })),
  }));

  return { ...moviesData, results };
}

/**
 * Fetch movie details, videos, and watch providers in a single call.
 * @param {string} movieId - The movie ID.
 * @returns {Promise<Object>} - The JSON response containing movie details.
 */
export async function fetchMovieDetails(movieId) {
  return fetchTmdb(`/movie/${movieId}`, {
    append_to_response: 'videos,watch/providers',
    language: 'en-US',
  });
}
