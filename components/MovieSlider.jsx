import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { useLoading } from "~/context/loadingContext";
import { getMoviesByGenre } from "~/api";

const MovieSlider = ({ genreId, movies }) => {
  const [moviesData, setMoviesData] = useState(movies);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsLoading } = useLoading();

  const nextSlide = async () => {
    if (currentIndex === moviesData.length - 1) {
      try {
        setIsLoading(true);
        const newMovies = await getMoviesByGenre(genreId, currentPage + 1);
        if (newMovies.results.length > 0) {
          setCurrentPage(currentPage + 1);
          setMoviesData((prevMovies) => [...prevMovies, ...newMovies.results]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching next page:", error);
        setIsLoading(false);
      }
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? moviesData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 39) {
        nextSlide(); // Right arrow key
      } else if (event.keyCode === 37) {
        prevSlide(); // Left arrow key
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <div className="card card-compact md:card-normal w-full md:w-[40rem] bg-secondary rounded-xl shadow-xl mx-auto pb-4">
      <MovieCard movie={moviesData[currentIndex]} />
      <div className="px-4 flex justify-between">
        <button
          className={`bg-green opacity-85 hover:opacity-100 text-white px-6 py-2 rounded-lg ${
            currentIndex === 0 ? "!bg-black-secondary !opacity-30" : ""
          }`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="bg-green opacity-85 hover:opacity-100 text-white px-6 py-2 rounded-lg"
          onClick={nextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
