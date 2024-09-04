import "./Crossword.css";
import { useState, useEffect } from "react";

import Data from "./Data";
import Square from "./Square";
import Key from "./Key";

// TO DO🪲
// have double click display square's char✅
// make tab go forward
//entering a char go forward
//backspace go backwards
// add any custom hooks

export default function Crossword() {
  const [squares, setSquares] = useState([]);
  const [isKeyOpen, setIsKeyOpen] = useState(false);

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
          keyId: Math.random() - 0.5,
        }
      );
    });

    setSquares(populateSquares);
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

  //HIGHLIGHT WORD:
  function clickSquare(currSquare) {
    console.log(currSquare);
    // Remove highlights from all squares
    setSquares((sqs) => sqs.map((sq) => ({ ...sq, highlight: false })));

    // Determine the word to highlight
    let word;
    if (currSquare.words.length === 2) {
      word = currSquare.firstClick ? currSquare.words[0] : currSquare.words[1];
      setSquares((sqs) =>
        sqs.map((sq) =>
          sq.idx === currSquare.idx
            ? { ...sq, firstClick: !currSquare.firstClick }
            : sq
        )
      );
    } else {
      word = currSquare.words[0];
    }

    // Highlight the squares that share the selected word
    setSquares((sqs) =>
      sqs.map((sq) =>
        sq.words?.includes(word) ? { ...sq, highlight: true } : sq
      )
    );
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
                />
              );
            })}
          </div>
        </div>
        <div className="questions">
          {renderQuestions("vert")}
          {renderQuestions("hor")}
          <button className="Key-button" onClick={toggleKey}>
            Key
          </button>
          {isKeyOpen && <Key onClose={toggleKey} />}
        </div>
      </div>
    </div>
  );
}
