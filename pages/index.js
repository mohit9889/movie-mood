import Link from "next/link";
import { movieMood } from "~/constants/movieMood";
import { getMovieGenres } from "~/api";

const Home = ({ genres }) => {
  return (
    <div>
      <h1 className="text-center font-bold text-4xl mb-6">
        Laugh, Cry, Scream: Movies for Every Mood at MoodFlicks
      </h1>
      <h2 className="mb-4 text-center text-lg">
        Select Your State of Mind, We'll Handle the Rest
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {genres && genres.length
          ? genres.map((_g) => (
              <Link
                key={_g.id}
                href="/movies/[movies]"
                as={`/movies/${(movieMood[_g.name]
                  ? movieMood[_g.name].split(" ")[1]
                  : _g.name
                )
                  .replace(" ", "_")
                  .toLowerCase()}-${_g.id}`}
                title={_g.name}
              >
                <div className="h-[4rem] px-[1.5rem] text-lg border-green border-2 flex items-center justify-center rounded-lg hover:text-white hover:bg-green cursor-pointer transition-colors duration-300 ease-in-out">
                  {movieMood[_g.name] ? movieMood[_g.name] : _g.name}
                </div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getMovieGenres();
  if (res.status === 404) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return { props: { genres: res.genres } };
}

export default Home;
