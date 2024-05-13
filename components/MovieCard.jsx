import React from "react";
import { getMovieData } from "~/utils/getMovieData";
import YoutubeVideo from "~/components/Youtube";

const MovieCard = ({ movie = {} }) => {
  const { title, video, releaseYear, movieRuntime, rating, genres, overview } =
    getMovieData(movie);

  return (
    <>
      <div className="w-full">
        <YoutubeVideo ytdId={video} />
      </div>
      <div className="flex flex-col p-4">
        <h1 className=" text-xl font-bold mb-3">{title}</h1>
        <div className="flex text-sm mb-2">
          <span>{releaseYear}</span>
          <span className="mx-2">|</span>
          <span>{movieRuntime}</span>
          <span className="mx-2">|</span>
          <span>{rating}/10</span>
        </div>
        <div className="flex gap-3 text-xs mb-4">
          {genres.map((_g) => (
            <div
              key={_g.id}
              className="border-green border-[1px] px-2 py-1 rounded-full"
            >
              {_g.name}
            </div>
          ))}
        </div>
        <p className=" text-base">{overview}</p>
      </div>
    </>
  );
};

export default MovieCard;
