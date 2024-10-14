import React, { useEffect, useRef, useState } from "react";
import "./CemeteryRun.css";
import ghostImage from "../../../Images/Games/CemeteryRun/ghost.png";
import headstone1 from "../../../Images/Games/CemeteryRun/headstone1.png";
import headstone2 from "../../../Images/Games/CemeteryRun/headstone2.png";
import headstone3 from "../../../Images/Games/CemeteryRun/headstone3.png";
import backgroundImage from "../../../Images/Games/CemeteryRun/background.jpg";

const Canvas = ({
  gameStarted,
  gameOver,
  setGameOver,
  setScore,
  setTimeLeft,
}) => {
  const canvasRef = useRef(null);
  const ghostRef = useRef(null);
  const headstone1Ref = useRef(null);
  const headstone2Ref = useRef(null);
  const headstone3Ref = useRef(null);
  const backgroundRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    Promise.all([
      loadImage(ghostImage),
      loadImage(headstone1),
      loadImage(headstone2),
      loadImage(headstone3),
      loadImage(backgroundImage),
    ]).then(([ghost, hs1, hs2, hs3, bg]) => {
      ghostRef.current = ghost;
      headstone1Ref.current = hs1;
      headstone2Ref.current = hs2;
      headstone3Ref.current = hs3;
      backgroundRef.current = bg;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = canvas.parentElement;
      const newWidth = container.clientWidth;
      const newHeight = newWidth / 2; // Maintain 2:1 aspect ratio
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let ghostY = canvasSize.height * 0.75;
    let jumping = false;
    let obstacles = [];
    let speed = (canvasSize.width / 200) * 0.6; // Reduced speed by 40%
    let frameCount = 0;
    let backgroundX = 0;
    let hoverOffset = 0;
    let hoverDirection = 1;

    const scaleFactor = canvasSize.width / 800;

    const ghost = {
      x: canvasSize.width * 0.1,
      y: ghostY,
      width: 50 * scaleFactor,
      height: 50 * scaleFactor,
      jump() {
        if (!jumping) {
          jumping = true;
          let jumpHeight = 0;
          const jumpInterval = setInterval(() => {
            if (jumpHeight < 90 * scaleFactor && jumping) {
              ghostY -= 4 * scaleFactor;
              jumpHeight += 4 * scaleFactor;
            } else {
              clearInterval(jumpInterval);
              jumping = false;
              const fallInterval = setInterval(() => {
                if (ghostY < canvasSize.height * 0.75) {
                  ghostY += 3 * scaleFactor;
                } else {
                  clearInterval(fallInterval);
                }
              }, 20);
            }
          }, 20);
        }
      },
    };

    const createObstacle = () => {
      const headstones = [
        headstone1Ref.current,
        headstone2Ref.current,
        headstone3Ref.current,
      ];
      const selectedHeadstone =
        headstones[Math.floor(Math.random() * headstones.length)];
      const sizeVariation = Math.random() * 0.4 + 0.8;
      const width = 40 * scaleFactor * sizeVariation;
      const height = 60 * scaleFactor * sizeVariation;
      return {
        x: canvasSize.width,
        y: canvasSize.height * 0.9 - height,
        width: width,
        height: height,
        image: selectedHeadstone,
      };
    };

    const drawBackground = () => {
      if (backgroundRef.current) {
        const bgWidth = backgroundRef.current.width;
        const bgHeight = backgroundRef.current.height;
        const canvasAspectRatio = canvasSize.width / canvasSize.height;
        const bgAspectRatio = bgWidth / bgHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspectRatio > bgAspectRatio) {
          drawWidth = canvasSize.width;
          drawHeight = drawWidth / bgAspectRatio;
          offsetX = 0;
          offsetY = (canvasSize.height - drawHeight) / 2;
        } else {
          drawHeight = canvasSize.height;
          drawWidth = drawHeight * bgAspectRatio;
          offsetX = (canvasSize.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(
          backgroundRef.current,
          backgroundX + offsetX,
          offsetY,
          drawWidth,
          drawHeight
        );
        ctx.drawImage(
          backgroundRef.current,
          backgroundX + offsetX + drawWidth,
          offsetY,
          drawWidth,
          drawHeight
        );

        if (gameStarted && !gameOver) {
          backgroundX -= speed * 0.5;

          if (backgroundX <= -drawWidth) {
            backgroundX = 0;
          }
        }
      } else {
        ctx.fillStyle = "#1a0f26";
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
      }

      ctx.fillStyle = "#4a0e4e";
      ctx.fillRect(
        0,
        canvasSize.height * 0.9,
        canvasSize.width,
        canvasSize.height * 0.1
      );
    };

    const drawGhost = () => {
      if (ghostRef.current) {
        if (!gameStarted) {
          hoverOffset += 0.05 * hoverDirection;
          if (Math.abs(hoverOffset) > 10) {
            hoverDirection *= -1;
          }
          ctx.drawImage(
            ghostRef.current,
            ghost.x,
            ghostY + hoverOffset,
            ghost.width,
            ghost.height
          );
        } else {
          ctx.drawImage(
            ghostRef.current,
            ghost.x,
            ghostY,
            ghost.width,
            ghost.height
          );
        }
      }
    };

    const drawObstacles = () => {
      obstacles.forEach((obstacle) => {
        if (obstacle.image) {
          ctx.drawImage(
            obstacle.image,
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
          );
        }
      });
    };

    const updateGame = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      drawBackground();
      drawGhost();

      if (gameStarted && !gameOver) {
        drawObstacles();
        obstacles.forEach((obstacle) => {
          obstacle.x -= speed;
        });

        if (
          frameCount % Math.max(180 - Math.floor(frameCount / 500), 90) ===
          0
        ) {
          obstacles.push(createObstacle());
        }

        obstacles = obstacles.filter(
          (obstacle) => obstacle.x > -obstacle.width
        );

        const collision = obstacles.some(
          (obstacle) =>
            ghost.x < obstacle.x + obstacle.width &&
            ghost.x + ghost.width > obstacle.x &&
            ghostY + ghost.height > obstacle.y
        );

        if (collision) {
          setGameOver(true);
        }

        frameCount++;
        setScore(Math.floor(frameCount / 10));

        if (frameCount % 1000 === 0) {
          speed += 0.3 * scaleFactor;
        }
      }

      animationFrameId = requestAnimationFrame(updateGame);
    };

    const handleKeyDown = (e) => {
      if (e.code === "Space" && gameStarted && !gameOver) {
        e.preventDefault();
        ghost.jump();
      }
    };

    const handleTouch = (e) => {
      if (gameStarted && !gameOver) {
        e.preventDefault();
        ghost.jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("touchstart", handleTouch);
    updateGame();

    let timerInterval;
    if (gameStarted && !gameOver) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            setGameOver(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("touchstart", handleTouch);
      cancelAnimationFrame(animationFrameId);
      clearInterval(timerInterval);
    };
  }, [gameStarted, gameOver, canvasSize, setGameOver, setScore, setTimeLeft]);

  return (
    <div className="cr-game-canvas-container">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="cr-game-canvas"
      />
    </div>
  );
};

export default Canvas;
