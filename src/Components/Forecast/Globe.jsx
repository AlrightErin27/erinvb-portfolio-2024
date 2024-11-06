import { useEffect, useState, useRef } from "react";
import ReactGlobe from "react-globe.gl";
import * as THREE from "three";

export default function Globe({ locations, focusLat, focusLon }) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const globeRef = useRef();

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle camera animation when focusLat/focusLon change
  useEffect(() => {
    if (globeRef.current && (focusLat !== 0 || focusLon !== 0)) {
      const controls = globeRef.current.controls();

      globeRef.current.pointOfView(
        {
          lat: focusLat,
          lng: focusLon,
          altitude: 1.5,
        },
        1000
      ); // 1000ms animation duration
    }
  }, [focusLat, focusLon]);

  const getGlobeDimensions = () => {
    if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      return {
        width: Math.max(dimensions.width, dimensions.height),
        height: dimensions.height * 0.9,
      };
    }
    return {
      width: dimensions.width,
      height: dimensions.height * 0.9,
    };
  };

  const { width, height } = getGlobeDimensions();

  return (
    <div className="globe-cont">
      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        width={width}
        height={height}
        pointsData={locations}
        pointAltitude={0.01}
        pointRadius={1.5}
        pointColor={() => "#2b7ee3"}
        pointResolution={3}
        pointsMerge={false}
        pointsTransitionDuration={1000}
        atmosphereColor="#2b7ee3"
        atmosphereAltitude={0.1}
        cameraDistanceRadiusScale={0.6}
        // Glow effect for points
        customLayerData={locations}
        customThreeObject={() => {
          // Create a glowing sphere
          const geometry = new THREE.SphereGeometry(3.5, 42, 42);
          const material = new THREE.MeshBasicMaterial({
            color: "#2b7ee3",
            transparent: true,
            opacity: 1,
          });
          const mesh = new THREE.Mesh(geometry, material);

          // Add glow effect
          const glowGeometry = new THREE.SphereGeometry(4, 42, 42);
          const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: `
              varying vec3 vNormal;
              void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec3 vNormal;
              void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                gl_FragColor = vec4(0.173, 0.494, 0.890, intensity);
              }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
          });

          const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
          mesh.add(glowMesh);

          return mesh;
        }}
        customThreeObjectUpdate={(mesh, { lat, lng }) => {
          // Convert lat/lng to 3D position
          const phi = ((90 - lat) * Math.PI) / 180;
          const theta = ((180 - lng) * Math.PI) / 180;
          const r = 1.02; // Slightly above globe surface

          mesh.position.x = r * Math.sin(phi) * Math.cos(theta);
          mesh.position.y = r * Math.cos(phi);
          mesh.position.z = r * Math.sin(phi) * Math.sin(theta);
        }}
      />
    </div>
  );
}
