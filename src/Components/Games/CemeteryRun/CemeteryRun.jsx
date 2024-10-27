import React, { useState, useEffect, useRef, useCallback } from "react";
import "./CemeteryRun.css";
import Canvas from "./Canvas";
import Controls from "./Controls";
import GameInfo from "./GameInfo";
import AudioControl from "./AudioControl";
import InfoButton from "./InfoButton";
import gameMusic from "./Audio/background.wav";

const CemeteryRun = () => {
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [hasEverStarted, setHasEverStarted] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  const initializeAudio = useCallback(async () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();

      const response = await fetch(gameMusic);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      );

      sourceNodeRef.current = audioContextRef.current.createBufferSource();
      sourceNodeRef.current.buffer = audioBuffer;
      sourceNodeRef.current.loop = true;

      gainNodeRef.current = audioContextRef.current.createGain();
      sourceNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      sourceNodeRef.current.start();
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioContextRef.current) {
      initializeAudio();
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMusicOn ? 0 : 1,
        audioContextRef.current.currentTime
      );
    }
    setIsMusicOn(!isMusicOn);
  }, [isMusicOn, initializeAudio]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(90);
    setHasEverStarted(true);
    if (!audioContextRef.current) {
      initializeAudio();
    }
  }, [initializeAudio]);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="cr-cemetery-run">
      <h1 className="cr-game-title">Cemetery Run</h1>
      <div className="cr-game-container">
        <Canvas
          gameStarted={gameStarted}
          gameOver={gameOver}
          setGameOver={setGameOver}
          setScore={setScore}
          setTimeLeft={setTimeLeft}
          restartGame={restartGame}
        />
      </div>
      <div className="cr-bottom-container">
        {!hasEverStarted && (
          <Controls
            gameStarted={gameStarted}
            gameOver={gameOver}
            startGame={startGame}
          />
        )}
        {hasEverStarted && (
          <div className="cr-info-audio-container">
            <GameInfo score={score} timeLeft={timeLeft} />
          </div>
        )}
        <div className="cr-controls-container">
          {!isMobile && (
            <AudioControl isMusicOn={isMusicOn} toggleMusic={toggleMusic} />
          )}
          <InfoButton />
        </div>
      </div>
    </div>
  );
};

export default CemeteryRun;
