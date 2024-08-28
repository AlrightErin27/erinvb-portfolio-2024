import "./Box.css";

import { useState, useEffect } from "react";

export default function Box({ box, handleHL }) {
  const [text, setText] = useState("");
  const [ansCorrect, setAnsCorrect] = useState(false);

  //display corner number if it exists
  function displayCorner() {
    if (box.corner) {
      return <div className="corner">{box.q}</div>;
    }
  }

  //checks for change in input and takes it to parent function in Crossword.jsx to be set in state
  function handleChange(e) {
    setText(e);
    console.log(ansCorrect);
  }

  //function only displays box with content dependant on boolean box.black
  function displayBox() {
    if (box.black) {
      return <div className="black-box"></div>;
    } else {
      return (
        <div
          className="white-box"
          style={box.highLight === true ? { backgroundColor: "grey" } : null}
        >
          {displayCorner()}
          <input
            className="box-input"
            type="text"
            value={text}
            maxLength={1}
            onClick={() => handleHL(box)}
            onChange={(e) => handleChange(e.target.value)}
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
      // console.log("CORRECT");
      setAnsCorrect(true);
    }
  }, [text, box.char]);

  function doubleClick() {
    setText(box.char);
    // console.log("CORRECT");
    setAnsCorrect(true);
  }

  return <div className="Box">{displayBox()}</div>;
}
