const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movies");

const app = express();
app.use(cors()); // <--- enables all origins
app.use(express.json());

app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
