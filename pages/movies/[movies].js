import MovieSlider from "~/components/MovieSlider";
import { getMoviesByGenre } from "~/api/index";

const Movies = ({ genreId, movies = [] }) => {
  return (
    <div>
      {movies.length > 0 ? (
        <MovieSlider genreId={genreId} movies={movies} />
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const {
    query: { movies },
  } = ctx;
  const genreId = movies.split("-")[1];
  const response = await getMoviesByGenre(genreId, 1);

  if (response.status === 404) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return { props: { genreId, movies: response.results } };
}

export default Movies;
