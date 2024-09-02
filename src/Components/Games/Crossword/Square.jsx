import "./Square.css";
import { useState, useEffect, useRef } from "react";

export default function Square({ sq, clickSquare, handleUserInput }) {
  const inputRef = useRef("");
  const [text, setText] = useState("");
  const [sqCorrect, setSqCorrect] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);

  useEffect(() => {
    if (text.toLocaleLowerCase() === sq.chars[0]) {
      // console.log("MATCH");
      setSqCorrect(true);
    } else if (doubleClick) {
      // console.log("CHEATER");
      setText(sq.chars[0]);
      setSqCorrect(true);
    }
  }, [text, doubleClick, sq.chars]);

  function handleChange(e) {
    setText(e.target.value);
    // console.log(e);
    handleUserInput(e, sq);
  }

  function handleDoubleClick() {
    setDoubleClick(true);
  }

  function displayCorner() {
    if (sq.corner) {
      return (
        <div className="corner-num">
          <p>{sq.questions[0]}</p>
        </div>
      );
    }
  }

  function displayBlackOrWhite() {
    if (sq.black) {
      return <div className="black-sq" />;
    } else {
      return (
        <div
          className="white-sq"
          style={
            sq.highLight
              ? { backgroundColor: "rgba(211, 222, 61, 0.59)" }
              : null
          }
        >
          {displayCorner()}
          <input
            onDoubleClickCapture={() => handleDoubleClick()}
            onClick={() => {
              clickSquare(sq);
            }}
            className="input"
            style={sqCorrect ? { color: "red", pointerEvents: "none" } : null}
            value={text.toLocaleUpperCase()}
            maxLength={1}
            onChange={(e) => handleChange(e)}
            ref={inputRef}
            data-grid-id={sq.grid_ID}
          />
        </div>
      );
    }
  }

  return <div className="Square">{displayBlackOrWhite()}</div>;
}
