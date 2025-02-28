import MovieSlider from '~/components/MovieSlider';
import { getMoviesByGenre } from '~/api';
import Link from 'next/link';
import LeftArrowSvg from '~/public/svgs/left-arrow.svg';

const Movies = ({ genreId, movies = [] }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full md:w-[40rem]">
        <Link
          href="/"
          className="flex w-max items-center rounded-lg bg-green px-3 py-2 text-sm font-medium text-white opacity-85 hover:opacity-100"
        >
          <span className="icon-12 icon-white mr-1">
            <LeftArrowSvg />
          </span>
          Change Mood
        </Link>
      </div>

      {movies.length > 0 ? (
        <MovieSlider genreId={genreId} movies={movies} />
      ) : (
        <p className="text-gray-500">No movies available.</p>
      )}
    </div>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const genreId = query.movies?.split('-').pop();
    if (!genreId) throw new Error('Invalid genre ID');

    const response = await getMoviesByGenre(genreId, 1);
    if (!response || !response.results) {
      throw new Error('Invalid API response');
    }

    return { props: { genreId, movies: response.results } };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
}

export default Movies;
