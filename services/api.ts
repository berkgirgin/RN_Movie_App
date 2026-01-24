/*
NOTES


write a useFetch helper

for index > fetchTrendingMovies
return data.results

*/

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export async function fetchMovies({
  query,
}: {
  query: string;
}): Promise<Movie[]> {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: TMDB_CONFIG.method,
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  console.log("sa from fetchMovies");
  const data = await response.json();
  return data.results;
}

export async function fetchMovieDetails(
  movieId: number,
): Promise<MovieDetails> {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

  const response = await fetch(endpoint, {
    method: TMDB_CONFIG.method,
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }

  console.log("sa from fetchMovieDetails");
  const data = await response.json();
  return data;
}
