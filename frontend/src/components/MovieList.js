import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onSelect, title }) => {
  return (
    <div className="movie-row">
      {title && <h2 className="row-title">{title}</h2>}
      <div className="movie-row-container">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
