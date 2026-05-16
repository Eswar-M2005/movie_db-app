import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import MovieDetail from "../components/MovieDetail";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  const API_KEY = "6211f80ed4af3034f42f29f8ddf4ab42"; // Replace with TMDB API key

  const searchMovies = async (query) => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: { api_key: API_KEY, query },
      }
    );
    setMovies(response.data.results);
  };

  // Fetch trending and popular movies
  useEffect(() => {
    const fetchTrending = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week",
        { params: { api_key: API_KEY } }
      );
      setTrending(res.data.results);
    };

    const fetchPopular = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        { params: { api_key: API_KEY } }
      );
      setPopular(res.data.results);
    };

    fetchTrending();
    fetchPopular();
  }, []);

  return (
    <div className="app-container">
      {!selected ? (
        <>
          {/* ---------- Animated Title ---------- */}
          <h1 className="app-title">🎬 Movie Explorer</h1>
          <p className="app-subtitle">
            Discover movies, explore details, and find your next favorite film.
          </p>

          {/* ---------- Search Bar ---------- */}
          <SearchBar onSearch={searchMovies} />

          {/* ---------- Search Results ---------- */}
          {movies.length > 0 && (
            <MovieList movies={movies} onSelect={setSelected} title="Search Results" />
          )}

          {/* ---------- Trending Movies Row ---------- */}
          <MovieList movies={trending} onSelect={setSelected} title="🔥 Trending This Week" />

          {/* ---------- Popular Movies Row ---------- */}
          <MovieList movies={popular} onSelect={setSelected} title="⭐ Popular Movies" />
        </>
      ) : (
        <MovieDetail movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default Home;
