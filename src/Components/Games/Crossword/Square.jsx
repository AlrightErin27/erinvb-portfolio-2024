import "./Square.css";
import { useState, useEffect, useRef } from "react";

export default function Square({
  square,
  clickSquare,
  squares,
  // words,
  currWord,
}) {
  const [text, setText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [data, setData] = useState({
    currWord: null,
    nextWord: null,
    isFirstLetter: false,
    isLastLetter: false,
  });
  const inputRef = useRef("");

  // Check if the square is correct whenever the text changes
  useEffect(() => {
    setIsCorrect(text === square.char);
  }, [text, square.char]);

  const handleInputChange = (e) => {
    setText(e.target.value.toLowerCase());
  };

  // Monitor the highlighted square and update currWord and nextWordStartIndex
  // useEffect(() => {
  //   if (square.highlight && currWord) {
  //     const currIdx = words.findIndex((word) => word.word === currWord);
  //     let first = null,
  //       last = null;

  //     //loop through squares, if you find the first letter that matches words and it highlight
  //     //that is the first letter and check to see if it's index matches this current index
  //     for (let i = 0; i < squares.length; i++) {
  //       if (squares[i].highlight && !squares[i].blackout) {
  //         const curr = squares[i];
  //         if (curr.words.includes(currWord)) {
  //           if (!first) {
  //             first = curr;
  //           }
  //           // Always set lastLetter to the current square as we iterate
  //           last = curr;
  //         }
  //       }
  //     }

  //     // Now, check if the current square is the first or last letter
  //     const isFirst = first && first.idx === square.idx;
  //     const isLast = last && last.idx === square.idx;

  //     setData((prev) => ({
  //       ...prev,
  //       currWord: currWord,
  //       nextWord: words[currIdx + 1].word,
  //       isFirstLetter: isFirst,
  //       isLastLetter: isLast,
  //     }));
  //   }
  // }, [square.highlight, currWord, squares]);

  // if (square.highlight && data.currWord) {
  //   console.log(data);
  // }

  return (
    <div className="Square">
      <div
        className={
          square.blackout ? "blackout" : isCorrect ? "correct" : "white"
        }
        style={square.highlight ? { backgroundColor: "grey" } : null}
      >
        {!square.blackout && (
          <>
            {square.corner && (
              <div className="corner-num">{square.questionIds}</div>
            )}
            <input
              className="input"
              value={text.toLocaleUpperCase()}
              maxLength={1}
              data-grid-id={square.idx}
              ref={inputRef}
              onChange={handleInputChange}
              id={square.kIdx}
              onClick={() => clickSquare(square)}
              onDoubleClick={() => setText(square.char)}
              // tabIndex={square.onTab ? -1 : 0}
            />
          </>
        )}
      </div>
    </div>
  );
}
