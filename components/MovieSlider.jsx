import { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import { useLoading } from '~/context/loadingContext';
import { getMoviesByGenre } from '~/api';

const MovieSlider = ({ genreId, movies }) => {
  const [moviesData, setMoviesData] = useState(movies);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsLoading } = useLoading();

  /**
   * Handles fetching and updating the movie list when reaching the last slide.
   */
  const nextSlide = useCallback(async () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === moviesData.length - 1) {
        // Fetch next page if at the last slide
        setIsLoading(true);
        getMoviesByGenre(genreId, currentPage + 1)
          .then((newMovies) => {
            if (newMovies.results.length > 0) {
              setCurrentPage((prevPage) => prevPage + 1);
              setMoviesData((prevMovies) => [
                ...prevMovies,
                ...newMovies.results,
              ]);
            }
          })
          .catch((error) => console.error('Error fetching next page:', error))
          .finally(() => setIsLoading(false));
      }
      return prevIndex + 1;
    });
  }, [moviesData.length, genreId, currentPage, setIsLoading]);

  /**
   * Handles moving to the previous movie slide.
   */
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? moviesData.length - 1 : prevIndex - 1
    );
  }, [moviesData.length]);

  /**
   * Adds keyboard navigation for left (prev) and right (next) arrow keys.
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="card card-compact md:card-normal mx-auto w-full rounded-xl bg-secondary pb-4 shadow-xl md:w-[40rem]">
      <MovieCard movie={moviesData[currentIndex]} />
      <div className="flex justify-between px-4">
        <button
          className={`rounded-lg bg-green px-6 py-2 text-white opacity-85 hover:opacity-100 ${
            currentIndex === 0
              ? 'cursor-not-allowed !bg-black-secondary !opacity-30'
              : ''
          }`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="rounded-lg bg-green px-6 py-2 text-white opacity-85 hover:opacity-100"
          onClick={nextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
