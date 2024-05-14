import MovieSlider from "~/components/MovieSlider";
import { getMoviesByGenre } from "~/api/index";
import Link from "next/link";
import SEO from "~/components/SEO";
import { moviePage } from "~/constants/seoData";
import LeftArrowSvg from "~/public/svgs/left-arrow.svg";

const Movies = ({ genreId, movies = [] }) => {
  return (
    <>
      <SEO {...{ ...moviePage }} />

      <div className="flex flex-col">
        <div className="w-full md:w-[40rem] mx-auto mb-4">
          <Link
            className="bg-green py-2 px-3 text-sm font-medium text-white rounded-lg flex w-max items-center opacity-85 hover:opacity-100"
            href="/"
            as="/"
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
          <p>No Data</p>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const {
    query: { movies },
  } = ctx;
  const splitUrl = movies.split("-");
  const genreId = splitUrl[splitUrl.length - 1];
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
