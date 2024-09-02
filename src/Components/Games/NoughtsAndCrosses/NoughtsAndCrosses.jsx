import "./NoughtsAndCrosses.css";
import { useState, useEffect } from "react";
import Cell from "./Cell";
import GameInfo from "./GameInfo";

export default function NoughtsAndCrosses() {
  const [player, setPlayer] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [foundWin, setFoundWin] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [catsGame, setCatsGame] = useState(false);

  const startGame = () => {
    setFoundWin(false);
    setCatsGame(false);
    setCells(Array(9).fill(null));
    setPlayer("X");
  };

  useEffect(() => {
    startGame();
  }, []);

  const checkForWins = (Y, board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === Y && board[b] === Y && board[c] === Y) {
        return true;
      }
    }
    return false;
  };

  const handleCellClick = (index) => {
    if (cells[index] || foundWin || catsGame) return;

    const newCells = [...cells];
    newCells[index] = player;
    setCells(newCells);

    const isWin = checkForWins(player, newCells);

    if (isWin) {
      setFoundWin(true);
      if (player === "X") {
        setXWins((prevXWins) => prevXWins + 1);
      } else {
        setOWins((prevOWins) => prevOWins + 1);
      }
      setRoundsPlayed((prevRounds) => prevRounds + 1);
      setTimeout(() => startGame(), 1800);
    } else if (newCells.every((cell) => cell !== null)) {
      setCatsGame(true);
      setRoundsPlayed((prevRounds) => prevRounds + 1);
      setTimeout(() => startGame(), 1800);
    } else {
      setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    }
  };

  return (
    <div className="noughts-and-crosses">
      <h1 className="noughts-title">Noughts & Crosses</h1>
      <div className="board-cont">
        {catsGame && <div className="cats-game" />}
        <div className="board">
          {cells.map((cell, index) => (
            <Cell
              key={index}
              value={cell}
              onClick={() => handleCellClick(index)}
            />
          ))}
        </div>
      </div>
      <GameInfo roundsPlayed={roundsPlayed} xWins={xWins} oWins={oWins} />
    </div>
  );
}
