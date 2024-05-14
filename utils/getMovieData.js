import { convertMinutesToHoursAndMinutes } from "~/utils/time";

const get = (object, path, defaultValue) => {
  // Split the path into an array of keys
  const keys = typeof path === "string" ? path.split(".") : path;

  // Iterate through the keys to access nested properties
  for (let key of keys) {
    // If the object is null or undefined, return the default value
    if (!object || typeof object !== "object") return defaultValue;

    // Access the nested property
    object = object[key];
  }

  // If the final value is undefined, return the default value, otherwise return the value
  return object === undefined ? defaultValue : object;
};

export const getMovieData = (movie) => {
  const title = get(movie, "title", "");
  const video = get(movie, "video.key", "");
  const releaseDate = get(movie, "release_date", "");
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const runtime = get(movie, "runtime", "");
  const { hours, minutes } = runtime
    ? convertMinutesToHoursAndMinutes(runtime)
    : "";
  const rating = get(movie, "vote_average", "");
  const genres = get(movie, "genres", []);
  const overview = get(movie, "overview", "");

  return {
    title,
    video,
    releaseYear,
    movieRuntime: `${hours}H ${minutes}Mins`,
    rating,
    genres,
    overview,
  };
};
