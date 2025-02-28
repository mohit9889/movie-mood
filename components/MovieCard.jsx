import React, { useState, useEffect, useCallback } from 'react';
import StreamModal from './StreamModal';
import YoutubeVideo from './Youtube';
import Modal from './Modal';
import SEO from './SEO';
import useModal from '~/hooks/useModal';
import useIsMobile from '~/hooks/useIsMobile';
import { getMovieData } from '~/utils/getMovieData';
import { moviePage } from '~/constants/seoData';
import { getMovieStreaming } from '~/api';

const MovieCard = ({ movie = {} }) => {
  // Detect mobile view
  const isMobile = useIsMobile();
  const overviewLength = isMobile ? 150 : 220;

  // Extract necessary movie details using helper function
  const {
    movieId,
    title,
    video,
    releaseYear,
    movieRuntime,
    rating,
    genres = [],
    overview = '',
  } = getMovieData(movie);

  // Local state for expanded overview and streaming data
  const [expanded, setExpanded] = useState(false);
  const [streamingData, setStreamingData] = useState({});

  // Custom hook to handle modal state
  const { isOpen, openModal, closeModal } = useModal();

  // Memoized function to toggle expanded overview
  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  // Construct SEO-friendly keywords dynamically
  const genreNames = genres.map((item) => item.name).join(', ');
  const newSeoKeywords = `${moviePage.keywords}, ${genreNames}`;

  // Fetch streaming data when movieId changes
  useEffect(() => {
    if (!movieId) return;

    const fetchStream = async () => {
      try {
        const streamRes = await getMovieStreaming(movieId);
        const countryCode = streamRes?.country?.code;
        const availableStreams =
          streamRes?.streaming?.results?.[countryCode] || {};
        setStreamingData(availableStreams);
      } catch (error) {
        console.error('Error fetching streaming data:', error);
      }
    };

    fetchStream();
  }, [movieId]);

  // Generate Schema Data
  const movieSchema = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: title,
    description: overview,
    datePublished: releaseYear,
    duration: movieRuntime ? `PT${movieRuntime}M` : undefined,
    aggregateRating: rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: rating,
          bestRating: '10',
          worstRating: '0',
          ratingCount: '1000',
        }
      : undefined,
    genre: genres.map((genre) => genre.name),
    trailer: video
      ? {
          '@type': 'VideoObject',
          name: `${title} Official Trailer`,
          embedUrl: `https://www.youtube.com/embed/${video}`,
          thumbnailUrl: `https://img.youtube.com/vi/${video}/hqdefault.jpg`,
        }
      : undefined,
    offers: {
      '@type': 'Offer',
      url: `${process.env.BASE_URL}/movies/${movieId}`,
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'MoodFlicks',
      },
    },
  };

  return (
    <>
      {/* SEO Metadata */}
      <SEO
        {...{ ...moviePage, keywords: newSeoKeywords, schemaData: movieSchema }}
      />

      {/* Movie Trailer */}
      <div className="w-full">
        <YoutubeVideo ytdId={video} />
      </div>

      {/* Movie Details */}
      <div className="flex flex-col p-4">
        <h1 className="mb-3 text-xl font-bold">{title}</h1>

        {/* Movie Info: Year, Duration, Rating */}
        <div className="mb-2 flex flex-wrap text-sm">
          <span>{releaseYear}</span>
          {movieRuntime && <span className="mx-2">|</span>}
          {movieRuntime && <span>{movieRuntime}</span>}
          <span className="mx-2">|</span>
          <span>{rating}/10</span>

          {/* Streaming Availability */}
          {Object.keys(streamingData).length > 0 && (
            <>
              <span className="mx-2">|</span>
              <span
                onClick={openModal}
                className="flex cursor-pointer items-center justify-center rounded-full border border-green px-2 text-xs text-green hover:bg-green hover:text-white"
              >
                See Streaming
              </span>
            </>
          )}
        </div>

        {/* Genre List */}
        <div className="mb-4 flex gap-3 overflow-auto text-xs">
          {genres.map((_g) => (
            <div
              key={_g.id}
              className="whitespace-nowrap rounded-full border border-green px-2 py-1 text-green"
            >
              {_g.name}
            </div>
          ))}
        </div>

        {/* Movie Overview with Expand/Collapse */}
        <div>
          <span className="block min-h-[96px] text-base md:min-h-[72px]">
            {expanded
              ? overview
              : `${overview.slice(0, overviewLength)}${overview.length > overviewLength ? '...' : ''}`}
            {overview.length > overviewLength && (
              <span
                className="ml-2 cursor-pointer text-base text-green hover:underline"
                onClick={toggleExpand}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Streaming Modal */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <StreamModal streamingData={streamingData} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default MovieCard;
