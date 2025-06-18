import { useState, useRef, useEffect } from 'react';

const ZoomableGalleryModal = ({ showGallery, setShowGallery, selectedImage }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Reset zoom when modal opens/closes
  useEffect(() => {
    if (showGallery) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [showGallery]);

  // Get touch distance for pinch zoom
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(Math.max(scale + delta, 0.5), 5);
    setScale(newScale);
  };

  // Handle mouse events
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom start
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan start
      setIsDragging(true);
      setLastPanPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      // Pinch zoom
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0) {
        const scaleChange = distance / lastTouchDistance;
        const newScale = Math.min(Math.max(scale * scaleChange, 0.5), 5);
        setScale(newScale);
      }
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Pan
      const deltaX = e.touches[0].clientX - lastPanPoint.x;
      const deltaY = e.touches[0].clientY - lastPanPoint.y;
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastPanPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsDragging(false);
      setLastTouchDistance(0);
    }
  };

  // Handle double tap/click to zoom
  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Close modal when clicking outside image
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowGallery(false);
    }
  };

  if (!showGallery) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 1050,
        cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
      }}
      onClick={handleBackdropClick}
      ref={containerRef}
    >
      {/* Close button */}
      <button
        type="button"
        className="btn-close btn-close-white position-absolute"
        style={{
          top: '20px',
          right: '20px',
          zIndex: 1060,
          filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.7))',
          fontSize: '1.5rem'
        }}
        onClick={() => setShowGallery(false)}
      />

      {/* Zoom controls */}
      <div
        className="position-absolute d-flex flex-column gap-2"
        style={{
          bottom: '20px',
          right: '20px',
          zIndex: 1060
        }}
      >
        <button
          className="btn btn-light btn-sm rounded-circle"
          style={{ width: '40px', height: '40px' }}
          onClick={() => setScale(prev => Math.min(prev + 0.2, 5))}
        >
          +
        </button>
        <button
          className="btn btn-light btn-sm rounded-circle"
          style={{ width: '40px', height: '40px' }}
          onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
        >
          −
        </button>
        <button
          className="btn btn-light btn-sm"
          style={{ fontSize: '12px', padding: '5px 8px' }}
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
        >
          Reset
        </button>
      </div>

      {/* Image */}
      <img
        ref={imageRef}
        src={selectedImage}
        alt="Gallery"
        className="img-fluid user-select-none"
        style={{
          maxHeight: '90vh',
          maxWidth: '90vw',
          objectFit: 'contain',
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        draggable={false}
      />

      {/* Instructions */}
      <div
        className="position-absolute text-white text-center"
        style={{
          bottom: '20px',
          left: '20px',
          fontSize: '14px',
          opacity: 0.7
        }}
      >
        <div>Double-click or pinch to zoom</div>
        <div>Drag to pan when zoomed</div>
      </div>
    </div>
  );
};

export default ZoomableGalleryModal;