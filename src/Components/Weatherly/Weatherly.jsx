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

Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ION_ACCESS_TOKEN;

export default function Weatherly() {
  const viewerRef = useRef(null);

  useEffect(() => {
    let viewer = null;

    const setupViewer = async () => {
      if (viewerRef.current && viewerRef.current.cesiumElement) {
        viewer = viewerRef.current.cesiumElement;

        try {
          // Create and add imagery layer
          const imageryProvider = await IonImageryProvider.fromAssetId(2);
          const imageryLayer = new ImageryLayer(imageryProvider);
          viewer.scene.imageryLayers.add(imageryLayer);

          // Set fixed camera position
          const centerLon = -97.5; // Center of continental US
          const centerLat = 37.5;
          const height = 2900000; // Lower this value for closer zoom

          // Set the initial view
          viewer.camera.setView({
            destination: Cartesian3.fromDegrees(centerLon, centerLat, height),
            orientation: {
              heading: 0.0,
              pitch: -CesiumMath.PI_OVER_TWO,
              roll: 0.0,
            },
          });

          // Set camera constraints
          viewer.scene.screenSpaceCameraController.enableZoom = true;
          viewer.scene.screenSpaceCameraController.enableTilt = false;
          viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50000;
          viewer.scene.screenSpaceCameraController.maximumZoomDistance = 1000000;

          // Force an immediate render
          viewer.scene.requestRender();
        } catch (error) {
          console.error("Error setting up viewer:", error);
        }
      }
    };

    // Run setup with a small delay to ensure viewer is fully initialized
    setTimeout(setupViewer, 100);

    // Cleanup
    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.scene.imageryLayers.removeAll();
      }
    };
  }, []);

  return (
    <div className="weatherly">
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
          <Entity
            name="New York City"
            position={Cartesian3.fromDegrees(-74.006, 40.7128, 2000)}
            point={{ pixelSize: 10, color: Color.RED }}
            description="This is New York City"
          />
        </Viewer>
      </div>
      <Terminal />
    </div>
  );
}
