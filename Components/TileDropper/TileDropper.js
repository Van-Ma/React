import '../styles/carousel.scss';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import deviceInfo from '../utils/Devices';
const ItemTypes = { OBJECT: 'object' };

  //assets 
  const snapObjects = [
    { id: 1, image: '/snap/1.png', alt: 'shrimp', color: '#FFD633' },
    { id: 2, image: '/snap/2.png', alt: 'watermelon', color: '#0062D1' },
    { id: 3, image: '/snap/3.png', alt: 'bug', color: '#FF8025' },
    { id: 4, image: '/snap/4.png', alt: 'tomato', color: '#66CC2F' },
    { id: 5, image: '/snap/6.png', alt: 'monstera', color: '#FFD633' },
    { id: 6, image: '/snap/7.png', alt: 'aloe', color: '#FF4433' },
    { id: 7, image: '/snap/9.png', alt: 'butterfly', color: '#FFD633' },
    { id: 8, image: '/snap/11.png', alt: 'carrot', color: '#3E0074' },
    { id: 9, image: '/snap/12.png', alt: 'toad', color: '#FF4433' },
    { id: 10, image: '/snap/13.png', alt: 'strawberry', color: '#FFD633' },
    { id: 11, image: '/snap/14.png', alt: 'watercan', color: '#FF4433' },
    { id: 12, image: '/snap/15.png', alt: 'fish', color: '#0062D1' },
    { id: 13, image: '/snap/16.png', alt: 'flower', color: '#FF4433' },
    { id: 14, image: '/snap/17.png', alt: 'cherry', color: '#FFD633' },
    { id: 15, image: '/snap/18.png', alt: 'sun', color: '#3E0074' },
    { id: 16, image: '/snap/19.png', alt: 'pot', color: '#0062D1' },
    { id: 17, image: '/snap/20.png', alt: 'star', color: '#3E0074' },
    { id: 18, image: '/snap/21.png', alt: 'cat', color: '#FF8025' },
    { id: 19, image: '/snap/22.png', alt: 'cactus', color: '#FFD633' },
    { id: 20, image: '/snap/24.png', alt: 'peapod', color: '#FF4433' },
    { id: 21, image: '/snap/28.png', alt: 'rocketship', color: '#0062D1' },
    { id: 22, image: '/snap/29.png', alt: 'caterpillar', color: '#FFD633' },
    { id: 23, image: '/snap/30.png', alt: 'dog', color: '#3E0074' },
  ];


const DraggableObject = ({ id, image, alt, color, onDragEnd, idMatch }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.OBJECT,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop && onDragEnd) {
        onDragEnd(item.id);
      }
    }
  }));

  const isActive = idMatch?.hasOwnProperty(id) ?? false;

  const filter = isActive ? "brightness(0.5)" : "none";

  return (
    <img
      ref={drag}
      src={image}
      alt={alt}
      className="snap-item"
      style={{
        pointerEvents: 'auto',
        backgroundColor: color,
        filter: filter,
      }}
    />
  );
};

//drop area inside grid
const DroppableSquare = ({ row, col, onDrop, objectId }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.OBJECT,
    drop: (item) => onDrop(row, col, item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const objData = useMemo(() => snapObjects.find((o) => o.id === objectId), [objectId]);

  return (
    <div ref={drop} className="snap-square">
      {objData && (
        <DraggableObject
          id={objData.id}
          image={objData.image}
          alt={objData.alt}
          color={objData.color}
        />
      )}
    </div>
  );
};

//drop area outside of grid
const DroppableArea = ({ onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.OBJECT,
    drop: (item) => onDrop(-1, -1, item.id), 
  }));

  return <div ref={drop} className="droppable-area" />;
};

function Carousel() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [startIndex, setStartIndex] = useState(0);
  const [smallDevice, setSmallDevice] = useState(window.innerWidth < 500);
  const carouselRef = useRef(null);
  const [positions, setPositions] = useState({});
  const [isTouchDevice, setIsTouchDevice] = useState(false);




  //grid
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const objectId = parseInt(
          Object.keys(positions).find(
            (id) => positions[id].row === row && positions[id].col === col
          )
        );
        grid.push(
          <DroppableSquare
            key={`${row}-${col}`}
            row={row}
            col={col}
            objectId={objectId || null}
            onDrop={handleDrop}
          />
        );
      }
    }
    return grid;
  };

  //object behaviors
  const handleDrop = (row, col, id) => {
    setPositions((prev) => {
      const newPositions = { ...prev };

      //remove items (drag carousel item onto occupied grid space )
      if (row === -1 && col === -1) {
        const { [id]: removedItem, ...updatedPositions } = newPositions;
        return updatedPositions;
      }

      // Find the item at the new position
      const itemAtNewPosition = Object.keys(newPositions).find(
        (key) => newPositions[key].row === row && newPositions[key].col === col
      );

      if (itemAtNewPosition) {
        // If an item already exists at the new position
        const previousPosition = newPositions[id];

        if (previousPosition) {
          // If the dropped item already had a previous position, swap the IDs
          const { [itemAtNewPosition]: removedItem, ...updatedPositions } = newPositions;

          updatedPositions[itemAtNewPosition] = previousPosition; 
          updatedPositions[id] = { row, col }; 

          return updatedPositions;
        } else {
          // default if no previous coord
          const { [itemAtNewPosition]: removedItem, ...updatedPositions } = newPositions;
          updatedPositions[id] = { row, col };

          return updatedPositions;
        }
      }

      // No item at the new position
      newPositions[id] = { row, col };
      return newPositions;
    });
  };

//carousel view 
useEffect(() => {
  const update = () => {
    setSmallDevice(window.innerWidth < 500);

    if (window.innerWidth < 600) setVisibleCount(5);
    else if (window.innerWidth < 900) setVisibleCount(5);
    else setVisibleCount(8);
  };

  window.addEventListener('resize', update);
  update();

  // Preload images with cleanup
  const preloadedImages = [];

  snapObjects.forEach((obj) => {
    const img = new Image();
    img.src = obj.image;
    preloadedImages.push(img);
  });

  return () => {
    window.removeEventListener('resize', update);
    // Clean up preloaded images
    preloadedImages.forEach(img => {
      img.src = '';
    });
  };
}, []);

  //arrow buttons
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + visibleCount < snapObjects.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  //small devices
  useEffect(() => {
    if (!smallDevice && carouselRef.current && carouselRef.current.children.length > 0) {
      const firstItem = carouselRef.current.children[0];
      const itemWidth = firstItem.getBoundingClientRect().width;
      const gap = 5; // Adjust if needed
      carouselRef.current.scrollTo({
        left: startIndex * (itemWidth + gap),
        behavior: 'smooth',
      });
    }
  }, [startIndex, smallDevice]);

  const visibleItems = useMemo(() => snapObjects.slice(startIndex, startIndex + visibleCount), [startIndex, visibleCount]);

  //devices
  useEffect(() => {
    setIsTouchDevice(deviceInfo.isMobile || deviceInfo.isTablet);
  }, []);

  const backend = isTouchDevice ? TouchBackend : HTML5Backend;

  return (
    <DndProvider className="droppable-area" backend={backend} >
      {/*drop off area */}
      <div className="droppable-area" >
        <DroppableArea onDrop={handleDrop} />
        <div className="carousel-container" >
          <button className="arrow left" onClick={handlePrev} disabled={startIndex === 0}>
            <i className="bi bi-arrow-left-square-fill"></i>
          </button>

          <div
            className="carousel-view "
          >
            {/* object carousel */}
            <div className="carousel-track" ref={carouselRef}>
              {(smallDevice ? snapObjects : visibleItems).map((obj) => (
                <DraggableObject
                  key={obj.id}
                  id={obj.id}
                  image={obj.image}
                  color={obj.color}
                  alt={obj.alt}
                  onDrop={(pos) => {
                    setPositions((prev) => ({
                      ...prev,
                      [obj.id]: pos,
                    }));
                  }}
                  idMatch={positions}
                />
              ))}
            </div>

          </div>
          {/*aroow buttons*/}
          <button
            className="arrow right"
            onClick={handleNext}
            disabled={startIndex + visibleCount >= snapObjects.length}
          >
            <i className="bi bi-arrow-right-square-fill"></i>
          </button>
        </div>

        <div className="snap-container">
          {/* The grid drop area */}
          <div className="snap-grid">{renderGrid()}</div>
        </div>
      </div>

    </DndProvider>

  );

}

export default Carousel;
