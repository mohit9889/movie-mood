const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

/**
 * API handler to fetch movie genres.
 * @param {import('next').NextApiRequest} req - The request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed', status: 405 });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movie genres: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
