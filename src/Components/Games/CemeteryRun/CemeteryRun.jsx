import React, { useState } from "react";
import "./CemeteryRun.css";
import Canvas from "./Canvas";
import Controls from "./Controls";
import GameInfo from "./GameInfo";

const CemeteryRun = () => {
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(90);
  };

  const restartGame = () => {
    startGame();
  };

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
        />
        <Controls
          gameStarted={gameStarted}
          gameOver={gameOver}
          startGame={startGame}
          restartGame={restartGame}
        />
      </div>
      <GameInfo score={score} timeLeft={timeLeft} />
    </div>
  );
};

export default CemeteryRun;
