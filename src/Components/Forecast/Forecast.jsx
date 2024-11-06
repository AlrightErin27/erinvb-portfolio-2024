import { useState } from "react";
import "./Forecast.css";
import Globe from "./Globe";
import Terminal from "./Terminal";
import TEMP from "./TEMP/TEMP";

export default function Forecast() {
  const [locations, setLocations] = useState([]);

  const handleNewLocation = (lat, lon) => {
    setLocations((prev) => [
      ...prev,
      {
        lat,
        lon,
        size: 1.5,
        color: "#2b7ee3", // reef-blue from your color scheme
        glow: true,
      },
    ]);
  };

  return (
    <div className="forecast-cont">
      <TEMP />
      <Globe
        locations={locations}
        focusLat={
          locations.length > 0 ? locations[locations.length - 1].lat : 0
        }
        focusLon={
          locations.length > 0 ? locations[locations.length - 1].lon : 0
        }
      />
      <Terminal onNewLocation={handleNewLocation} />
    </div>
  );
}
