import { useState, useEffect, useCallback } from "react";
import "./Numerix.css";

export default function Numerix() {
  const [board, setBoard] = useState(Array(16).fill(null));

  const getRandomEmptyCell = useCallback((boardState) => {
    let emptyPositions = [];
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i] === null) {
        // If the cell is empty (null), add its position to emptyPositions
        emptyPositions.push(i);
      }
    }

    //Check if there are any empty positions
    if (emptyPositions.length === 0) {
      return null; // No empty cells left
    }

    //Get a random position from our empty positions
    const randomPosition = Math.floor(Math.random() * emptyPositions.length);

    // Return the random empty position
    return emptyPositions[randomPosition];
  }, []);

  const generateNewNumber = useCallback(() => {
    //between 0 & 1
    const random = Math.random();

    // 90% chance to return 2, 10% chance to return 4
    if (random < 0.9) {
      return 2;
    } else {
      return 4;
    }
  }, []);

  const startGame = useCallback(() => {
    // Create a new empty board
    const newBoard = Array(16).fill(null);

    // Place first number
    const firstPosition = getRandomEmptyCell(newBoard);
    newBoard[firstPosition] = generateNewNumber();

    // Place second number
    const secondPosition = getRandomEmptyCell(newBoard);
    newBoard[secondPosition] = generateNewNumber();

    // Update the board state
    setBoard(newBoard);
  }, [getRandomEmptyCell, generateNewNumber]);

  //useEffect starts game when page is first rendered
  useEffect(() => {
    startGame();
  }, [startGame]);

  const moveHorizontal = useCallback(
    (direction) => {
      let newBoard = [...board];
      let changed = false;

      // Process each row
      for (let i = 0; i < 16; i += 4) {
        // Get current row
        let row = newBoard.slice(i, i + 4);

        // Remove nulls
        let filtered = row.filter((cell) => cell !== null);

        // Combine equal numbers
        if (direction === "right") {
          // Right to left combining
          for (let j = filtered.length - 1; j > 0; j--) {
            if (filtered[j] === filtered[j - 1]) {
              filtered[j] = filtered[j] * 2;
              filtered.splice(j - 1, 1);
              changed = true;
            }
          }
        } else {
          // Left to right combining
          for (let j = 0; j < filtered.length - 1; j++) {
            if (filtered[j] === filtered[j + 1]) {
              filtered[j] = filtered[j] * 2;
              filtered.splice(j + 1, 1);
              changed = true;
            }
          }
        }

        // Pad with nulls
        while (filtered.length < 4) {
          if (direction === "right") {
            filtered.unshift(null); // Add nulls to left
          } else {
            filtered.push(null); // Add nulls to right
          }
        }

        // Update the board
        for (let j = 0; j < 4; j++) {
          if (newBoard[i + j] !== filtered[j]) {
            changed = true;
          }
          newBoard[i + j] = filtered[j];
        }
      }

      if (changed) {
        const emptyCell = getRandomEmptyCell(newBoard);
        if (emptyCell !== null) {
          newBoard[emptyCell] = generateNewNumber();
        }
        setBoard(newBoard);
      }
    },
    [board, getRandomEmptyCell, generateNewNumber]
  );

  const moveVertical = useCallback(
    (direction) => {
      let newBoard = [...board];
      let changed = false;

      // Process each column (4 columns, starting at indices 0,1,2,3)
      for (let i = 0; i < 4; i++) {
        // Get current column
        let column = [
          newBoard[i], // First row
          newBoard[i + 4], // Second row
          newBoard[i + 8], // Third row
          newBoard[i + 12], // Fourth row
        ];

        // Remove nulls
        let filtered = column.filter((cell) => cell !== null);

        // Combine equal numbers
        if (direction === "down") {
          for (let j = filtered.length - 1; j > 0; j--) {
            if (filtered[j] === filtered[j - 1]) {
              filtered[j] = filtered[j] * 2;
              filtered.splice(j - 1, 1);
              changed = true;
            }
          }
        } else {
          for (let j = 0; j < filtered.length - 1; j++) {
            if (filtered[j] === filtered[j + 1]) {
              filtered[j] = filtered[j] * 2;
              filtered.splice(j + 1, 1);
              changed = true;
            }
          }
        }

        // Pad with nulls
        while (filtered.length < 4) {
          if (direction === "down") {
            filtered.unshift(null);
          } else {
            filtered.push(null);
          }
        }

        // Update the board - THIS IS THE FIXED PART
        for (let j = 0; j < 4; j++) {
          // Calculate the correct index in the flat board array
          const boardIndex = i + j * 4;
          if (newBoard[boardIndex] !== filtered[j]) {
            changed = true;
          }
          newBoard[boardIndex] = filtered[j];
        }
      }

      if (changed) {
        const emptyCell = getRandomEmptyCell(newBoard);
        if (emptyCell !== null) {
          newBoard[emptyCell] = generateNewNumber();
        }
        setBoard(newBoard);
      }
    },
    [board, getRandomEmptyCell, generateNewNumber]
  );

  //useEffect just for arrow keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          moveVertical("up");
          break;
        case "ArrowDown":
          moveVertical("down");
          break;
        case "ArrowLeft":
          moveHorizontal("left");
          break;
        case "ArrowRight":
          moveHorizontal("right");
          break;
        default:
          // If any other key is pressed-> don't need to do anything
          return;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [moveVertical, moveHorizontal]);

  return (
    <div className="numerix">
      <div className="n-title">Numerix</div>
      <div className="n-board-cont">
        <div className="n-board">
          {board.map((cell, index) => {
            return (
              <div key={index} className="n-cell">
                {cell}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
