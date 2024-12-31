import { useState } from "react";
import "./Numerix.css";

export default function Numerix() {
  const [board, setBoard] = useState(Array(16).fill(null));

  return (
    <div className="numerix">
      <div className="n-title">Numerix</div>
      <div className="n-board-cont">
        <div className="n-board">
          {board.map((cell, index) => {
            return (
              <div key={index} className="n-cell">
                {cell}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
