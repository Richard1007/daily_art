const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const DATA_PATH = path.join(__dirname, 'data', 'artworks.json');

function loadArtworks() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

// GET all artworks
app.get('/api/artworks', (req, res) => {
  const artworks = loadArtworks();
  res.json(artworks);
});

// (Later) we'll add /api/daily-artwork here.

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running: http://localhost:${PORT}`);
});
