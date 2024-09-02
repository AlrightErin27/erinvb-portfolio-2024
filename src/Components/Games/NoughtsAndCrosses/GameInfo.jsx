import React from "react";
import "./NoughtsAndCrosses.css";

export default function GameInfo({ roundsPlayed, xWins, oWins }) {
  return (
    <div className="game-info">
      <p>
        Rounds Played: {roundsPlayed} | X Wins: {xWins} | O Wins: {oWins}
      </p>
    </div>
  );
}
