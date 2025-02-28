const BASE_URL = process.env.BASE_URL;

/**
 * Fetches movie genres from the API.
 * @returns {Promise<Object>} A promise that resolves to the list of movie genres.
 */
export async function getMovieGenres() {
  try {
    const response = await fetch(`${BASE_URL}/api/getMovieGenres`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movie genres: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    throw error;
  }
}

/**
 * Fetches movies by genre from the API.
 * @param {number} genreId - The ID of the genre.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<Object>} A promise that resolves to the list of movies in the given genre.
 */
export async function getMoviesByGenre(genreId, page) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/getMoviesByGenre?genreId=${genreId}&page=${page}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching movies for genre ${genreId}, page ${page}:`,
      error
    );
    throw error;
  }
}

/**
 * Fetches streaming information for a specific movie.
 * @param {number} movieId - The ID of the movie.
 * @returns {Promise<Object>} A promise that resolves to the movie's streaming data.
 */
export async function getMovieStreaming(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/getMovieStreaming?movieId=${movieId}`
    );
    console.log(response, '<<<<log');
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movie streaming data: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching streaming data for movie ID ${movieId}:`,
      error
    );
    throw error;
  }
}
