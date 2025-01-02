// Import necessary modules and components
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Numerix.css";
import TouchModeIcon from "../../../Images/Games/Numerix/fingerprint.png";
import CloseIcon from "../../../Images/Games/Numerix/close.png";
import TouchPad from "./TouchPad";
import ShowHelpModal from "./ShowHelpModal";
import NoMovesModal from "./NoMovesModal";
import TopScoresModal from "./TopScoresModal";

////////////TO
//NoMovesModal: display gets scrunched when narrow screen view
//update Readme for game and for portfolio
//add current score display to no moves modal

// Define API URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
console.log("API URL:", API_URL);

export default function Numerix() {
  // Define states for managing game and UI elements
  const [board, setBoard] = useState(Array(16).fill(null));
  const [showHelp, setShowHelp] = useState(false);
  const [showTopScores, setShowTopScores] = useState(false);
  const [score, setScore] = useState(0);
  const [touchMode, setTouchMode] = useState(false);
  const [noMovesLeft, setNoMovesLeft] = useState(false);
  const [username, setUsername] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const [disableGame, setDisableGame] = useState(false);

  // Utility function to get a random empty cell from the board
  const getRandomEmptyCell = useCallback((boardState) => {
    let emptyPositions = [];
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i] === null) {
        emptyPositions.push(i);
      }
    }

    if (emptyPositions.length === 0) {
      return null;
    }

    const randomPosition = Math.floor(Math.random() * emptyPositions.length);
    return emptyPositions[randomPosition];
  }, []);

  // Utility function to generate a new number (2 or 4)
  const generateNewNumber = useCallback(() => {
    const random = Math.random();
    return random < 0.9 ? 2 : 4;
  }, []);

  // Initialize and start a new game
  const startGame = useCallback(() => {
    console.log("Starting a new game...");

    const newBoard = Array(16).fill(null);
    setScore(0);
    setScoreSaved(false);

    const firstPosition = getRandomEmptyCell(newBoard);
    newBoard[firstPosition] = generateNewNumber();

    const secondPosition = getRandomEmptyCell(newBoard);
    newBoard[secondPosition] = generateNewNumber();

    setBoard(newBoard);
  }, [getRandomEmptyCell, generateNewNumber]);

  // Check if the game is over (no moves left)
  const checkGameOver = useCallback(() => {
    if (board.includes(null)) {
      return false;
    }

    for (let i = 0; i < 16; i += 4) {
      for (let j = 0; j < 3; j++) {
        if (board[i + j] === board[i + j + 1]) {
          return false;
        }
      }
    }

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

  // Start a new game on initial load
  useEffect(() => {
    startGame();
  }, [startGame]);

  // Handle horizontal moves (left and right)
  const moveHorizontal = useCallback(
    (direction) => {
      let newBoard = [...board];
      let changed = false;
      let points = 0;

      for (let i = 0; i < 16; i += 4) {
        let row = newBoard.slice(i, i + 4);
        let filtered = row.filter((cell) => cell !== null);

        if (direction === "right") {
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

        while (filtered.length < 4) {
          if (direction === "right") {
            filtered.unshift(null);
          } else {
            filtered.push(null);
          }
        }

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

      if (checkGameOver()) {
        setNoMovesLeft(true);
      }
    },
    [board, getRandomEmptyCell, generateNewNumber, checkGameOver]
  );

  // Handle vertical moves (up and down)
  const moveVertical = useCallback(
    (direction) => {
      let newBoard = [...board];
      let changed = false;
      let points = 0;

      for (let i = 0; i < 4; i++) {
        let column = [
          newBoard[i],
          newBoard[i + 4],
          newBoard[i + 8],
          newBoard[i + 12],
        ];

        let filtered = column.filter((cell) => cell !== null);

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

        while (filtered.length < 4) {
          if (direction === "down") {
            filtered.unshift(null);
          } else {
            filtered.push(null);
          }
        }

        for (let j = 0; j < 4; j++) {
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

      if (checkGameOver()) {
        setNoMovesLeft(true);
      }
    },
    [board, getRandomEmptyCell, generateNewNumber, checkGameOver]
  );

  // Listen for keyboard events to handle arrow keys
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (disableGame) return;

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
          return;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [moveVertical, moveHorizontal, disableGame]);

  // Handle closing the game over modal
  function handleCloseGameOverModal() {
    setNoMovesLeft(false);
    startGame();
  }

  // Handle arrow button clicks
  const handleArrowClick = (arrow) => {
    if (disableGame) return;

    const keyMap = {
      "↑": "ArrowUp",
      "↓": "ArrowDown",
      "←": "ArrowLeft",
      "→": "ArrowRight",
    };

    const eventKey = keyMap[arrow];
    if (eventKey) {
      const event = new KeyboardEvent("keydown", { key: eventKey });
      window.dispatchEvent(event);
    }
  };

  // Handle saving the score
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

  // Toggle disableGame state when modals are displayed
  useEffect(() => {
    setDisableGame(showTopScores || showHelp || noMovesLeft);
  }, [showTopScores, showHelp, noMovesLeft]);

  return (
    <div className="n-container">
      {/* Overlay to block clicks when any modal is open */}
      {(showTopScores || showHelp || noMovesLeft) && (
        <div className="n-overlay" />
      )}

      {/* Top Scores Button */}
      {!showTopScores ? (
        <button
          className="n-top-scores-button"
          onClick={() => setShowTopScores(true)}
        >
          Top Scores
        </button>
      ) : (
        <TopScoresModal setShowTopScores={setShowTopScores} />
      )}

      {/* Game Title */}
      <div className="n-title">Numerix</div>

      {/* Board and Scores Display */}
      <div className="n-board-scores-cont">
        {score ? (
          <p className="n-score">Score: {score}</p>
        ) : (
          <p className="n-score-null">""</p>
        )}
        <div className="n-board-cont">
          <div className="n-board">
            {board.map((cell, index) => (
              <div key={index} className="n-cell">
                {cell}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="n-button-bar">
        <button onClick={() => !disableGame && startGame()}>Restart</button>

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

      {/* Modals */}
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
