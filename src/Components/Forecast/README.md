# Weather Globe Project Continuation Guide

## ⚠️ IMPORTANT DEVELOPMENT APPROACH ⚠️

TAKE EACH STEP SLOWLY AND DELIBERATELY:

1. Discuss and plan before any implementation
2. Never code ahead
3. Test each small change
4. Only move forward when current step is perfect
5. No assumptions about next steps
6. Wait for user confirmation before proceeding

## Current Project State

### Active Files

1. Forecast.jsx (Parent Component)

```javascript
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
```

2. Globe.jsx

```javascript
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
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        width={width}
        height={height}
        cameraDistanceRadiusScale={0.6}
      />
    </div>
  );
}
```

3. Forecast.css

```css
:root {
  --blue-space: #000011;
  --polar-white: #f2f3f5;
  --sahara-sand: #f4dcb9;
  --reef-blue: #2b7ee3;
  --egyptian-cream: #ebcc9d;
  --french-oak: #668636;
}

@import url("https://fonts.googleapis.com/css2?family=Cutive&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Space+Mono&display=swap");

.forecast-cont {
  position: relative;
  height: 92.5vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--blue-space);
  font-family: "Cutive", serif;
}

.globe-cont {
  width: 100%;
}

.terminal-cont {
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 700px;
  height: 300px;
  background: rgba(43, 126, 227, 0.1); /* More transparent */
  backdrop-filter: blur(10px); /* Glass effect */
  border: 1px solid rgba(242, 243, 245, 0.2);
  border-radius: 15px;
  padding: 25px;
  color: var(--polar-white);
  font-family: "Space Mono", monospace;
  box-shadow: 0 0 30px rgba(43, 126, 227, 0.2), inset 0 0 20px rgba(242, 243, 245, 0.1);
  z-index: 1000;
}

.terminal-cont::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(242, 243, 245, 0.1), transparent);
  border-radius: 15px 15px 0 0;
}

/* Control buttons at top */
.terminal-cont::after {
  /* content: "● ● ●"; */
  position: absolute;
  top: 15px;
  left: 20px;
  color: var(--polar-white);
  opacity: 0.5;
  letter-spacing: 2px;
}

/* iPad and Nest Hub */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .globe-cont {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .terminal-cont {
    width: 60vw;
    height: 250px;
    bottom: 30px;
    right: 50%;
    transform: translateX(50%);
  }
}

/* Smaller tablets */
@media screen and (max-width: 767px) {
  .terminal-cont {
    width: 85vw;
    height: 200px;
    bottom: 20px;
    right: 50%;
    transform: translateX(50%);
  }
}

/* Small phones */
@media screen and (max-width: 380px) {
  .terminal-cont {
    height: 150px;
    bottom: 10px;
  }
}
```

### Current Dependencies

```json
{
  "react-globe.gl": "^2.27.1",
  "three": "^0.158.0"
}
```

### Completed Features

✅ Basic project structure
✅ Responsive globe display
✅ Basic terminal positioning
✅ Initial color scheme
✅ Responsive layout across devices

### Current Focus

Working on terminal styling and theme selection. Last discussion was about implementing a glass-effect theme for the terminal.

## Next Steps (DO NOT IMPLEMENT WITHOUT USER CONFIRMATION)

1. Terminal Styling

   - Finalize theme choice
   - Implement chosen design
   - Add terminal header/controls
   - Add input area styling

2. Terminal Functionality

   - Basic input handling
   - Command history display
   - Typing animations
   - Error handling

3. Location Integration

   - Location input processing
   - Geocoding integration
   - Globe animation to location
   - Error handling for invalid locations

4. Weather Integration
   - API selection and integration
   - Weather data display
   - Loading states
   - Error handling

## Technical Requirements

- All styling in Forecast.css
- No external UI libraries
- Mobile-first responsive design
- Performance optimization
- Accessible design patterns

## Development Notes

- Test each change across all screen sizes
- Maintain current responsive behavior
- Keep terminal overlay positioning
- Consider loading states
- Consider error states
- Consider user feedback

## Discussion Points for Next Session

1. Terminal theme preference
2. Terminal functionality requirements
3. Command structure design
4. Weather API selection
5. Animation preferences

## Remember

- The globe uses react-globe.gl with Three.js
- The terminal overlays the globe
- All styling is in Forecast.css
- Mobile responsiveness is critical
- Step-by-step implementation only
- No rushing or coding ahead

When continuing this project:

1. Start by reviewing this entire document
2. Confirm current state is accurate
3. Discuss next specific step
4. Plan implementation details
5. Get approval before coding
6. Test thoroughly
7. Only then move to next step
