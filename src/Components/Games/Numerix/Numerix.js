import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Numerix.css";
import TouchModeIcon from "../../../Images/Games/Numerix/fingerprint.png";
import CloseIcon from "../../../Images/Games/Numerix/close.png";
import TouchPad from "./TouchPad";
import ShowHelpModal from "./ShowHelpModal";
import NoMovesModal from "./NoMovesModal";
import TopScores from "./TopScores";

// TO DO:
//do no let user make moves if noMovesLeft
//display top 10 high scores via button
//small screen size noMovesLeft modal overlaps close button (display score in modal)FIXME
//username CAN be re-used

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
console.log("API URL:", API_URL);

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

  async function handleSaveScore() {
    try {
      const response = await axios.post(`${API_URL}/numerix/score`, {
        numerixUsername: username,
        numerixScore: score,
      });

      if (response.data.success) {
        setScoreSaved(true);
      } else {
        console.error("Failed to save numerix score:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving numerix score:", error);
    }
  }

  return (
    <div className="n-container">
      <div className="n-title">Numerix</div>

      <div className="n-board-scores-cont">
        {score ? (
          <p className="n-score">Score: {score}</p>
        ) : (
          <p className="n-score-null">""</p>
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
        <TopScores />
      </div>

      <div className="n-button-bar">
        <button onClick={() => startGame()}>Restart</button>
        <div className="n-touch-mode-cont">
          {!touchMode ? (
            <button onClick={() => setTouchMode(!touchMode)}>
              <img
                className="n-touch-mode-icon"
                src={TouchModeIcon}
                alt="touch"
              />
            </button>
          ) : (
            <div className="n-touch-mode-true-cont">
              <TouchPad handleArrowClick={handleArrowClick} />
              <button
                onClick={() => setTouchMode(false)}
                className="n-touch-mode-false-button"
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
      {showHelp && <ShowHelpModal setShowHelp={setShowHelp} />}
      {noMovesLeft && (
        <NoMovesModal
          username={username}
          setUsername={setUsername}
          scoreSaved={scoreSaved}
          handleSaveScore={handleSaveScore}
          handleCloseGameOverModal={handleCloseGameOverModal}
        />
      )}
    </div>
  );
}
