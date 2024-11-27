import React, { useEffect, useRef, useState } from "react";
import Terminal from "./Terminal";
import { Ion } from "cesium";
import { Viewer, Entity } from "resium";
import * as tf from "@tensorflow/tfjs";
import TempModal from "./TempModal/TempModal";

import {
  Cartesian3,
  Color,
  Math as CesiumMath,
  IonImageryProvider,
  ImageryLayer,
  LabelStyle,
  VerticalOrigin,
  Cartesian2,
} from "cesium";
import "./Weatherly.css";

Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ION_ACCESS_TOKEN;
console.log("🐛 Cesium Token:", Ion.defaultAccessToken); // 🐛🐛🐛FIXME: Remove this after testing

export default function Weatherly() {
  const viewerRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [tempModalOpen, setTempModalOpen] = useState(true);

  const handleNewLocation = (lat, lon, cityName, countryName) => {
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;

      // Add new location to state
      setLocations((prev) => [
        ...prev,
        {
          id: Date.now(),
          lat,
          lon,
          name: cityName ? `${cityName}, ${countryName}` : "Selected Location",
        },
      ]);

      // Camera flight with adjusted height
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(lon, lat, 3500000),
        orientation: {
          heading: 0.0,
          pitch: -CesiumMath.toRadians(96),
          roll: 0.0,
        },
        duration: 2,
      });
    }
  };

  useEffect(() => {
    let viewer = null;

    const setupViewer = async () => {
      if (viewerRef.current && viewerRef.current.cesiumElement) {
        viewer = viewerRef.current.cesiumElement;

        try {
          const imageryProvider = await IonImageryProvider.fromAssetId(2);
          const imageryLayer = new ImageryLayer(imageryProvider);
          viewer.scene.imageryLayers.add(imageryLayer);

          const centerLon = -123.0868; // Longitude for Eugene, OR
          const centerLat = 44.0521; // Latitude for Eugene, OR
          const height = 2900000;

          viewer.camera.setView({
            destination: Cartesian3.fromDegrees(centerLon, centerLat, height),
            orientation: {
              heading: 0.0,
              pitch: -CesiumMath.PI_OVER_TWO,
              roll: 0.0,
            },
          });

          viewer.scene.screenSpaceCameraController.enableZoom = true;
          viewer.scene.screenSpaceCameraController.enableTilt = false;
          viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50000;
          viewer.scene.screenSpaceCameraController.maximumZoomDistance = 1000000;

          viewer.scene.requestRender();
        } catch (error) {
          console.error("Error setting up viewer:", error);
        }
      }
    };

    setTimeout(setupViewer, 100);

    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.scene.imageryLayers.removeAll();
      }
    };
  }, []);

  // Add TensorFlow test
  useEffect(() => {
    const testTensorFlow = async () => {
      try {
        const a = tf.tensor1d([1, 2, 3]);
        console.log("TensorFlow.js loaded successfully");
        console.log("Simple tensor test:", a.toString());
        a.dispose();
      } catch (error) {
        console.error("TensorFlow.js test failed:", error);
      }
    };

    testTensorFlow();
  }, []);

  function handleModalClose() {
    setTempModalOpen(false);
  }

  return (
    <div className="weatherly">
      {tempModalOpen ? <TempModal handleModalClose={handleModalClose} /> : null}
      <div className="w-globe">
        <Viewer
          ref={viewerRef}
          terrainProvider={undefined}
          baseLayerPicker={false}
          animation={false}
          timeline={false}
          homeButton={false}
          navigationHelpButton={false}
          sceneModePicker={false}
          navigationInstructionsInitiallyVisible={false}
          fullscreenButton={false}
        >
          {locations.map((location) => (
            <Entity
              key={location.id}
              position={Cartesian3.fromDegrees(location.lon, location.lat)}
              point={{
                pixelSize: 10,
                color: Color.RED,
                outlineColor: Color.WHITE,
                outlineWidth: 2,
              }}
              label={{
                text: location.name,
                font: "14pt sans-serif",
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, -10),
              }}
            />
          ))}
        </Viewer>
      </div>
      <Terminal onNewLocation={handleNewLocation} />
    </div>
  );
}
