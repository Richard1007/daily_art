// api/artworks.js

// Load the JSON data
const artworks = require("../backend/data/artworks.json");

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res
      .status(405)
      .json({ error: "Method Not Allowed" });
  }

  // Return the full array of artworks
  res.status(200).json(artworks);
}
