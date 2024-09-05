import "./Crossword.css";
import { useState, useEffect } from "react";

import Data from "./Data";
import Square from "./Square";
import Key from "./Key";

//add numbers idx associated with words and their letters
//jump to first letter of next question in question order

export default function Crossword() {
  const [squares, setSquares] = useState([]);
  const [isKeyOpen, setIsKeyOpen] = useState(false);
  const [currDir, setCurrDir] = useState(null);
  // const [currWord, setCurrWord] = useState(null);

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
  function clickSquare(currSquare) {
    console.log(currSquare);
    // setCurrWord(null);
    setCurrDir(null);
    // Remove highlights from all squares
    setSquares((sqs) => sqs.map((sq) => ({ ...sq, highlight: false })));

    // Determine the word to highlight
    let word, direction;

    if (currSquare.words.length === 2) {
      word = currSquare.firstClick ? currSquare.words[0] : currSquare.words[1];
      direction = currSquare.firstClick
        ? currSquare.dirs[1]
        : currSquare.dirs[0];
      setSquares((sqs) =>
        sqs.map((sq) =>
          sq.idx === currSquare.idx
            ? { ...sq, firstClick: !currSquare.firstClick }
            : sq
        )
      );
    } else {
      word = currSquare.words[0];
      direction = currSquare.dirs[0];
    }
    // console.log(direction);
    // setCurrWord(word);
    setCurrDir(direction);
    // Highlight the squares that share the selected word
    setSquares((sqs) =>
      sqs.map((sq) =>
        sq.words?.includes(word) ? { ...sq, highlight: true } : sq
      )
    );
  }

  /////////////////////////////////////////////
  const moveFocusBackward = (currSquare, direction) => {
    const gridSize = 16;

    let currentIdx = squares.findIndex(
      (square) => square.idx === currSquare.idx
    );

    if (direction === "hor") {
      for (let i = currentIdx - 1; i >= 0; i--) {
        const prevSquare = squares[i];
        if (!prevSquare.blackout && prevSquare.dirs.includes("hor")) {
          focusSquare(prevSquare.idx);
          return;
        }
      }
    } else if (direction === "vert") {
      for (let i = currentIdx - gridSize; i >= 0; i -= gridSize) {
        const prevSquare = squares[i];
        if (!prevSquare.blackout && prevSquare.dirs.includes("vert")) {
          focusSquare(prevSquare.idx);
          return;
        }
      }
    }

    moveToOppositeDirectionBackward(currSquare);
  };

  function moveToOppositeDirectionBackward(currSquare) {
    if (currDir === "hor") {
      // Switch to the last vertical square
      for (let i = squares.length - 1; i >= 0; i--) {
        const square = squares[i];
        if (!square.blackout && square.dirs.includes("vert")) {
          focusSquare(square.idx); // Focus the last vertical square
          return;
        }
      }
    } else if (currDir === "vert") {
      // Switch to the last horizontal square
      for (let i = squares.length - 1; i >= 0; i--) {
        const square = squares[i];
        if (!square.blackout && square.dirs.includes("hor")) {
          focusSquare(square.idx); // Focus the last horizontal square
          return;
        }
      }
    }
  }

  /////////////////////////////////////////////

  const moveFocus = (currSquare, direction) => {
    const gridSize = 16; // Grid is 16 wide

    let currentIdx = squares.findIndex(
      (square) => square.idx === currSquare.idx
    );

    if (direction === "hor") {
      for (let i = currentIdx + 1; i < squares.length; i++) {
        const nextSquare = squares[i];
        if (!nextSquare.blackout && nextSquare.dirs.includes("hor")) {
          focusSquare(nextSquare.idx);
          return;
        }
      }
    } else if (direction === "vert") {
      for (let i = currentIdx + gridSize; i < squares.length; i += gridSize) {
        const nextSquare = squares[i];
        if (!nextSquare.blackout && nextSquare.dirs.includes("vert")) {
          focusSquare(nextSquare.idx);
          return;
        }
      }
    }

    moveToOppositeDirection(currSquare);
  };

  function moveToOppositeDirection(currSquare) {
    if (currDir === "hor") {
      // Switch to the first vertical square
      for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        if (!square.blackout && square.dirs.includes("vert")) {
          focusSquare(square.idx); // Focus the first vertical square
          return;
        }
      }
    } else if (currDir === "vert") {
      // Switch to the first horizontal square
      for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        if (!square.blackout && square.dirs.includes("hor")) {
          focusSquare(square.idx); // Focus the first horizontal square
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
                  moveFocusBackward={moveFocusBackward}
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
