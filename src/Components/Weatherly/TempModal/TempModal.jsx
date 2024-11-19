import "./TempModal.css";

export default function TempModal({ handleModalClose }) {
  return (
    <div className="temp-modal">
      <div className="temp-modal-content">
        <button
          className="temp-modal-close-btn"
          onClick={() => handleModalClose()}
        >
          X
        </button>
        <h2>Weatherly - Under Construction</h2>
        <p>
          Welcome to Weatherly, an AI-enhanced weather application. This project
          is currently under construction. Once completed, you'll be able to:
        </p>
        <ul>
          <li>
            View live weather updates displayed on an interactive 3D globe.
          </li>
          <li>
            Receive personalized AI-powered clothing and activity
            recommendations.
          </li>
          <li>
            Get weather-specific considerations tailored to your location and
            time of day.
          </li>
        </ul>
        <p>
          Check back soon to explore the full features of Weatherly. Thank you
          for your patience!
        </p>
      </div>
    </div>
  );
}
