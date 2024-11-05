import React, { useState, useEffect, useRef, useCallback } from "react";
import "./CemeteryRun.css";
import Canvas from "./Canvas";
import Controls from "./Controls";
import GameInfo from "./GameInfo";
import AudioControl from "./AudioControl";
import InfoButton from "./InfoButton";
import gameMusic from "./Audio/background.wav";

const CemeteryRun = () => {
  // State management
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [hasEverStarted, setHasEverStarted] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Audio refs
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Initialize audio system
  const initializeAudio = useCallback(async () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();

      try {
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

        // Set initial gain to 0
        gainNodeRef.current.gain.setValueAtTime(
          0,
          audioContextRef.current.currentTime
        );
        sourceNodeRef.current.start();
      } catch (error) {
        console.error("Error initializing audio:", error);
      }
    }
  }, []);

  // Toggle music on/off
  const toggleMusic = useCallback(async () => {
    if (!audioContextRef.current && !isMusicOn) {
      await initializeAudio();
    }

    if (gainNodeRef.current && audioContextRef.current) {
      const newGain = isMusicOn ? 0 : 1;
      gainNodeRef.current.gain.setValueAtTime(
        newGain,
        audioContextRef.current.currentTime
      );
    }
    setIsMusicOn(!isMusicOn);
  }, [isMusicOn, initializeAudio]);

  // Start game function
  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(90);
    setHasEverStarted(true);

    // Only initialize audio if music is enabled
    if (isMusicOn && !audioContextRef.current) {
      initializeAudio();
    }
  }, [initializeAudio, isMusicOn]);

  // Restart game function
  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Turn off music on mobile devices
    if (isMobile) {
      setIsMusicOn(false);
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setValueAtTime(
          0,
          audioContextRef.current.currentTime
        );
      }
    }

    // Cleanup resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Cleanup audio on component unmount
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

  // Game state effect
  useEffect(() => {
    if (gameOver) {
      setGameStarted(false);
    }
  }, [gameOver]);

  // Render component
  return (
    <div className="cr-cemetery-run">
      <h1 className="cr-game-title">
        <span data-text="Cemetery Run" className="cr-texture-overlay">
          Cemetery Run
        </span>
      </h1>

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
