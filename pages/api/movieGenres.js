const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}&language=en-US`
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching movie genres:", error);
      res.status(500).json({ error: "Internal Server Error", status: 404 });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed", status: 404 });
  }
}
