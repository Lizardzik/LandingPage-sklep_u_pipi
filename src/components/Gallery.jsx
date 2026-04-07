import React, { useState, useEffect, useRef } from "react";
import "../components/css/Gallery.css";

const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15];
const images = imageNumbers.map((num) => `/Gallery/slajd${num}.webp`);

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const timeoutRef = useRef(null);

  const length = images.length;

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }, 6000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, length]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const openImage = (imgSrc) => {
    setSelectedImage(imgSrc);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  return (
    <section className="gallery-section common-section-padding" id="assortment">
      <h2 className="common-section-title">Nasz asortyment</h2>

      <div className="gallery-container">
        <button
          className="arrow left-arrow"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          &#10094;
        </button>

        <div className="slide-wrapper">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide ${index + 1}`}
              title="Kliknij, aby zobaczyć pełne zdjęcie"
              loading="lazy"
              className={`slide-image ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => openImage(img)}
            />
          ))}
        </div>

        <button
          className="arrow right-arrow"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          &#10095;
        </button>
      </div>

      <div className="dots-container">
        {images.map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`dot ${dotIndex === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(dotIndex)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeImage}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeImage}>
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Powiększone zdjęcie"
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
