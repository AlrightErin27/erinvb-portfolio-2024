import { useEffect, useState } from "react";
import axios from "axios";
import "./ShowModal.css";

export default function TopScoresModal({ setShowTopScores }) {
  const [topScores, setTopScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/numerix/top-scores`
        );
        setTopScores(response.data);
      } catch (error) {
        console.error("Error fetching top scores:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchTopScores();
  }, []);

  return (
    <div className="n-show-modal">
      <h3>Top Scores</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="n-top-scores-list-container">
          <ol className="n-top-scores-list">
            {topScores.map((score, index) => (
              <li key={index}>
                {score.numerixUsername}: {score.numerixScore.toLocaleString()}
              </li>
            ))}
          </ol>
        </div>
      )}
      <button className="n-close-modal" onClick={() => setShowTopScores(false)}>
        Close
      </button>
    </div>
  );
}
