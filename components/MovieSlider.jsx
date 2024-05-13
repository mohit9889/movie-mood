import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { useSwipeable } from "react-swipeable";

const MovieSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
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

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers}>
      <div className="card card-compact md:card-normal w-full md:w-[40rem] bg-secondary rounded-xl shadow-xl mx-auto">
        <MovieCard movie={movies[currentIndex]} />
        <div className="px-4 pb-4 flex justify-between">
          <button
            className="bg-green text-white px-6 py-2 rounded-lg"
            onClick={prevSlide}
          >
            Prev
          </button>
          <button
            className="bg-green text-white px-6 py-2 rounded-lg"
            onClick={nextSlide}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;
