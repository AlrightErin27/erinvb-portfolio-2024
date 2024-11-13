// Weatherly.jsx
import React, { useEffect, useRef } from "react";
import { Ion } from "cesium";
import { Viewer, Entity } from "resium";
import { Cartesian3, Color, Math as CesiumMath } from "cesium";
import "./Weatherly.css";

// Set the Cesium Ion access token
Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ION_ACCESS_TOKEN;

export default function Weatherly() {
  const viewerRef = useRef(null);

  // Define the initial camera position and orientation
  const initialPosition = Cartesian3.fromDegrees(-100.0, 40.0, 10000000); // Adjust height for closer zoom

  useEffect(() => {
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;

      // Set initial view to Earth from the initial position and orientation
      viewer.camera.setView({
        destination: initialPosition,
        orientation: {
          heading: CesiumMath.toRadians(0.0), // Facing North
          pitch: CesiumMath.toRadians(-45.0), // Slightly angled view
          roll: 0.0,
        },
      });
    }
  }, []);

  // Example city position (New York)
  const cityPosition = Cartesian3.fromDegrees(-74.006, 40.7128, 10000);

  return (
    <div className="weatherly">
      {/* Cesium Viewer with basic settings */}
      <div className="w-globe">
        <Viewer ref={viewerRef}>
          {/* Add a sample marker (New York City) */}
          <Entity
            name="New York City"
            position={cityPosition}
            point={{ pixelSize: 10, color: Color.RED }}
            description="This is New York City"
          />
        </Viewer>
      </div>

      {/* Terminal Interface */}
      <div className="w-terminal">
        {/* Add terminal or command input elements here */}
      </div>
    </div>
  );
}
