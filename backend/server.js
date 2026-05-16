const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movies");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Mount the movie routes at the root or base path
app.use("/", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});