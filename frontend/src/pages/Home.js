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
  
  const [searchError, setSearchError] = useState("");
  const [trendingError, setTrendingError] = useState("");
  const [popularError, setPopularError] = useState("");

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const searchMovies = async (query) => {
    try {
      setSearchError("");
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { query },
      });
      setMovies(response.data.results);
    } catch (err) {
      console.error("Error searching movies:", err);
      setSearchError("Failed to search movies. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setTrendingError("");
        const res = await axios.get(`${BASE_URL}/trending/movie/week`);
        setTrending(res.data.results);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
        setTrendingError("Failed to load trending movies.");
      }
    };

    const fetchPopular = async () => {
      try {
        setPopularError("");
        const res = await axios.get(`${BASE_URL}/movie/popular`);
        setPopular(res.data.results);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
        setPopularError("Failed to load popular movies.");
      }
    };

    fetchTrending();
    fetchPopular();
  }, [BASE_URL]);

  return (
    <div className="app-container">
      {!selected ? (
        <>
          <h1 className="app-title">🎬 Movie Explorer</h1>

          <p className="app-subtitle">
            Discover movies, explore details, and find your next favorite film.
          </p>

          <SearchBar onSearch={searchMovies} />

          {searchError && <div className="error-message" style={{color: 'red', textAlign: 'center', margin: '10px 0'}}>{searchError}</div>}

          {movies.length > 0 && (
            <MovieList
              movies={movies}
              onSelect={setSelected}
              title="Search Results"
            />
          )}

          {trendingError && <div className="error-message" style={{color: 'red', textAlign: 'center', margin: '10px 0'}}>{trendingError}</div>}
          <MovieList
            movies={trending}
            onSelect={setSelected}
            title="🔥 Trending This Week"
          />

          {popularError && <div className="error-message" style={{color: 'red', textAlign: 'center', margin: '10px 0'}}>{popularError}</div>}
          <MovieList
            movies={popular}
            onSelect={setSelected}
            title="⭐ Popular Movies"
          />
        </>
      ) : (
        <MovieDetail
          movie={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default Home;