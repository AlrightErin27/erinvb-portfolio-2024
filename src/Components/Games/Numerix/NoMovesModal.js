import React from "react";
import "./ShowModal.css";

export default function NoMovesModal({
  username,
  setUsername,
  scoreSaved,
  handleSaveScore,
  handleCloseGameOverModal,
}) {
  return (
    <div className="n-show-modal">
      <h3>Game Over!</h3>
      <p>Save your score with username:</p>
      {!scoreSaved ? (
        <div className="n-save-score">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => handleSaveScore()}>Save</button>
        </div>
      ) : (
        <div className="n-score-saved-message">
          <span>✔️ Score saved</span>
        </div>
      )}

      <button
        className="n-close-modal"
        onClick={() => handleCloseGameOverModal()}
      >
        Close
      </button>
    </div>
  );
}
