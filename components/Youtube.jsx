const YoutubeVideo = ({ ytdId }) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${ytdId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
      className="aspect-video h-56 w-full rounded-t-xl md:h-[320px] lg:h-[400px]"
    />
  );
};

export default YoutubeVideo;
