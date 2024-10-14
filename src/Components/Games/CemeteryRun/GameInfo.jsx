import "./CemeteryRun.css";

const GameInfo = ({ score, timeLeft }) => {
  return (
    <div className="cr-game-info">
      <p className="cr-score">Score: {score}</p>
      <p className="cr-time-left">Time Left: {timeLeft} seconds</p>
    </div>
  );
};

export default GameInfo;
