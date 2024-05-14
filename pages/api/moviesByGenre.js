const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { genreId } = req.query;
    if (!genreId) {
      return res.status(400).json({ error: "Genre ID is required" });
    }
    try {
      // Fetch movies by genre
      const moviesResponse = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`
      );
      const moviesData = await moviesResponse.json();

      // Extract movie IDs
      const movieIds = moviesData.results.map((movie) => movie.id);

      // Fetch videos for each movie
      const moviesWithVideos = await Promise.all(
        movieIds.map(async (id) => {
          const videoResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${MOVIE_API_KEY}`
          );
          const videoData = await videoResponse.json();

          const movieDetailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_KEY}`
          );

          const movieDetailsData = await movieDetailsResponse.json();

          let video;
          if (videoData.results.length === 1) {
            video = videoData.results[0];
          } else {
            video =
              videoData.results.find((result) => result.type === "Trailer") ||
              videoData.results[0];
          }

          return {
            ...movieDetailsData,
            video,
          };
        })
      );

      res.status(200).json({ ...moviesData, results: moviesWithVideos });
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      res.status(500).json({ error: "Internal Server Error", status: 404 });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed", status: 404 });
  }
}
