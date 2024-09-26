import "./Crossword.css";
import { useState, useEffect, useCallback } from "react";

import Data from "./Data";
import Square from "./Square";
import Key from "./Key";

export default function Crossword() {
  const [squares, setSquares] = useState([]);
  const [isKeyOpen, setIsKeyOpen] = useState(false);
  const [currDir, setCurrDir] = useState(null);
  const [prevWord, setPrevWord] = useState(null); // State to store the previously highlighted word

  //useEffect runs only on page's 1st render
  //populates squares in state
  useEffect(() => {
    //get each letter from each word of Data array
    const letters = Data.map(({ a, num, local, dir }) => ({
      word: a.replace(/ /g, "").toLowerCase(),
      questionId: num,
      idx: local,
      dir,
    })).flatMap(({ word, questionId, idx, dir }) =>
      word.split("").map((char, j) => ({
        char,
        word,
        dir,
        idx: dir === "hor" ? idx + j : idx + j * 16,
        corner: j === 0,
        ...(j === 0 ? { questionId } : null),
      }))
    );

    const populateSquares = Array.from({ length: 320 }, (_, i) => {
      const idx = i + 1;
      const match = letters.filter((letter) => letter.idx === idx);

      //creates a blank blackout square
      if (match.length === 0) {
        return {
          blackout: true,
          idx,
        };
      }
      //creates squares that have chars
      return match.reduce(
        (acc, { char, word, dir, questionId, corner }) => {
          if (!acc.char) acc.char = char; // Store the single character directly
          if (!acc.words.includes(word)) acc.words.push(word);
          if (!acc.dirs.includes(dir)) acc.dirs.push(dir);
          if (!acc.questionIds.includes(questionId))
            acc.questionIds.push(questionId);
          if (corner) acc.corner = true;
          acc.blackout = false; // Set blackout to false
          return acc;
        },
        {
          blackout: false,
          highlight: false,
          idx,
          char: "",
          dirs: [],
          words: [],
          questionIds: [],
          kIdx: Math.random() - 0.5,
        }
      );
    });

    setSquares(
      populateSquares.map((sq) => {
        if (sq.dirs && sq.dirs.length === 2) {
          const sortedDirs = sq.dirs.sort((a, b) => {
            if (a === "hor" && b === "vert") return -1;
            if (a === "vert" && b === "hor") return 1;
            return 0; // No change needed if they are already in order or if they are the same
          });
          return { ...sq, dirs: sortedDirs };
        }
        return sq;
      })
    );
  }, []);

  function renderQuestions(dir) {
    return (
      <div>
        <h3> {dir === "hor" ? "Across" : "Down"}</h3>
        <div>
          {Data.sort((a, b) => a.num - b.num).map((question) => {
            if (question.dir === dir) {
              return (
                <p key={question.num}>
                  {question.num}. {question.q}
                </p>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  // Function to toggle modal visibility
  const toggleKey = () => {
    setIsKeyOpen(!isKeyOpen);
  };

  //handles squares being clicked and adds highlights to matched words
  const clickSquare = useCallback(
    (currSquare) => {
      // console.log(currSquare);

      setCurrDir(null);
      // Remove highlights from all squares
      setSquares((sqs) => sqs.map((sq) => ({ ...sq, highlight: false })));

      // Determine the word to highlight
      let word, direction;
      if (currSquare.words.length === 2) {
        // Check if prevWord exists and matches either word in the square
        if (prevWord && currSquare.words.includes(prevWord)) {
          if (currSquare.firstClick) {
            // If firstClick is true, prefer the prevWord
            word =
              prevWord === currSquare.words[0]
                ? currSquare.words[0]
                : currSquare.words[1];
            direction =
              prevWord === currSquare.words[0]
                ? currSquare.dirs[0]
                : currSquare.dirs[1];
          } else {
            // If firstClick is false, pick the other word
            word =
              prevWord === currSquare.words[0]
                ? currSquare.words[1]
                : currSquare.words[0];
            direction =
              prevWord === currSquare.words[0]
                ? currSquare.dirs[1]
                : currSquare.dirs[0];
          }
        } else {
          // If no prevWord or prevWord doesn't match any word, default to currSquare.words[0]
          word = currSquare.firstClick
            ? currSquare.words[0]
            : currSquare.words[1];
          direction = currSquare.firstClick
            ? currSquare.dirs[0]
            : currSquare.dirs[1];
        }

        // Toggle firstClick state for the next click
        setSquares((sqs) =>
          sqs.map((sq) =>
            sq.idx === currSquare.idx
              ? { ...sq, firstClick: !currSquare.firstClick }
              : sq
          )
        );
      } else {
        // Only one word exists
        word = currSquare.words[0];
        direction = currSquare.dirs[0];
      }

      setCurrDir(direction);
      // Update the previously highlighted word
      setPrevWord(word);
      // Highlight the squares that share the selected word
      setSquares((sqs) =>
        sqs.map((sq) =>
          sq.words?.includes(word) ? { ...sq, highlight: true } : sq
        )
      );
    },
    [prevWord]
  );

  function moveFocus(currSquare, direction, step) {
    const gridSize = 16; // Grid is 16 wide

    // Find the index of the current square
    let currentIdx = squares.findIndex(
      (square) => square.idx === currSquare.idx
    );

    if (direction === "hor") {
      for (let i = currentIdx + step; i >= 0 && i < squares.length; i += step) {
        const nextSquare = squares[i];
        if (!nextSquare.blackout && nextSquare.dirs.includes("hor")) {
          focusSquare(nextSquare.idx); // Focus this square
          return;
        }
      }
    } else if (direction === "vert") {
      for (
        let i = currentIdx + step * gridSize;
        i >= 0 && i < squares.length;
        i += step * gridSize
      ) {
        const nextSquare = squares[i];
        if (!nextSquare.blackout && nextSquare.dirs.includes("vert")) {
          focusSquare(nextSquare.idx); // Focus this square
          return;
        }
      }
    }

    // If no valid square is found in the current direction, wrap around to the opposite direction
    moveToOppositeDirection(step);
  }

  function moveToOppositeDirection(step) {
    if (currDir === "hor") {
      // Move to the first or last vertical square depending on step
      const startIdx = step > 0 ? 0 : squares.length - 1;
      for (let i = startIdx; i >= 0 && i < squares.length; i += step) {
        const square = squares[i];
        if (!square.blackout && square.dirs.includes("vert")) {
          focusSquare(square.idx); // Focus the first/last vertical square
          return;
        }
      }
    } else if (currDir === "vert") {
      // Move to the first or last horizontal square depending on step
      const startIdx = step > 0 ? 0 : squares.length - 1;
      for (let i = startIdx; i >= 0 && i < squares.length; i += step) {
        const square = squares[i];
        if (!square.blackout && square.dirs.includes("hor")) {
          focusSquare(square.idx); // Focus the first/last horizontal square
          return;
        }
      }
    }
  }

  function focusSquare(idx) {
    const squareInput = document.querySelector(`input[data-grid-id="${idx}"]`);
    if (squareInput) {
      squareInput.focus(); // Focus the square
    }
  }

  return (
    <div className="Crossword">
      <h1 className="crossword-title">
        Buffy the Vampire Slayer: Cryptic Crossword
      </h1>
      <div className="crossword-cont">
        <div className="grid-cont">
          <div className="grid">
            {squares.map((square) => {
              return (
                <Square
                  key={square.idx}
                  square={square}
                  clickSquare={clickSquare}
                  moveFocus={moveFocus}
                  currDir={currDir}
                />
              );
            })}
          </div>
        </div>
        <div className="questions">
          {renderQuestions("vert")}
          {renderQuestions("hor")}
          <button className="Key-button" onClick={toggleKey} tabIndex={-1}>
            Key
          </button>
          {isKeyOpen && <Key onClose={toggleKey} />}
        </div>
      </div>
    </div>
  );
}
