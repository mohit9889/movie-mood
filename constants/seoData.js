const BASE_URL = process.env.BASE_URL;

export const homePage = {
  title: 'Watch Movies Online - Find Films Based on Your Mood | Movie Mood',
  description:
    'Discover a vast collection of movies online and find the perfect film to match your mood. From exciting action movies to heartwarming family favorites, explore our curated selection today.',
  keywords:
    'Discover movies based on your mood, Watch films online, Find exciting action movies, Explore heartwarming family favorites, Browse thrillers, comedies, dramas, and more, Your one-stop destination for cinematic entertainment, Personalized movie recommendations, Dive into a world of movie magic, movies online,watch films, movie genres, cinematic entertainment',
  ogImage: `${BASE_URL}/img/logo.png`,
  schemaData: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Movie Mood',
    url: BASE_URL,
    description:
      'Discover movies based on your mood. Watch films online and find exciting action movies, heartwarming family favorites, thrillers, comedies, and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Movie Mood',
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

export const moviePage = {
  title:
    'Discover Movies by Mood - Find Films to Match Your Emotions | Movie Mood',
  description:
    "Explore a wide range of movies categorized by mood on [Your Website Name]. Find the perfect film to match your emotions, whether you're in the mood for excitement, romance, suspense, or laughter.",
  keywords:
    'Discover movies by mood, Find films to match your emotions, Explore movies based on your mood, Exciting action-packed adventures, Heartwarming romance movies, Suspenseful thriller films, Browse comedy movies for laughter, Select movies by mood, Movies for every emotion, movies by mood, films to match emotions, exciting adventures,romantic movies,suspenseful thrillers,comedy films',
  ogImage: `${BASE_URL}/img/logo.png`,
};
