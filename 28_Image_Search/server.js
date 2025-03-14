require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/unsplash-api-key", (req, res) => {
    res.json({ apiKey: process.env.UNSPLASH_ACCESS_KEY });
});

app.listen(3000, () => console.log("Server running on port 3000"));