import React from "react";
import "./ShowModal.css";

export default function TopScoresModal({ setShowTopScores }) {
  // Dummy data for top 5 scores
  const topScores = [
    { username: "Honey", score: 923586 },
    { username: "Romeo", score: 785432 },
    { username: "Maggie", score: 654321 },
    { username: "Jacob", score: 543210 },
    { username: "Erin", score: 432109 },
  ];

  return (
    <div className="n-show-modal">
      <h3>Top Scores</h3>
      <div className="n-top-scores-list-container">
        <ol className="n-top-scores-list">
          {topScores.map((score, index) => (
            <li key={index}>
              {score.username}: {score.score.toLocaleString()}
            </li>
          ))}
        </ol>
      </div>
      <button className="n-close-modal" onClick={() => setShowTopScores(false)}>
        Close
      </button>
    </div>
  );
}
