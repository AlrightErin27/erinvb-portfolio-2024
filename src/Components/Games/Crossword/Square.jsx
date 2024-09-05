import "./Square.css";
import { useState, useEffect, useRef } from "react";

export default function Square({ square, clickSquare, moveFocus, currDir }) {
  const [text, setText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);

  // Check if the square is correct whenever the text changes
  useEffect(() => {
    setIsCorrect(text === square.char);
  }, [text, square.char]);

  const handleInputChange = (e) => {
    setText(e.target.value.toLowerCase());
  };

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
              onFocus={() => clickSquare(square)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault(); // Prevent default tab behavior
                  moveFocus(square, currDir); // Use currDir to move focus horizontally or vertically
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
