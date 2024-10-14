import "./CemeteryRun.css";

const Controls = ({ gameStarted, gameOver, startGame, restartGame }) => {
  return (
    <>
      {!gameStarted && !gameOver && (
        <button onClick={startGame} className="cr-start-button">
          Start Game
        </button>
      )}
      {gameOver && (
        <div className="cr-game-over">
          <p className="cr-game-over-text">Game Over!</p>
          <button onClick={restartGame} className="cr-restart-button">
            Restart Game
          </button>
        </div>
      )}
    </>
  );
};

export default Controls;
