import React, { useState, useEffect, useRef } from "react";
import "../components/css/Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const cached = sessionStorage.getItem("gallery_images");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setImages(parsed);
            setLoading(false);
            return;
          }
        } catch {}
      }

      try {
        setLoading(true);
        const response = await fetch("/api/gallery");
        const text = await response.text();

        const rows = text.split(/\r?\n/).slice(1);

        const parsedImages = rows
          .filter((row) => row.trim() !== "")
          .map((row) => {
            const cols = row.split(",");
            let link = (cols[1] || cols[0] || "").trim();
            if (
              link.includes("lh3.googleusercontent.com") &&
              !link.includes("=")
            ) {
              link = `${link}=s1600`;
            }
            return link;
          })
          .filter((link) => link.startsWith("http"));

        if (parsedImages.length > 0) {
          setImages(parsedImages);
          sessionStorage.setItem(
            "gallery_images",
            JSON.stringify(parsedImages),
          );
        }
      } catch (err) {
        console.error("Błąd ładowania galerii:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const length = images.length;
  useEffect(() => {
    if (length > 1) {
      const nextIdx = (currentIndex + 1) % length;
      const prevIdx = currentIndex === 0 ? length - 1 : currentIndex - 1;

      const imgNext = new Image();
      imgNext.referrerPolicy = "no-referrer";
      imgNext.src = images[nextIdx];

      const imgPrev = new Image();
      imgPrev.referrerPolicy = "no-referrer";
      imgPrev.src = images[prevIdx];
    }
  }, [currentIndex, length, images]);

  useEffect(() => {
    if (length <= 1) return;

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }, 5000);

    return () => resetTimeout();
  }, [currentIndex, length]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToSlide = (index) => setCurrentIndex(index);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const openImage = (imgSrc) => {
    setSelectedImage(imgSrc);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  if (loading && images.length === 0) {
    return (
      <section
        className="gallery-section common-section-padding"
        id="assortment"
      >
        <h2 className="common-section-title">Nasz asortyment</h2>
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "rgba(43, 28, 26, 0.7)",
          }}
        >
          Ładowanie asortymentu...
        </div>
      </section>
    );
  }

  if (images.length === 0) return null;

  return (
    <section className="gallery-section common-section-padding" id="assortment">
      <h2 className="common-section-title">Nasz asortyment</h2>

      <div className="gallery-container">
        <button
          className="arrow left-arrow"
          onClick={prevSlide}
          aria-label="Poprzednie zdjęcie"
        >
          &#10094;
        </button>

        <div className="slide-wrapper">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Zdjęcie asortymentu ${currentIndex + 1}`}
            title="Kliknij, aby powiększyć"
            className="slide-image active"
            referrerPolicy="no-referrer"
            onClick={() => openImage(images[currentIndex])}
          />
        </div>

        <button
          className="arrow right-arrow"
          onClick={nextSlide}
          aria-label="Następne zdjęcie"
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
          <button
            className="lightbox-close-btn"
            onClick={closeImage}
            aria-label="Zamknij"
          >
            ✕
          </button>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Powiększone zdjęcie"
              className="lightbox-image"
              referrerPolicy="no-referrer"
            />
            <p className="lightbox-hint">Kliknij w tło, aby zamknąć</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
