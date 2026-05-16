import React from "react";

const MovieDetail = ({ movie, onClose }) => {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-detail-container">
      <button onClick={onClose}>Back</button>
      <h1>{movie.title}</h1>
      <img src={imageUrl} alt={movie.title} />
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
    </div>
  );
};

export default MovieDetail;
