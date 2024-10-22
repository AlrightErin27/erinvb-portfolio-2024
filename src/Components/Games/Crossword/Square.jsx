import "./Square.css";
import { useState, useEffect, useRef } from "react";

export default function Square({ square, clickSquare, moveFocus, currDir }) {
  const [text, setText] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const squareRef = useRef(null);

  // Check if the square is correct whenever the text changes
  useEffect(() => {
    setIsCorrect(text === square.char);
    moveFocus(square, currDir, 1);
    // eslint-disable-next-line
  }, [text, square.char]);

  useEffect(() => {
    if (text === "") {
      squareRef.current?.focus(); // Ensure the focus is set after text changes
    }
  }, [text]); // This effect will run every time the `text` changes

  const handleInputChange = (e) => {
    setText(e.target.value.toLowerCase());
  };

  const handleBackspace = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace behavior

      if (text === "") {
        // Case 1: Input is empty, move to the previous square
        moveFocus(square, currDir, -1);
      } else if (!isCorrect) {
        // Case 2a: Input is incorrect, clear it
        setText(""); // Clear the input
      } else {
        // Case 2b: Input is correct, move to the previous square
        moveFocus(square, currDir, -1);
      }
    }
  };

  return (
    <div className="Square">
      <div
        className={
          square.blackout ? "blackout" : isCorrect ? "correct" : "white"
        }
        style={square.highlight ? { backgroundColor: "#d7b8b8" } : null}
      >
        {!square.blackout && (
          <>
            {square.corner && (
              <div className="corner-num">{square.questionIds}</div>
            )}
            <input
              className="input"
              value={text ? text.toLocaleUpperCase() : ""}
              maxLength={1}
              data-grid-id={square.idx}
              ref={squareRef}
              onChange={handleInputChange}
              id={square.kIdx}
              onClick={() => clickSquare(square)}
              onDoubleClick={() => setText(square.char)}
              onFocus={() => clickSquare(square)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault(); // Prevent default tab behavior
                  moveFocus(square, currDir, 1); // Move forward based on currDir
                } else {
                  // e.preventDefault(); // Prevent default backspace behavior
                  // moveFocus(square, currDir, -1); // Move backward based on currDir
                  handleBackspace(e);
                }
              }}
              tabIndex="0"
            />
          </>
        )}
      </div>
    </div>
  );
}
