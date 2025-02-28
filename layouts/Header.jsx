import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { changeTheme } from '~/utils/themeChange';
import { useThemes } from '~/context/themesContext';
import { getFromSessionStorage } from '~/utils/sessionStorage';
import Link from 'next/link';
import MovieSvg from '~/public/svgs/movie.svg';
import MoonSvg from '~/public/svgs/moon.svg';
import SunSvg from '~/public/svgs/sun.svg';

const Header = () => {
  const router = useRouter();
  const { changeThemeContext, themeMode } = useThemes();
  const [mood, setMood] = useState('Movie Mood');

  useEffect(() => {
    const storedMood = getFromSessionStorage('current_mood');
    setMood(
      router.asPath !== '/' && storedMood ? `${storedMood} Mood` : 'Movie Mood'
    );
  }, [router.asPath]);

  const toggleTheme = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    changeTheme(newTheme);
    changeThemeContext(newTheme);
  };

  return (
    <header className="mx-auto mb-4 flex max-w-[40rem] items-center justify-between rounded-2xl bg-secondary p-2 shadow-md md:mb-6">
      {/* Home Link */}
      <Link
        href="/"
        className={`${themeMode === 'dark' ? 'hover:bg-white-primary' : 'hover:bg-black-primary'} rounded-xl p-1 transition duration-300 ease-in-out hover:bg-black-primary hover:bg-opacity-35`}
        aria-label="Home"
      >
        <span className="icon-38">
          <MovieSvg />
        </span>
      </Link>

      {/* Mood Title */}
      <h1 className="text-center text-xl font-semibold">{mood}</h1>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`${themeMode === 'dark' ? 'hover:bg-white-primary' : 'hover:bg-black-primary'} flex size-[48px] items-center justify-center rounded-xl p-1 transition duration-300 ease-in-out hover:bg-opacity-35`}
        aria-label="Toggle Theme"
      >
        <span className="icon-20">
          {themeMode === 'dark' ? <SunSvg /> : <MoonSvg />}
        </span>
      </button>
    </header>
  );
};

export default Header;
