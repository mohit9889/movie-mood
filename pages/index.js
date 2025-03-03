import Link from 'next/link';
import SEO from '~/components/SEO';
import { homePage } from '~/constants/seoData';
import { movieMood } from '~/constants/movieMood';
import { getMovieGenres } from '~/api';
import { saveToSessionStorage } from '~/utils/sessionStorage';

const Home = ({ genres = [] }) => {
  return (
    <>
      <SEO {...homePage} />
      <div>
        <h1 className="mb-6 text-center text-4xl font-bold">
          Laugh, Cry, Scream: Movies for Every Mood at MoodFlicks
        </h1>
        <h2 className="mb-4 text-center text-lg">
          Select Your State of Mind, We'll Handle the Rest
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {genres.length > 0 ? (
            genres.map(({ id, name }) => {
              const moodName = movieMood[name] || name;
              const formattedMood = moodName.split(' ')[1] || moodName;
              const slug = `${formattedMood.replace(' ', '_').toLowerCase()}-${id}`;

              return (
                <Link
                  key={id}
                  href={`/movies/${slug}`}
                  title={name}
                  onClick={() => saveToSessionStorage('current_mood', moodName)}
                >
                  <div className="flex h-16 cursor-pointer items-center justify-center rounded-lg border-2 border-green px-6 text-lg transition-colors duration-300 ease-in-out hover:bg-green hover:text-white">
                    {moodName}
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-2 text-center md:col-span-4">
              No genres available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  try {
    const res = await getMovieGenres();

    if (!res?.genres || res.genres.length === 0) {
      throw new Error('Invalid response from API');
    }

    return {
      props: { genres: res.genres },
      revalidate: 86400, // Re-generate the page every 24 hours (1 day)
    };
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return {
      props: { genres: [] },
      revalidate: 86400,
    };
  }
}

export default Home;
