const BASE_URL = process.env.BASE_URL;

// Function to fetch movie genres
export async function getMovieGenres() {
  try {
    const response = await fetch(`${BASE_URL}/api/movieGenres`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error fetching movie genres:", err);
  }
}

// Function to fetch movies by genre
export async function getMoviesByGenre(genreId, page) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/moviesByGenre?genreId=${genreId}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching movie data:", error);
  }
}
