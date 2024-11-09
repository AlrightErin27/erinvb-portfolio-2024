import "./TEMP.css";

export default function TEMP({ setIsModalOpen }) {
  return (
    <div className="TEMP">
      <div className="temp-btn-cont">
        <button className="temp-btn" onClick={() => setIsModalOpen(false)}>
          x
        </button>
      </div>
      <h1>FORECAST Project Under Construction 🛠️</h1>
      <h3>Anticipated Completion: End of November 2024</h3>
      <p>
        This project is an interactive weather visualization platform. It uses
        React.js alongside the <strong>OpenWeather API</strong> for real-time
        weather updates and <strong>react-globe.gl</strong> with
        <strong>Three.js</strong> for a 3D globe experience. Future plans
        include <strong>TensorFlow.js</strong> integration, allowing the app to
        predict weather trends and provide command suggestions.
      </p>
      <p>
        Stay tuned for updates as we complete the core features and move towards
        AI-driven insights!
      </p>
    </div>
  );
}
