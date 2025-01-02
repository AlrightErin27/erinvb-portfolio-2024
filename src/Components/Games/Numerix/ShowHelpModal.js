import React from "react";
import "./ShowModal.css";

export default function ShowHelpModal({ setShowHelp }) {
  return (
    <div className="show-modal">
      <h3>Welcome to Numerix!</h3>
      <p>
        Numerix, also known as 2048, is a fun and addictive number puzzle game.
        Here's how to play:
      </p>
      <ul>
        <li>
          Use your arrow keys (← ↑ → ↓) to slide the tiles across the grid.
        </li>
        <li>
          When two tiles with the same number touch, they merge into one,
          doubling their value!
        </li>
        <li>
          Keep combining tiles to create bigger numbers. The ultimate goal is to
          reach 2048, but you can keep playing to go even higher!
        </li>
      </ul>
      <p>Can you master the game and achieve the highest score?</p>
      <h3>Good luck!</h3>

      <button className="close-modal" onClick={() => setShowHelp(false)}>
        Close
      </button>
    </div>
  );
}
