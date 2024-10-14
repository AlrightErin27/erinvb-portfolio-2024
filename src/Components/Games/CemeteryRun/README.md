# CemeteryRun Game

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Key Implementation Details](#key-implementation-details)
6. [Canvas API](#canvas-api)
7. [Challenges and Solutions](#challenges-and-solutions)
8. [Contributing](#contributing)
9. [License](#license)

## Medium Blog Post

[https://medium.com/@erinmontybruce/cemetery-run-canvas-react-js-game-733f5b1fd8a2](https://medium.com/@erinmontybruce/cemetery-run-canvas-react-js-game-733f5b1fd8a2)

## Overview

CemeteryRun is a web-based game I developed using React and HTML5 Canvas. It showcases the integration of modern web technologies with game development techniques to create an interactive and responsive gaming experience.

## Technologies Used

- React 17.0.2
- HTML5 Canvas
- CSS3
- JavaScript (ES6+)
- Webpack 5 (via Create React App)
- Git

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cemetery-run.git
   ```
2. Navigate to the project directory:
   ```
   cd cemetery-run
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

To run the game locally:

1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`

To build for production:

```
npm run build
```

## Key Implementation Details

### React Component Structure

I implemented the game as a single React component, utilizing hooks for state management and side effects.

```javascript
const CemeteryRun = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  // ... other state variables

  // useEffect for game loop and event listeners
  useEffect(() => {
    // ... game logic
  }, [gameStarted, gameOver, canvasSize]);

  // ... render method
};
```

### Canvas Rendering

I used the HTML5 Canvas API for rendering game graphics. The game loop is implemented using `requestAnimationFrame` for smooth animations.

```javascript
const updateGame = () => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  // Draw background
  ctx.drawImage(
    background,
    backgroundX,
    0,
    canvasSize.width,
    canvasSize.height
  );
  ctx.drawImage(
    background,
    backgroundX + canvasSize.width,
    0,
    canvasSize.width,
    canvasSize.height
  );
  // Draw game objects
  // ...

  animationFrameId = requestAnimationFrame(updateGame);
};
```

### Game Physics

I implemented basic game physics for the character's jump mechanism:

```javascript
const jump = () => {
  if (!jumping) {
    jumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      if (jumpHeight < 100 && jumping) {
        ghostY -= 5;
        jumpHeight += 5;
      } else {
        clearInterval(jumpInterval);
        jumping = false;
        // Fall logic
      }
    }, 20);
  }
};
```

### Obstacle Generation and Collision Detection

I dynamically generated and managed obstacles, with simple rectangle-based collision detection:

```javascript
const createObstacle = () => ({
  x: canvasSize.width,
  y: canvasSize.height * 0.8,
  width: 40,
  height: 60,
  image: headstones[Math.floor(Math.random() * headstones.length)],
});

// In game loop
if (Math.random() < 0.02) {
  obstacles.push(createObstacle());
}

const collision = obstacles.some(
  (obstacle) =>
    50 < obstacle.x + obstacle.width &&
    50 + 50 > obstacle.x &&
    ghostY + 50 > obstacle.y
);
```

## Canvas API

The HTML5 Canvas API is a key technology in this project, providing a drawing surface for rendering game graphics. Here's a brief overview of how I used Canvas:

- **Context**: I obtained a 2D rendering context from the canvas element:

  ```javascript
  const ctx = canvas.getContext("2d");
  ```

- **Drawing**: I used various Canvas methods for drawing, such as:

  - `drawImage()` for rendering images (background, character, obstacles)
  - `clearRect()` for clearing the canvas between frames
  - `fillRect()` for drawing solid shapes
  - `fillText()` for rendering text (score, time)

- **Animation**: The game loop continuously updates and redraws the canvas, creating the illusion of movement:
  ```javascript
  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }
  ```

Canvas provides high performance for 2D rendering, making it ideal for games like CemeteryRun.

## Challenges and Solutions

1. **Performance Optimization**: I addressed performance issues by optimizing the game loop and reducing unnecessary re-renders.
2. **Responsive Canvas**: I implemented a responsive canvas that adjusts to different screen sizes while maintaining the game's aspect ratio.
3. **Image Loading**: I ensured all game images were properly loaded before starting the game to prevent rendering issues.

## Contributing

Contributions to CemeteryRun are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request
