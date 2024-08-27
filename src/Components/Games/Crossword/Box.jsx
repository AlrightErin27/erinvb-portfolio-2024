import "./Box.css";

// import { useState, useEffect } from "react";

export default function Box({ box }) {
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
        <div className="white-box">
          {displayCorner()}
          {box.char}
        </div>
      );
    }
  }
  return (
    <div className="Box" onClick={() => console.log(box)}>
      {displayBox()}
    </div>
  );
}
