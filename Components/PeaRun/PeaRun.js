import React, { useEffect, useState, useRef } from 'react';
import '../styles/pea-run.css';

function PeaRun() {
  const peaFrames = ['pea-run/p12.png', 'pea-run/p2.png', 'pea-run/p3.png', 'pea-run/p4.png', 'pea-run/p5.png', 'pea-run/p6.png', 'pea-run/p7.png', 'pea-run/p8.png', 'pea-run/p9.png', 'pea-run/p10.png'];
  const peaFramesJump = ['pea-run/j1.png', 'pea-run/j2.png', 'pea-run/j3.png', 'pea-run/j4.png', 'pea-run/j5.png', 'pea-run/j6.png', 'pea-run/j7.png'];
  const defaultImage = 'pea-run/j1.png';
  const [isOpen, setIsOpen] = useState(true);
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
  
  //user message close button
  const closeModal = () => {
    setIsOpen(false);
  };
  
  const { currentFrame, positionX, positionY, currentY, direction, isMoving, isSpacePressed, keysPressed } = state;
  const currentImageSrc = isSpacePressed
    ? peaFramesJump[currentFrame] || defaultImage
    : peaFrames[currentFrame] || defaultImage;

    //mobile touch 
    useEffect(() => {
      const handleGlobalTouchEnd = () => {
        setState((prev) => ({
          ...prev,
          keysPressed: {},
          isMoving: false,
          isSpacePressed: false,
        }));
      };
    
      window.addEventListener('touchend', handleGlobalTouchEnd);
      window.addEventListener('touchcancel', handleGlobalTouchEnd);
    
      return () => {
        window.removeEventListener('touchend', handleGlobalTouchEnd);
        window.removeEventListener('touchcancel', handleGlobalTouchEnd);
      };
  }, []);

  //mobile buttons
  const handleMobileKeyPress = (key) => {
    setState((prev) => ({
      ...prev,
      keysPressed: { ...prev.keysPressed, [key]: true },
      isSpacePressed: key === 'Space' ? true : prev.isSpacePressed,
    }));
  };

  //key release
  const handleMobileKeyRelease = (key) => {
    setState((prev) => {
      const updatedKeys = { ...prev.keysPressed };
      delete updatedKeys[key];
    
      // Check if no other keys are still pressed
      const noKeysPressed = Object.keys(updatedKeys).length === 0;
    
        return {
          ...prev,
          keysPressed: updatedKeys,
          isMoving: !noKeysPressed && prev.isMoving,
          isSpacePressed: noKeysPressed ? false : prev.isSpacePressed,
        };
    });
  };
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
    const screenWidth = window.innerWidth, screenHeight = window.innerHeight;
    const maxX = (screenWidth * 0.8) - characterWidth;
    const maxY = (screenHeight * 0.8) - characterHeight;

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
        container.style.width = `${window.innerWidth * 0.8}px`;
        container.style.height = `${window.innerHeight * 0.8}px`;
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
          position: 'fixed', 
          transform: `translate(${positionX}px, ${positionY}px) scaleX(${direction})`,
          zIndex: 9999, 
        }}
      />
      {isOpen && (
          <div className="faq-message-container">
            <div className="faq-message">
              <button className="faq-close-button" onClick={closeModal}>
                X
              </button>
              <video
                className="faq-instructions"
                src="videos/arrow-keys.mp4"
                autoPlay
                muted
                loop
                playsInline
              ></video>
              <p>Navigate using arrow keys and jump with the spacebar.<br></br><br></br>For the best experience, please use a desktop device.</p>
            </div>
          </div>
      )}
      {window.innerWidth <= 1000 && (
        <div className="mobile-buttons">
          <button onTouchStart={() => handleMobileKeyPress('ArrowLeft')} onTouchEnd={() => handleMobileKeyRelease('ArrowLeft')}>←</button>
          <button onTouchStart={() => handleMobileKeyPress('ArrowRight')} onTouchEnd={() => handleMobileKeyRelease('ArrowRight')}>→</button>
          <button onTouchStart={() => handleMobileKeyPress('Space')} onTouchEnd={() => handleMobileKeyRelease('Space')}>Jump</button>
        </div>
      )}
    </div>
  );
}

export default PeaRun;
