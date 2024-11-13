import React, { useEffect, useRef } from "react";
import Terminal from "./Terminal";
import { Ion } from "cesium";
import { Viewer, Entity } from "resium";
import {
  Cartesian3,
  Color,
  Math as CesiumMath,
  IonImageryProvider,
  ImageryLayer,
} from "cesium";
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

      // Add imagery layer
      const imageryLayer = ImageryLayer.fromProviderAsync(
        IonImageryProvider.fromAssetId(2)
      );
      viewer.scene.imageryLayers.add(imageryLayer);
    }
  }, [initialPosition]); // Added initialPosition to dependency array

  // Example city position (New York)
  const cityPosition = Cartesian3.fromDegrees(-74.006, 40.7128, 10000);

  return (
    <div className="weatherly">
      <div className="w-globe">
        <Viewer
          ref={viewerRef}
          terrainProvider={undefined}
          imageryProvider={false}
          baseLayerPicker={true}
          animation={false}
          timeline={false}
        >
          <Entity
            name="New York City"
            position={cityPosition}
            point={{ pixelSize: 10, color: Color.RED }}
            description="This is New York City"
          />
        </Viewer>
      </div>
      <Terminal />
    </div>
  );
}
