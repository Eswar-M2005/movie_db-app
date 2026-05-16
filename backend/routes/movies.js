const express = require("express");
const axios = require("axios");
const https = require("https");
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Disable keep-alive to bypass WAF connection reset bugs in Node
const agent = new https.Agent({ keepAlive: false, family: 4 });

const axiosConfig = {
  httpsAgent: agent,
  headers: {
    "User-Agent": "curl/8.7.1",
    "Accept": "application/json"
  }
};

// Search Movies
router.get("/search/movie", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      ...axiosConfig,
      params: {
        api_key: TMDB_API_KEY,
        query: req.query.query,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error searching movies:", error.message);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// Trending Movies
router.get("/trending/movie/week", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      ...axiosConfig,
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// Popular Movies
router.get("/movie/popular", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      ...axiosConfig,
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

module.exports = router;
