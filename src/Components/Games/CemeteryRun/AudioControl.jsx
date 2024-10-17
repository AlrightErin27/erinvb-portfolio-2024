import React from "react";
import AudioIcon from "../../../Images/Games/CemeteryRun/sound.png";
import "./AudioControl.css";

const AudioControl = ({ isMusicOn, toggleMusic }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMusic();
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only toggle if Enter or Space is pressed
    if (e.key === "Enter") {
      toggleMusic();
    }
  };

  return (
    <button
      className="audio-control"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={isMusicOn ? "Mute music" : "Unmute music"}
    >
      <div className={`icon-wrapper ${isMusicOn ? "" : "music-off"}`}>
        <img src={AudioIcon} alt="" className="audio-icon" />
      </div>
    </button>
  );
};

export default AudioControl;
