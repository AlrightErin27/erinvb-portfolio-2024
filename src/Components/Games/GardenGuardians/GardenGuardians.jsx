import React, { useState, useEffect } from "react";
import GardenSquare from "./GardenSquare";
import "./GardenGuardians.css";

import flower1 from "../../../Images/Games/GardenGuardians/blueflower1.png";
import flower2 from "../../../Images/Games/GardenGuardians/blueflower2.png";
import flower3 from "../../../Images/Games/GardenGuardians/blueflower3.png";
import clover1 from "../../../Images/Games/GardenGuardians/clover1.png";
import clover2 from "../../../Images/Games/GardenGuardians/clover2.png";
import clover3 from "../../../Images/Games/GardenGuardians/clover3.png";
import flagImage from "../../../Images/Games/GardenGuardians/redflag.png";
import gnomeImage from "../../../Images/Games/GardenGuardians/gardengnome.png";

const gridSizes = [
  { name: "Easy", width: 9, height: 9, pestCount: 10 },
  { name: "Medium", width: 16, height: 16, pestCount: 40 },
  { name: "Hard", width: 30, height: 16, pestCount: 99 },
];

const GardenGuardians = () => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [selectedSize, setSelectedSize] = useState(gridSizes[0]);
  const [firstClick, setFirstClick] = useState(true);
  const [guardMode, setGuardMode] = useState(false);

  const images = {
    gardenPlants: [clover1, clover2, clover3, flower1, flower2, flower3],
    flag: flagImage,
    gnome: gnomeImage,
  };

  useEffect(() => {
    initializeBoard();
  }, [selectedSize]);

  const initializeBoard = () => {
    const { width, height } = selectedSize;
    const newBoard = Array(height)
      .fill()
      .map(() =>
        Array(width)
          .fill()
          .map(() => ({
            hasPest: false,
            isRevealed: false,
            isFlagged: false,
            neighborPests: 0,
            image: null,
          }))
      );
    setBoard(newBoard);
    setFirstClick(true);
    setGameOver(false);
    setWin(false);
  };

  const placePestsAndCalculateNeighbors = (clickedRow, clickedCol) => {
    const { width, height, pestCount } = selectedSize;
    const newBoard = [...board];

    // Place pests
    let pestsPlaced = 0;
    while (pestsPlaced < pestCount) {
      const randomRow = Math.floor(Math.random() * height);
      const randomCol = Math.floor(Math.random() * width);
      if (
        !newBoard[randomRow][randomCol].hasPest &&
        (randomRow !== clickedRow || randomCol !== clickedCol)
      ) {
        newBoard[randomRow][randomCol].hasPest = true;
        pestsPlaced++;
      }
    }

    // Calculate neighbor pests and assign random images
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (!newBoard[row][col].hasPest) {
          newBoard[row][col].neighborPests = countNeighborPests(
            newBoard,
            row,
            col
          );
          newBoard[row][col].image =
            images.gardenPlants[
              Math.floor(Math.random() * images.gardenPlants.length)
            ];
        } else {
          newBoard[row][col].image =
            images.gardenPlants[
              Math.floor(Math.random() * images.gardenPlants.length)
            ];
        }
      }
    }

    return newBoard;
  };

  const countNeighborPests = (board, row, col) => {
    let count = 0;
    const { width, height } = selectedSize;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const newRow = row + r;
        const newCol = col + c;
        if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
          if (board[newRow][newCol].hasPest) count++;
        }
      }
    }
    return count;
  };

  const handleSquareClick = (row, col) => {
    if (gameOver || win) return;

    let newBoard = [...board];

    if (guardMode) {
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setBoard(newBoard);
      return;
    }

    if (newBoard[row][col].isFlagged) return;

    if (firstClick) {
      newBoard = placePestsAndCalculateNeighbors(row, col);
      setFirstClick(false);
      // Reveal the clicked square and its neighbors
      revealSquare(newBoard, row, col);
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          revealSquare(newBoard, row + r, col + c);
        }
      }
    } else {
      if (newBoard[row][col].hasPest) {
        setGameOver(true);
        revealAll(newBoard);
      } else {
        revealSquare(newBoard, row, col);
      }
    }

    checkWin(newBoard);
    setBoard(newBoard);
  };

  const revealSquare = (board, row, col) => {
    const { width, height } = selectedSize;
    if (
      row < 0 ||
      row >= height ||
      col < 0 ||
      col >= width ||
      board[row][col].isRevealed ||
      board[row][col].isFlagged
    )
      return;

    board[row][col].isRevealed = true;

    if (board[row][col].neighborPests === 0) {
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          revealSquare(board, row + r, col + c);
        }
      }
    }
  };

  const revealAll = (board) => {
    return board.map((row) =>
      row.map((square) => ({ ...square, isRevealed: true }))
    );
  };

  const checkWin = (board) => {
    const allNonPestSquaresRevealed = board.every((row) =>
      row.every((square) => square.isRevealed || square.hasPest)
    );
    if (allNonPestSquaresRevealed) {
      setWin(true);
    }
  };

  const resetGame = () => {
    initializeBoard();
    setGuardMode(false);
  };

  const toggleGuardMode = () => {
    setGuardMode(!guardMode);
  };

  return (
    <div className="garden-guardians">
      <h1>Garden Guardians</h1>
      <div className="game-controls">
        {gridSizes.map((size, index) => (
          <button
            key={index}
            onClick={() => setSelectedSize(size)}
            className={selectedSize === size ? "active" : ""}
          >
            {size.name}
          </button>
        ))}
        <button onClick={toggleGuardMode} className={guardMode ? "active" : ""}>
          {guardMode ? "Exit Guard Mode" : "Enter Guard Mode"}
        </button>
      </div>
      <div className="game-board">
        <div className="grid-container">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((square, colIndex) => (
                <GardenSquare
                  key={`${rowIndex}-${colIndex}`}
                  {...square}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  flagImage={images.gnome}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {gameOver && (
        <div className="game-over">
          <img
            src={images.gnome}
            alt="Game Over Gnome"
            className="game-over-gnome"
          />
          <p>Game Over! The pests ruined your garden!</p>
        </div>
      )}
      {win && (
        <div className="win-message">
          Congratulations! You've protected the garden!
        </div>
      )}
      <button onClick={resetGame} className="new-game-button">
        New Game
      </button>
    </div>
  );
};

export default GardenGuardians;
