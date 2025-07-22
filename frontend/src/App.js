import React, { useState, useEffect } from "react";
import "./App.css";
import { getFormattedDate } from "./utils/formatDate";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [index, setIndex] = useState(1);      // <- change this manually to see different images
  const [hovered, setHovered] = useState(false);
  const todayString = getFormattedDate();

  useEffect(() => {
    (async () => {
        const res = await fetch("/api/artworks");
        const data = await res.json();
        setArtworks(data);
        setIndex(0); // start at first one
    })();
  }, []);

  const artwork = artworks[index];

  useEffect(() => {
    if (artwork) document.body.style.background = artwork.bgColor;
    return () => { document.body.style.background = ""; };
  }, [artwork]);

  if (!artwork) return <div>Loading...</div>;

  return (
    <div className="app-container">
        <div className="artwork-wrapper">
        <div className="artwork-id-date">
            <span className="artwork-id-pill">{artwork.id}</span>
            {/* <span className="id-separator" aria-hidden="true">!</span> */}
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
