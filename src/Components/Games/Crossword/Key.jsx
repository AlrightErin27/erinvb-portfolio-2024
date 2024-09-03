import "./Key.css";
import { useState } from "react";
import Data from "./Data";

export default function Key({ onClose }) {
  const [summonAnswers, setSummonAnswers] = useState(false);

  function renderAnswers() {
    return (
      <div>
        {Data.map((answer) => {
          return (
            <p key={answer.num}>
              {answer.num}. {answer.a.replace(/ /g, "")} [
              {answer.dir === "vert" ? "down" : "across"}]
            </p>
          );
        })}
      </div>
    );
  }
  return (
    <div className="Key-overlay">
      <div className="Key">
        <div className="Key-content">
          <button className="Key-close" onClick={onClose}>
            X
          </button>
          <ul>
            <li>Double click square to summon letter.</li>
            <li>
              Need a slayer's assist?{" "}
              <button
                className="summon"
                onClick={() => setSummonAnswers(!summonAnswers)}
              >
                Click here
              </button>
              for all the answers, no stakes required!
            </li>
          </ul>
          {summonAnswers ? renderAnswers() : null}
        </div>
      </div>
    </div>
  );
}
