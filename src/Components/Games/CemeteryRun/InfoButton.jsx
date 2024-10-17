import React, { useState, useRef, useEffect } from "react";
import "./InfoButton.css";

const InfoButton = () => {
  const [showInfo, setShowInfo] = useState(false);
  const modalRef = useRef(null);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="info-button-container">
      <button
        className="info-button"
        onClick={toggleInfo}
        aria-label="Game Information"
      >
        ?
      </button>
      {showInfo && (
        <div className="info-modal-overlay">
          <div className="info-modal" ref={modalRef}>
            <h2>About Cemetery Run</h2>
            <p>
              Cemetery Run is a spooky endless runner game where you control a
              ghost trying to escape the graveyard.
            </p>
            <p>
              Use the spacebar to jump over headstones and survive as long as
              you can!
            </p>
            <p>
              The longer you survive, the higher your score. Can you beat your
              high score?
            </p>
            <button onClick={toggleInfo}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
