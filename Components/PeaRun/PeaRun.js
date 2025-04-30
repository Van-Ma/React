import React, { useEffect, useState, useRef } from 'react';
import '../styles/pea-run.scss';

function PeaRun() {
  const peaFrames = ['pea-run/p12.png', 'pea-run/p2.png', 'pea-run/p3.png', 'pea-run/p4.png', 'pea-run/p5.png', 'pea-run/p6.png', 'pea-run/p7.png', 'pea-run/p8.png', 'pea-run/p9.png', 'pea-run/p10.png'];
  const peaFramesJump = ['pea-run/j1.png', 'pea-run/j2.png', 'pea-run/j3.png', 'pea-run/j4.png', 'pea-run/j5.png', 'pea-run/j6.png', 'pea-run/j7.png'];
  const defaultImage = 'pea-run/j1.png';
  const speed = 5, frameSpeed = 100, jumpHeight = 100, jumpDuration = 500;
  const animationIntervalRef = useRef(null);
  const movementIntervalRef = useRef(null);
  const containerRef = useRef(null);

  const [state, setState] = useState(() => {
    //80% of screen size
    const screenWidth = window.innerWidth * 0.8;
    const screenHeight = window.innerHeight * 0.8;

    // character size
    const characterWidth = 200;
    const characterHeight = 200;

    //initial character centered position and state
    return {
      currentFrame: 0,
      positionX: (screenWidth - characterWidth) / 2,
      positionY: (screenHeight - characterHeight) / 2,
      currentY: (screenHeight - characterHeight) / 2,
      direction: 1,
      isMoving: false,
      isSpacePressed: false,
      keysPressed: {},
    };
  });

  const { currentFrame, positionX, positionY, currentY, direction, isMoving, isSpacePressed, keysPressed } = state;
  const currentImageSrc = isSpacePressed
    ? peaFramesJump[currentFrame] || defaultImage
    : peaFrames[currentFrame] || defaultImage;

  // Handle jumping logic
  useEffect(() => {
    if (isSpacePressed) {
      const startTime = Date.now();
      const jumpInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / jumpDuration;
        setState((prev) => ({
          ...prev,
          positionY: progress <= 0.5
            ? currentY - jumpHeight * (progress * 2)
            : progress <= 1
              ? currentY - jumpHeight * (1 - (progress - 0.5) * 2)
              : currentY,
          isSpacePressed: progress > 1 ? false : prev.isSpacePressed,
        }));
        if (progress > 1) clearInterval(jumpInterval);
      }, 1000 / 60);
    }
  }, [isSpacePressed, currentY]);

  //key events 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();

      setState((prev) => ({
        ...prev,
        keysPressed: { ...prev.keysPressed, [e.code]: true },
        isSpacePressed: e.code === 'Space' && !prev.isSpacePressed ? true : prev.isSpacePressed,
        currentY: e.code === 'Space' && !prev.isSpacePressed ? prev.positionY : prev.currentY,
      }));
    };

    const handleKeyUp = (e) => {
      setState((prev) => ({
        ...prev,
        keysPressed: Object.fromEntries(Object.entries(prev.keysPressed).filter(([key]) => key !== e.code)),
        isMoving: false,
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isSpacePressed]);

  // Handle character movement
  useEffect(() => {
    const moveCharacter = () => {
      const characterWidth = 200, characterHeight = 200;
      const container = containerRef.current;
      const screenWidth = container ? container.offsetWidth : window.innerWidth * 0.8;
      const screenHeight = container ? container.offsetHeight : window.innerHeight * 0.8;
      const maxX = screenWidth - characterWidth;
      const maxY = screenHeight - characterHeight;

      setState((prev) => {
        const newPositionX = keysPressed['ArrowLeft'] ? Math.max(0, prev.positionX - speed) :
          keysPressed['ArrowRight'] ? Math.min(maxX, prev.positionX + speed) : prev.positionX;
        const newPositionY = keysPressed['ArrowUp'] ? Math.max(0, prev.positionY - speed) :
          keysPressed['ArrowDown'] ? Math.min(maxY, prev.positionY + speed) : prev.positionY;
        const newDirection = keysPressed['ArrowLeft'] ? 1 : keysPressed['ArrowRight'] ? -1 : prev.direction;
        const isMoving = Object.keys(keysPressed).some((key) => ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key));

        return { ...prev, positionX: newPositionX, positionY: newPositionY, direction: newDirection, isMoving };
      });
    };

    if (Object.keys(keysPressed).length > 0) {
      movementIntervalRef.current = setInterval(moveCharacter, 1000 / 60);
    } else {
      clearInterval(movementIntervalRef.current);
    }
    return () => clearInterval(movementIntervalRef.current);
  }, [keysPressed]);
  // Handle animation
  useEffect(() => {
    const frames = isSpacePressed ? peaFramesJump : peaFrames;
    if (isMoving || isSpacePressed) {
      animationIntervalRef.current = setInterval(() => {
        setState((prev) => ({ ...prev, currentFrame: (prev.currentFrame + 1) % frames.length }));
      }, frameSpeed);
    } else {
      clearInterval(animationIntervalRef.current);
      setState((prev) => ({ ...prev, currentFrame: 0 }));
    }

    return () => clearInterval(animationIntervalRef.current);
  }, [isMoving, isSpacePressed]);


  //keeps container 80% of window size w/ resizing 
  useEffect(() => {
    const container = containerRef.current;

    const setContainerSize = () => {
      if (container) {
        const newWidth = window.innerWidth * 0.8;
        const newHeight = window.innerHeight * 0.8;
        const characterWidth = 200;
        const characterHeight = 200;

        container.style.width = `${newWidth}px`;
        container.style.height = `${newHeight}px`;

        // Push character back inside if out of bounds
        setState((prev) => {
          const maxX = newWidth - characterWidth;
          const maxY = newHeight - characterHeight;

          return {
            ...prev,
            positionX: Math.min(prev.positionX, maxX),
            positionY: Math.min(prev.positionY, maxY),
            currentY: Math.min(prev.currentY, maxY),
          };
        });
      }
    };

    if (container) {
      Object.assign(container.style, {
        overflow: 'hidden',
        margin: 'auto',
        position: 'relative',
      });
      setContainerSize();
    }

    window.addEventListener('resize', setContainerSize);
    return () => window.removeEventListener('resize', setContainerSize);
  }, []);




  return (
    <div className="pea-background" ref={containerRef}>
      <img
        src={currentImageSrc}
        alt="Pea Animation"
        loading="lazy"
        style={{
          width: '200px',
          position: 'absolute',
          transform: `translate(${positionX}px, ${positionY}px) scaleX(${direction})`,
          zIndex: 9999,
        }}
      />
    </div>
  );
}

export default PeaRun;
