// api/artworks.js

// Load your artwork data (adjust the path if your JSON lives elsewhere)
const artworks = require("../backend/data/artworks.json");

module.exports = (req, res) => {
  // Only allow GET requests
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Return the full array of artworks
  res.status(200).json(artworks);
};
