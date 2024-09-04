import "./Square.css";
import { useState, useEffect, useRef } from "react";

export default function Square({
  square,
  square: { idx, blackout, corner, questionIds, char, keyId, highlight },
  clickSquare,
}) {
  const [text, setText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const inputRef = useRef("");

  // Check if the square is correct whenever the text changes
  useEffect(() => {
    setIsCorrect(text === char);
  }, [text, char]);

  const handleInputChange = (e) => {
    setText(e.target.value.toLowerCase());
  };

  return (
    <div className="Square">
      <div
        className={blackout ? "blackout" : isCorrect ? "correct" : "white"}
        style={highlight ? { backgroundColor: "grey" } : null}
      >
        {!blackout && (
          <>
            {corner && <div className="corner-num">{questionIds}</div>}
            <input
              className="input"
              value={text.toLocaleUpperCase()}
              maxLength={1}
              data-grid-id={idx}
              ref={inputRef}
              onChange={handleInputChange}
              id={keyId}
              onClick={() => clickSquare(square)}
              onDoubleClick={() => setText(char)}
            />
          </>
        )}
      </div>
    </div>
  );
}
