const YoutubeVideo = ({ ytdId }) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${ytdId}`}
      frameBorder="0"
      allowFullScreen
      className="w-full h-64 md:h-[350px] rounded-tl-xl rounded-tr-xl"
    />
  );
};

export default YoutubeVideo;
