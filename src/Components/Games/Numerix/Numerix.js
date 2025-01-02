import { useState, useEffect, useCallback } from "react";
import "./Numerix.css";
import TouchModeIcon from "../../../Images/Games/Numerix/fingerprint.png";
import CloseIcon from "../../../Images/Games/Numerix/close.png";
import TouchPad from "./TouchPad";

//TO DO: TEST
//check if game looks good on all screen sizes. ✅
//make sure touch screen players can play ✅
//modal to show game over ✅
//allow user to create a documented score if they'd like (saved to DB)
//update readme, update larger portfolio read me

export default function Numerix() {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [showHelp, setShowHelp] = useState(false);
  const [score, setScore] = useState(0);
  const [touchMode, setTouchMode] = useState(false);
  const [noMovesLeft, setNoMovesLeft] = useState(false);
  const [username, setUsername] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);

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
    setScore(0);

    // Place first number
    const firstPosition = getRandomEmptyCell(newBoard);
    newBoard[firstPosition] = generateNewNumber();

    // Place second number
    const secondPosition = getRandomEmptyCell(newBoard);
    newBoard[secondPosition] = generateNewNumber();

    // Update the board state
    setBoard(newBoard);
  }, [getRandomEmptyCell, generateNewNumber]);

  const checkGameOver = useCallback(() => {
    //check if there are any empty cells
    if (board.includes(null)) {
      return false;
    }

    //check for possible horizontal combos
    for (let i = 0; i < 16; i += 4) {
      for (let j = 0; j < 3; j++) {
        if (board[i + j] === board[i + j + 1]) {
          return false;
        }
      }
    }

    // check for possible vertical combinations
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 12; j += 4) {
        if (board[i + j] === board[i + j + 4]) {
          return false;
        }
      }
    }

    console.log("No moves possible, game over!");

    return true;
  }, [board]);

  //useEffect starts game when page is first rendered
  useEffect(() => {
    startGame();
  }, [startGame]);

  const moveHorizontal = useCallback(
    (direction) => {
      let newBoard = [...board];
      let changed = false;
      let points = 0; //track points in just this move

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
              points += filtered[j]; //update points
              filtered.splice(j - 1, 1);
              changed = true;
            }
          }
        } else {
          // Left to right combining
          for (let j = 0; j < filtered.length - 1; j++) {
            if (filtered[j] === filtered[j + 1]) {
              filtered[j] = filtered[j] * 2;
              points += filtered[j]; //update points
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
        setScore((prev) => prev + points);
      }

      // Check for game over
      if (checkGameOver()) {
        setNoMovesLeft(true);
      }
    },
    [board, getRandomEmptyCell, generateNewNumber, checkGameOver]
  );

  const moveVertical = useCallback(
    (direction) => {
      let newBoard = [...board];
      let changed = false;
      let points = 0;

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
              points += filtered[j];
              filtered.splice(j - 1, 1);
              changed = true;
            }
          }
        } else {
          for (let j = 0; j < filtered.length - 1; j++) {
            if (filtered[j] === filtered[j + 1]) {
              filtered[j] = filtered[j] * 2;
              points += filtered[j];
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
        setScore((prev) => prev + points);
      }

      // Check for game over
      if (checkGameOver()) {
        setNoMovesLeft(true);
      }
    },
    [board, getRandomEmptyCell, generateNewNumber, checkGameOver]
  );

  //useEffect just for arrow keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Prevent default scrolling behavior for arrow keys
      if (event.key.startsWith("Arrow")) {
        event.preventDefault();
      }

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

  function handleCloseGameOverModal() {
    setNoMovesLeft(false);
    startGame();
  }

  // Function to handle arrow clicks
  const handleArrowClick = (arrow) => {
    // Map arrow symbols to keyboard event keys
    const keyMap = {
      "↑": "ArrowUp",
      "↓": "ArrowDown",
      "←": "ArrowLeft",
      "→": "ArrowRight",
    };

    const eventKey = keyMap[arrow]; // Get the corresponding key
    if (eventKey) {
      // Create and dispatch a new KeyboardEvent
      const event = new KeyboardEvent("keydown", { key: eventKey });
      window.dispatchEvent(event); // Trigger the event
    }
  };

  function handleSaveScore() {
    setScoreSaved(true);
  }

  return (
    <div className="numerix">
      <div className="n-title">Numerix</div>
      {score ? (
        <p className="score">Score: {score}</p>
      ) : (
        <p className="score-null">""</p>
      )}
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
      <div className="n-button-bar">
        <button onClick={() => startGame()}>Restart</button>
        <div className="touch-mode-cont">
          {!touchMode ? (
            <button onClick={() => setTouchMode(!touchMode)}>
              <img
                className="touch-mode-icon"
                src={TouchModeIcon}
                alt="touch"
              />
            </button>
          ) : (
            <div className="touch-mode-true-cont">
              <TouchPad handleArrowClick={handleArrowClick} />
              <button
                onClick={() => setTouchMode(false)}
                className="touch-mode-false-button"
              >
                <img
                  src={CloseIcon}
                  alt="close icon"
                  style={{ height: "2rem", cursor: "pointer" }}
                />
              </button>
            </div>
          )}
        </div>

        <button onClick={() => setShowHelp(!showHelp)}>?</button>
      </div>
      {showHelp ? (
        <div className="show-modal">
          <h3>Welcome to Numerix!</h3>
          <p>
            Numerix, also known as 2048, is a fun and addictive number puzzle
            game. Here's how to play:
          </p>
          <ul>
            <li>
              Use your arrow keys (← ↑ → ↓) to slide the tiles across the grid.
            </li>
            <li>
              When two tiles with the same number touch, they merge into one,
              doubling their value!
            </li>
            <li>
              Keep combining tiles to create bigger numbers. The ultimate goal
              is to reach 2048, but you can keep playing to go even higher!
            </li>
          </ul>
          <p>Can you master the game and achieve the highest score?</p>
          <h3>Good luck!</h3>

          <button className="close-modal" onClick={() => setShowHelp(false)}>
            Close
          </button>
        </div>
      ) : null}
      {noMovesLeft ? (
        <div className="show-modal">
          <h3>Game Over!</h3>
          <p>Save your score with username:</p>
          {!scoreSaved ? (
            <div className="save-score">
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={() => handleSaveScore()}>Save</button>
            </div>
          ) : (
            <div className="score-saved-message">
              <span>✔️ Score saved</span>
            </div>
          )}

          <button
            className="close-modal"
            onClick={() => handleCloseGameOverModal()}
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}
