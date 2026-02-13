import MovieSlider from '~/components/MovieSlider';
import { fetchMoviesByGenre } from '~/utils/tmdb';
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

export async function getStaticProps({ params }) {
  try {
    const genreId = params.movies?.split('-').pop();
    if (!genreId) throw new Error('Invalid genre ID');

    const response = await fetchMoviesByGenre(genreId, 1);
    if (!response || !response.results) {
      throw new Error('Invalid API response');
    }

    return {
      props: { genreId, movies: response.results },
      revalidate: 86400, // Regenerate page every 24 hours
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  return {
    paths: [], // No pre-generated paths, Next.js will generate them dynamically
    fallback: 'blocking', // Generate page on-demand if not already built
  };
}

export default Movies;
