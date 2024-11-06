import { useEffect, useState } from "react";
import ReactGlobe from "react-globe.gl";

export default function Globe() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const getGlobeDimensions = () => {
    // For iPad and Nest Hub
    if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      return {
        width: Math.max(dimensions.width, dimensions.height),
        height: dimensions.height * 0.9,
      };
    }
    // For all other screens
    return {
      width: dimensions.width,
      height: dimensions.height * 0.9,
    };
  };

  const { width, height } = getGlobeDimensions();

  return (
    <div className="globe-cont">
      <ReactGlobe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        width={width}
        height={height}
        cameraDistanceRadiusScale={1.2}
      />
    </div>
  );
}
