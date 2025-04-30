import { useState, useEffect, useRef } from "react";

function Animation() {
  const standingImage = 'me-animation/Frame 16.png';

  const meAnimations = [
    '/me-animation/Frame 15.png',
    '/me-animation/Frame 17.png',
    '/me-animation/Frame 18.png',
    '/me-animation/Frame 20.png',
  ];

  const idleAnimation = [
    '/me-animation/Frame 34.png',
    '/me-animation/Frame 35.png',
    '/me-animation/Frame 36.png',
  ];

  const [meImageIndex, setMeImageIndex] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [idleIndex, setIdleIndex] = useState(0);
  const [isStanding, setIsStanding] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const animationInterval = useRef(null);


  const currentImage = isIdle
    ? isStanding
      ? standingImage
      : idleAnimation[idleIndex % idleAnimation.length]
    : meAnimations[meImageIndex % meAnimations.length];

  useEffect(() => {
    if (!isIdle) return;

    const interval = setInterval(() => {
      setIdleIndex((prev) => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [isIdle]);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenWidth = window.innerWidth;

      setIsIdle(false);
      setIsStanding(false);



      const newMeIndex = Math.floor(scrollY / 150) % meAnimations.length;
      if (newMeIndex !== meImageIndex) setMeImageIndex(newMeIndex);

      setLastScrollY(scrollY);

      if (animationInterval.current) {
        clearTimeout(animationInterval.current);
      }

      animationInterval.current = setTimeout(() => {
        setIsIdle(true);
        setIsStanding(true);
        setTimeout(() => setIsStanding(false), 5000);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [meImageIndex]);



  return (
    <div className="walking-page">
      {isVisible && (
        <img
          className="walking-animation"
          src={currentImage}
          alt="Me Animation"
        />
      )}
    </div>
  );
}

export default Animation;
