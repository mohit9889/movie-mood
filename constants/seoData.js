const BASE_URL = process.env.BASE_URL;

export const homePage = {
  title:
    'FilmVibe - Discover Movies by Your Mood | Watch Trailers & Recommendations',
  description:
    'Stop scrolling and start watching! FilmVibe helps you find the perfect movie based on your current mood. Whether you feel like laughing, crying, or being thrilled, we have the best movie recommendations for you.',
  keywords:
    'movie mood picker, what movie to watch, find movies by mood, filmvibe, movie recommendations, best movies for happy mood, sad movie recommendations, thriller movies to watch, movie suggestion tool',
  ogImage: `${BASE_URL}/img/logo.png`,
  schemaData: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FilmVibe',
    url: BASE_URL,
    description:
      'FilmVibe helps you find the perfect movie based on your current mood.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FilmVibe',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/img/logo.png`,
      },
    },
  },
};

export const pageNotFound = {
  title: 'Oops! Page Not Found - Movie Mood',
  description:
    "Oops! It looks like the page you're looking for doesn't exist. Don't worry, explore our other movie categories and find the perfect film to match your mood at Movie Mood.",
  keywords:
    'Explore our movie categories, Find films based on your mood, Discover new favorites, Cinematic entertainment for every mood, Browse our extensive movie collection, Personalized movie recommendations, Your destination for movie magic, movies categorized by mood, cinematic entertainment, personalized movie recommendations, find films',
  ogImage: `${BASE_URL}/img/logo.png`,
  schemaData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '404 - Page Not Found',
    description:
      'Oops! The page you are looking for does not exist. Explore our other movie categories to find something interesting.',
    url: `${BASE_URL}/404`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Movie Mood',
      url: BASE_URL,
    },
    about: {
      '@type': 'Thing',
      name: 'Movies, Film Categories, Entertainment',
    },
  },
};

export const getMoviePageSeo = (genreName, moodName) => {
  const mood = moodName || genreName;
  const title = `Best ${mood} Movies to Watch Now | FilmVibe`;
  const description = `Looking for the best ${mood.toLowerCase()} movies? Discover our curated list of top-rated ${genreName.toLowerCase()} films that match your current mood. Watch trailers, check ratings, and find your next favorite movie on FilmVibe.`;
  const keywords = `best ${mood.toLowerCase()} movies, watch ${genreName.toLowerCase()} movies online, top rated ${mood.toLowerCase()} films, movies for ${mood.toLowerCase()} mood, ${genreName.toLowerCase()} movie recommendations, FilmVibe ${mood} movies`;

  return {
    title,
    description,
    keywords,
    ogImage: `${BASE_URL}/img/logo.png`,
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description: description,
      url: `${BASE_URL}/movies/${mood.toLowerCase().replace(/\s+/g, '-')}`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'FilmVibe',
        url: BASE_URL,
      },
    },
  };
};
