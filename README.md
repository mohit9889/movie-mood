# Welcome to [Movie Mood](https://www.moviemood.fun/)!

## Overview

Movie Mood is a platform designed to help users discover movies based on their mood. Leveraging the power of The Movie Database (TMDb) API and Next.js, this website offers personalized movie recommendations tailored to how users feel.

## Features

- **Mood-Based Movie Selection:** Users can choose from a range of moods, such as happy, sad, adventurous, and more, to find movies that match their current emotional state.
- **Real-Time Recommendations:** This website uses TMDb API and Next.js to deliver instant movie suggestions, ensuring a seamless and efficient user experience.
- **Extensive Movie Database:** With access to TMDb's vast collection of movies, users can explore a diverse selection spanning every genre, era, and mood.
- **User-Friendly Interface:** This website is built with Next.js, providing lightning-fast performance and intuitive navigation for an enhanced user experience.

## Getting Started

To get started with Movie Mood, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mohit9889/movie-mood.git
   ```

2. Install dependencies:

   ```bash
   cd movie-mood
   npm install
   ```

3. Obtain API key from TMDb:

   Sign up for a TMDb account and obtain an API key [here](https://developer.themoviedb.org/docs/getting-started).

4. Configure environment variables:

   Create a .env file in the root directory of the project and add your TMDb Access Token and URL:

   ```plain text
    TMDB_ACCESS_TOKEN=your-access-token
    TMDB_API_URL=https://api.themoviedb.org/3
    BASE_URL=http://localhost:3000
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser to view the website.
