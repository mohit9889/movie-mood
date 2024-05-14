import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
// import { useSwipeable } from "react-swipeable";
// import useIsMobile from "~/hooks/useIsMobile";

const MovieSlider = ({ movies }) => {
  // const isMobile = useIsMobile();
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

  // const handlers = useSwipeable({
  //   onSwipedLeft: nextSlide,
  //   onSwipedRight: prevSlide,
  //   preventDefaultTouchmoveEvent: true,
  //   trackMouse: true,
  // });

  return (
    <div className="card card-compact md:card-normal w-full md:w-[40rem] bg-secondary rounded-xl shadow-xl mx-auto pb-4">
      <MovieCard movie={movies[currentIndex]} />
      {/* {isMobile ? (
        <div
          className="relative mx-4 rounded-full h-[50px] bg-green flex items-center justify-center text-white text-lg font-semibold"
          {...handlers}
        >
          Swipe Here
        </div>
      ) : ( */}
      <div className="px-4 flex justify-between">
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
      {/* )} */}
    </div>
  );
};

export default MovieSlider;
