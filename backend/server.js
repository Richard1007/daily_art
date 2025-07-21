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

app.get('/api/artworks', (req, res) => {
  res.json(loadArtworks());
});

app.get('/', (req, res) => {
  res.send('API ok. Try /api/artworks');
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Backend running: http://localhost:${PORT}`));
