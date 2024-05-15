import React, { useState } from "react";
import Head from "next/head";
import YoutubeVideo from "~/components/Youtube";
import useIsMobile from "~/hooks/useIsMobile";
import { getMovieData } from "~/utils/getMovieData";
import { moviePage } from "~/constants/seoData";

const MovieCard = ({ movie = {} }) => {
  const isMobile = useIsMobile();
  const overviewLength = isMobile ? 150 : 220;
  const { title, video, releaseYear, movieRuntime, rating, genres, overview } =
    getMovieData(movie);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const output = genres.map((item) => item.name).join(", ");
  const newSeoKeywords = `${moviePage.keywords}, ${output}`;

  return (
    <>
      <Head>
        {/* Set the new keywords */}
        <meta name="keywords" content={newSeoKeywords} />
      </Head>

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
        <div className="flex gap-3 text-xs mb-4 overflow-auto">
          {genres.map((_g) => (
            <div
              key={_g.id}
              className="border-green border-[1px] px-2 py-1 rounded-full text-green"
            >
              {_g.name}
            </div>
          ))}
        </div>
        <div>
          <span className="text-base min-h-[96px] md:min-h-[72px] block">
            {expanded
              ? overview
              : `${overview.slice(0, overviewLength)}${
                  overview.length > overviewLength ? "..." : ""
                }`}
            {overview.length > overviewLength && (
              <span
                className="text-base text-green cursor-pointer ml-2 hover:underline"
                onClick={toggleExpand}
              >
                {expanded ? "Read Less" : "Read More"}
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
