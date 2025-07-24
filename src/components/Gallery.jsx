import React, { useState, useEffect, useRef } from "react";
import "./Gallery.css";

import slajd1 from "../Pictures/slajd1.jpg";
import slajd2 from "../Pictures/slajd2.jpg";
import slajd3 from "../Pictures/slajd3.jpg";
import slajd4 from "../Pictures/slajd4.jpg";
import slajd5 from "../Pictures/slajd5.jpg";
import slajd6 from "../Pictures/slajd6.jpg";
import slajd7 from "../Pictures/slajd7.jpg";
import slajd8 from "../Pictures/slajd8.jpg";
import slajd9 from "../Pictures/slajd9.jpg";
import slajd10 from "../Pictures/slajd10.jpg";
import slajd11 from "../Pictures/slajd11.jpg";
import slajd12 from "../Pictures/slajd12.jpg";
import slajd13 from "../Pictures/slajd13.jpg";
import slajd14 from "../Pictures/slajd14.jpg";
import slajd15 from "../Pictures/slajd15.jpg";
import slajd16 from "../Pictures/slajd16.jpg";
import slajd17 from "../Pictures/slajd17.jpg";

const images = [
  slajd1,
  slajd2,
  slajd3,
  slajd4,
  slajd5,
  slajd6,
  slajd7,
  slajd8,
  slajd9,
  slajd10,
  slajd11,
  slajd12,
  slajd13,
  slajd14,
  slajd15,
  slajd16,
  slajd17,
];

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
      prevIndex === 0 ? length - 1 : prevIndex - 1
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
    <section className="gallery-section">
      <h2 className="gallery-title">Nasza galeria</h2>

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
