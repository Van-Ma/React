import { useEffect, useState } from "react";

function Stars() {
  const [stars, setStars] = useState([]);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(false);
    }, 1000);

    const numStars = window.innerWidth < 768 ? 5 : 40;
    const starArray = Array.from({ length: numStars }, (_, i) => ({
      id: `star-${i}`,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 10 + 5}px`,
      animationDelay: `${Math.random() * 3}s`,
    }));

    setStars(starArray);
    clearTimeout(timeout);
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <style>{`
        .stars-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
        }
        .star {
          position: absolute;
          background: radial-gradient(circle, #BAD7E3, rgba(255, 255, 255, 0.064));
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
          animation: sparkle 1.5s infinite alternate;
          will-change: transform, opacity;
        }
        @keyframes sparkle {
          0% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
      `}</style>

      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default Stars;
