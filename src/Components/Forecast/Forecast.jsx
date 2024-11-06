import "./Forecast.css";

import Globe from "./Globe";
import Terminal from "./Terminal";

export default function Forecast() {
  return (
    <div className="forecast-cont">
      <Globe />
      <Terminal />
    </div>
  );
}
