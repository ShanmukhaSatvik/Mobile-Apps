export const TMDB_CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};
export const fetchMovies = async ({ query }) => {
  const endpoint = `${
    TMDB_CONFIG.baseUrl
  }/search/movie?query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();
  return data.results;
};
export const fetchMovieDetails = async ({ id }) => {
  try {
    const detailsEndpoint = `${TMDB_CONFIG.baseUrl}/movie/${id}`;
    const creditsEndpoint = `${TMDB_CONFIG.baseUrl}/movie/${id}/credits`;
    const [detailsResponse, creditsResponse] = await Promise.all([
      fetch(detailsEndpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }),
      fetch(creditsEndpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }),
    ]);
    if (!detailsResponse.ok || !creditsResponse.ok) {
      throw new Error("Failed to fetch movie details or cast");
    }
    const movieDetails = await detailsResponse.json();
    const creditsData = await creditsResponse.json();
    const data = {
      ...movieDetails,
      cast: creditsData.cast,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fetchTrendingMovies = async () => {
  try {
    const endpoint = `${TMDB_CONFIG.baseUrl}/trending/movie/day`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch trending movies: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fetchUpcomingMovies = async () => {
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const endpoint = `${TMDB_CONFIG.baseUrl}/discover/movie?with_original_language=te&with_release_type=2|3&primary_release_date.gte=${formattedDate}&sort_by=primary_release_date.asc&region=IN&page=1`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch upcoming movies: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fetchMoviesByGenre = async ({ id }) => {
  try {
    const endpoint = `${TMDB_CONFIG.baseUrl}/discover/movie?with_genres=${id}`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies by genre: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fetchTopRatedMovies = async () => {
  try {
    const endpoint = `${TMDB_CONFIG.baseUrl}/discover/movie?sort_by=vote_average.desc&vote_count.gte=100`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch top rated movies : ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fetchPersonProfile = async ({ id }) => {
  try {
    const detailsEndpoint = `${TMDB_CONFIG.baseUrl}/person/${id}`;
    const creditsEndpoint = `${TMDB_CONFIG.baseUrl}/person/${id}/combined_credits`;
    const [detailsResponse, creditsResponse] = await Promise.all([
      fetch(detailsEndpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }),
      fetch(creditsEndpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }),
    ]);
    if (!detailsResponse.ok || !creditsResponse.ok) {
      throw new Error("Failed to fetch person details or credits");
    }
    const personDetails = await detailsResponse.json();
    const creditsData = await creditsResponse.json();
    const movieCredits = (creditsData.cast || [])
      .filter((item) => item.media_type === "movie")
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 10);
    const data = {
      ...personDetails,
      movieCredits,
    };
    return data;
  } catch (error) {
    console.error("Error fetching person profile:", error);
    throw error;
  }
};
export const fetchSimilarMovies = async ({ id }) => {
  try {
    const endpoint = `${TMDB_CONFIG.baseUrl}/movie/${id}/similar`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch similar movies: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};
