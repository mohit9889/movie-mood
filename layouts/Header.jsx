import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { changeTheme } from "~/utils/themeChange";
import { useThemes } from "~/context/themesContext";
import { getFromSessionStorage } from "~/utils/sessionStorage";
import Link from "next/link";
import MovieSvg from "~/public/svgs/movie.svg";
import MoonSvg from "~/public/svgs/moon.svg";
import SunSvg from "~/public/svgs/sun.svg";

const Header = () => {
  const router = useRouter();
  const { changeThemeContext, themeMode } = useThemes();

  const [mood, setMood] = useState("Movie Mood");

  useEffect(() => {
    const mood =
      getFromSessionStorage("current_mood") && router.asPath !== "/"
        ? `${getFromSessionStorage("current_mood")} Mood`
        : "Movie Mood";
    setMood(mood);
  }, [router]);

  const renderThemeChanger = () => {
    return (
      <span
        onClick={() => {
          if (themeMode === "dark") {
            changeTheme("light");
            changeThemeContext("light");
          } else {
            changeTheme("dark");
            changeThemeContext("dark");
          }
        }}
        className={`${
          themeMode === "dark"
            ? "hover:bg-white-primary"
            : "hover:bg-black-primary"
        } hover:bg-opacity-35 p-1 rounded-xl transition-colors duration-300 ease-in-out flex items-center justify-center w-[48px] h-[48px] cursor-pointer`}
      >
        {themeMode === "dark" ? (
          <span className="icon-20">
            <SunSvg />
          </span>
        ) : (
          <span className="icon-20">
            <MoonSvg />
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="bg-secondary shadow-md rounded-2xl max-w-[40rem] mx-auto p-2 mb-4 md:mb-6 flex justify-between">
      <div className="w-1/4 flex justify-start ">
        <Link
          href="/"
          as="/"
          className={`${
            themeMode === "dark"
              ? "hover:bg-white-primary"
              : "hover:bg-black-primary"
          } hover:bg-opacity-35 p-1 rounded-xl transition-colors duration-300 ease-in-out`}
        >
          <span className="icon-38">
            <MovieSvg />
          </span>
        </Link>
      </div>
      <div className="flex w-1/2 justify-center items-center">
        <span className="text-xl font-semibold">{mood}</span>
      </div>
      <div className="flex w-1/4 justify-end">{renderThemeChanger()}</div>
    </div>
  );
};

export default Header;
