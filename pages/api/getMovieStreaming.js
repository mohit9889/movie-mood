const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { movieId } = req.query;
    if (!movieId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${MOVIE_API_KEY}`
      );
      const data = await response.json();

      // default country
      const country = {
        country: "India",
        code: "IN",
      };

      const countryResponse = await fetch("https://ipapi.co/json/");
      const countryData = await countryResponse.json();
      if (countryData) {
        country.country = countryData.country_name;
        country.code = countryData.country_code;
      }

      const streaming = data.results[country.code]
        ? data.results[country.code]
        : {};

      res.status(200).json(streaming);
    } catch (error) {
      console.error("Error fetching movie genres:", error);
      res.status(500).json({ error: "Internal Server Error", status: 404 });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed", status: 404 });
  }
}
