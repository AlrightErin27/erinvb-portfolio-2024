import "./Square.css";
import { useState, useEffect, useRef } from "react";

export default function Square({ sq, clickSquare, squares }) {
  const inputRef = useRef("");
  const [text, setText] = useState("");
  const [sqCorrect, setSqCorrect] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const [nextID, setNextID] = useState(null);
  const [nextDOM, setNextDOM] = useState(null);

  useEffect(() => {
    if (text.toLocaleLowerCase() === sq.chars[0]) {
      // console.log("MATCH");
      setSqCorrect(true);
    } else if (doubleClick) {
      // console.log("CHEATER");
      setText(sq.chars[0]);
      setSqCorrect(true);
    }

    findNextID();
  }, [text, doubleClick, sq.chars]);

  if (nextDOM !== null) {
    console.log("NEXT_ID_DOM: ", nextDOM.value);
    nextDOM.focus();
  }

  function findNextID() {
    if (text !== "") {
      for (let i = 0 + sq.grid_ID; i < squares.length; i++) {
        if (
          sq.words.includes(squares[i].words[0] || squares[i].words[1]) &&
          sq.grid_ID !== squares[i].grid_ID
        ) {
          setNextDOM(
            document.querySelector(
              `input.input[data-grid-id="${squares[i].grid_ID}"]`
            )
          );
          console.log(
            document.querySelector(
              `input.input[data-grid-id="${squares[i].grid_ID}"]`
            )
          );
          break;
        }
      }
    }
    return null;
  }

  function handleChange(e) {
    setText(e.target.value);
    console.log(e);
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
            // onChange={(e) => setText(e.target.value)}
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
