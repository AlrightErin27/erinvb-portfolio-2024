import "./2048.css";
import { useState } from "react";

export default function TwoZedFourEight() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  return (
    <div className="TwoZedFourEight">
      <h1 className="two048-title">2048</h1>
      <div className="two048-board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className="two048-cell">
              {cell !== 0 && cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
