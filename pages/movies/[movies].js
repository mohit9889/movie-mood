import MovieSlider from "~/components/MovieSlider";
import { getMoviesByGenre } from "~/api/index";

const Movies = ({ movies = [] }) => {
  return (
    <div>
      {movies.length > 0 ? <MovieSlider movies={movies} /> : <p>No Data</p>}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const {
    query: { movies },
  } = ctx;
  const genreId = movies.split("-")[1];
  const response = await getMoviesByGenre(genreId);
  return { props: { movies: response.results } };
}

export default Movies;
