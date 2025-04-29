import React, { useState, useEffect, useRef } from 'react';
import '../styles/fish.css';

const Fishbowl = () => {
  const [rotation, setRotation] = useState(0);
  const fishRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const fishbowl = document.querySelector('.fishbowl');
      const fishbowlRect = fishbowl.getBoundingClientRect();
      const fishbowlCenterX = fishbowlRect.left + fishbowlRect.width / 2;
      const fishbowlCenterY = fishbowlRect.top + fishbowlRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      //center 
      let distanceY = mouseY - fishbowlCenterY;
      const totalDistance = fishbowlRect.height / 2;
      //flip 
      if (mouseX <= fishbowlCenterX) {
        setIsFlipped(true);
        distanceY = - distanceY;
      } else {
        setIsFlipped(false);
      }
      //angle rotation
      const rotationRadians = Math.asin(distanceY / totalDistance);
      let rotationDegrees = rotationRadians * (180 / Math.PI);


      setRotation(rotationDegrees);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fishbowl-container">
      <div className="fishbowl">
        <div className="fish">
          <img
            ref={fishRef} src="images/fish.png" alt="Goldfish"
            style={{
              transform: `rotate(${rotation}deg) ${isFlipped ? 'scaleX(1)' : 'scaleX(-1)'}`,
              transition: 'transform 3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Fishbowl;
