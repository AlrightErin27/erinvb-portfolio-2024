import "./Box.css";

import { useState, useEffect } from "react";

export default function Box({ box, clickBox }) {
  const [text, setText] = useState("");
  const [correct, setCorrect] = useState(false);

  //display corner number if it exists
  function displayCorner() {
    if (box.corner) {
      return <div className="corner">{box.q}</div>;
    }
  }

  //function only displays box with content dependant on boolean box.black
  function displayBox() {
    if (box.black) {
      return <div className="black-box"></div>;
    } else {
      return (
        <div
          className="white-box"
          style={
            correct ? { backgroundColor: "beige", pointerEvents: "none" } : null
          }
          onClick={() => clickBox(box)}
        >
          {displayCorner()}
          <input
            className="box-input"
            type="text"
            value={text}
            maxLength={1}
            onChange={(e) => setText(e.target.value)}
            onDoubleClickCapture={() => doubleClick()}
          />
        </div>
      );
    }
  }

  //check user's input text whenever the text changes
  useEffect(() => {
    let input = text.toLocaleLowerCase();
    if (box.char === input) {
      setCorrect(true);
    }
  }, [text, box.char]);

  function doubleClick() {
    setText(box.char);
    setCorrect(true);
  }

  return <div className="Box">{displayBox()}</div>;
}
