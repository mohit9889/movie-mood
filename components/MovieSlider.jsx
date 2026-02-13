import { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import { getMoviesByGenre } from '~/services';

const MovieSlider = ({ genreId, movies }) => {
  const [moviesData, setMoviesData] = useState(movies);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Fetches the next page of movies if approaching the last few slides.
   */
  const fetchNextPage = useCallback(async () => {
    try {
      // The API returns { success: true, movies: [...], total_pages: ... }
      // So we need to access .movies, not .results
      const data = await getMoviesByGenre(genreId, currentPage + 1);
      const newMovies = data.movies || data.results || [];

      if (newMovies.length > 0) {
        setMoviesData((prevMovies) => [...prevMovies, ...newMovies]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    }
  }, [genreId, currentPage]);

  /**
   * Moves to the next slide and prefetches more movies if close to the end.
   */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      // Fetch next page when within 5 slides of the end
      if (nextIndex >= moviesData.length - 5) {
        fetchNextPage();
      }

      return nextIndex;
    });
  }, [moviesData.length, fetchNextPage]);

  /**
   * Moves to the previous slide.
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
      <MovieCard
        key={moviesData[currentIndex]?.id}
        movie={moviesData[currentIndex]}
      />
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
