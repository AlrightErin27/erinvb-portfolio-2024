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

  const moveLeft = useCallback(() => {
    //copy of current board
    let newBoard = [...board];
    let changed = false; //Track if anything moved

    //process each row (all 4 els of each row)
    for (let i = 0; i < 16; i += 4) {
      //get curr row's 4 els
      let row = newBoard.slice(i, i + 4);

      //remove nulls and pack the nums to the left
      let filtered = row.filter((cell) => cell !== null);

      // Combine equal numbers
      for (let j = 0; j < filtered.length - 1; j++) {
        if (filtered[j] === filtered[j + 1]) {
          filtered[j] = filtered[j] * 2;
          filtered.splice(j + 1, 1);
          changed = true;
        }
      }

      //pad the row with nulls on the right
      while (filtered.length < 4) {
        filtered.push(null);
      }

      //update the board with the modified row
      for (let j = 0; j < 4; j++) {
        if (newBoard[i + j] !== filtered[j]) {
          changed = true;
        }
        newBoard[i + j] = filtered[j];
      }
    }

    if (changed) {
      console.log("Board changed: ", newBoard);
      setBoard(newBoard);
    }
  }, [board]);

  //useEffect just for keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          console.log("Up arrow pressed");
          break;
        case "ArrowDown":
          console.log("Down arrow pressed");
          break;
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          console.log("Right arrow pressed");
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
  }, [moveLeft]);

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
