const express = require("express");
const axios = require("axios");
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Add this line to check if the key is loaded
console.log("TMDB Key:", TMDB_API_KEY);

router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week`,
      { params: { api_key: TMDB_API_KEY } }
    );
    res.json(response.data.results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ...popular and search routes remain the same

module.exports = router;
