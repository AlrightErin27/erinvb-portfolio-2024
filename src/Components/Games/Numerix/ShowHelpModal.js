import React from "react";
import "./ShowModal.css";

export default function ShowHelpModal({ setShowHelp }) {
  return (
    <div className="n-show-modal">
      <h3>Welcome to Numerix!</h3>
      <p>
        Numerix, also known as 2048, is a fun and addictive number puzzle game.
        Here's how to play:
      </p>
      <ul>
        <li>
          Use your keyboard's arrow keys (← ↑ → ↓) to slide tiles across the
          grid. If you're on a touch screen device, tap the "touch screen"
          button to show an on-screen keypad with arrows!
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
      <p>
        When your game ends, you can save your score. Try to make it into our
        top 5 highest scores!
      </p>
      <h3>Good luck!</h3>
      <button className="n-close-modal" onClick={() => setShowHelp(false)}>
        Close
      </button>
    </div>
  );
}
