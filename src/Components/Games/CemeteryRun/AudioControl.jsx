import React, { useState, useEffect } from "react";
import AudioIcon from "../../../Images/Games/CemeteryRun/sound.png";
import gameMusic from "./Audio/background.wav";
import "./AudioControl.css"; // We'll create this CSS file next

const AudioControl = () => {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [audio] = useState(new Audio(gameMusic));

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isMusicOn) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsMusicOn(!isMusicOn);
  };

  return (
    <button className="audio-control" onClick={toggleMusic}>
      <div className={`icon-wrapper ${isMusicOn ? "" : "music-off"}`}>
        <img src={AudioIcon} alt="Audio control" className="audio-icon" />
      </div>
    </button>
  );
};

export default AudioControl;
