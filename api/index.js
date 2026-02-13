import { fetchData } from './fetchWrapper';

/**
 * Fetches movie genres from the API.
 * @returns {Promise<Object>} A promise that resolves to the list of movie genres.
 */
export function getMovieGenres() {
  return fetchData('/api/getMovieGenres');
}

/**
 * Fetches movies by genre from the API.
 * @param {number} genreId - The ID of the genre.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<Object>} A promise that resolves to the list of movies.
 */
export function getMoviesByGenre(genreId, page) {
  return fetchData('/api/getMoviesByGenre', { genreId, page });
}

/**
 * Fetches streaming information for a specific movie.
 * @param {number} movieId - The ID of the movie.
 * @returns {Promise<Object>} A promise that resolves to the movie's streaming data.
 */
export function getMovieStreaming(movieId) {
  return fetchData('/api/getMovieStreaming', { movieId });
}

/**
 * Fetches details for a specific movie including videos and providers.
 * @param {number} movieId - The ID of the movie.
 * @returns {Promise<Object>} A promise that resolves to the movie's details.
 */
export function getMovieDetails(movieId) {
  return fetchData('/api/getMovieDetails', { movieId });
}
