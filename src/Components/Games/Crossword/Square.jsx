import "./Square.css";
import { useState, useEffect } from "react";

export default function Square({ sq, clickSquare }) {
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
          onClick={() => {
            clickSquare(sq);
          }}
        >
          {displayCorner()}
          <input
            onDoubleClickCapture={() => handleDoubleClick()}
            className="input"
            style={sqCorrect ? { color: "red", pointerEvents: "none" } : null}
            value={text.toLocaleUpperCase()}
            maxLength={1}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      );
    }
  }

  return <div className="Square">{displayBlackOrWhite()}</div>;
}
