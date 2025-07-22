import React, { useState, useEffect } from "react";
import "./App.css";
import { getFormattedDate } from "./utils/formatDate";

function App() {
  // 1) Start as `null` so you can tell “loading” vs “empty”
  const [artworks, setArtworks] = useState(null);
  const [index,    setIndex]    = useState(0);
  const [hovered,  setHovered]  = useState(false);
  const todayString = getFormattedDate();

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/artworks");
        const data = await res.json();
        setArtworks(data);  // data is an array
        setIndex(0);        // show the first one
      } catch (err) {
        console.error(err);
        setArtworks([]);    // mark as empty on error
      }
    })();
  }, []);

  // 2) Loading state
  if (artworks === null) {
    return <div>Loading…</div>;
  }

  // 3) Empty array
  if (artworks.length === 0) {
    return <div>No artworks found</div>;
  }

  // 4) Out-of-bounds guard (shouldn’t happen if you always reset to 0)
  if (index < 0 || index >= artworks.length) {
    return <div>Invalid artwork index</div>;
  }

  const artwork = artworks[index];

  useEffect(() => {
    document.body.style.background = artwork.bgColor;
    return () => { document.body.style.background = ""; };
  }, [artwork]);

  return (
    <div className="app-container">
      <div className="artwork-wrapper">
        <div className="artwork-id-date">
          <span className="artwork-id-pill">{artwork.id}</span>
          {todayString}
        </div>

        <div
          className="artwork-image-wrapper"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="artwork-image"
          />
          {hovered && (
            <div className="artwork-overlay">
              <div className="artwork-description">
                <p>{artwork.description}</p>
              </div>
            </div>
          )}
        </div>

        <div className="artwork-caption">{artwork.title}</div>
      </div>
    </div>
  );
}

export default App;
