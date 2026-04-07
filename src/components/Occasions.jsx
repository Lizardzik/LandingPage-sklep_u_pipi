import React, { useState, useEffect } from "react";
import "../components/css/Occasions.css";

const Occasions = () => {
  const [okazje, setOkazje] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/occasions?t=${new Date().getTime()}`,
        );
        const text = await response.text();

        const rows = text.split(/\r?\n/).slice(1);

        const parsedData = rows
          .filter((row) => row.trim() !== "")
          .map((row) => {
            const cols = row.split(",");
            return {
              title: cols[0]?.trim(),
              price: cols[1]?.trim(),
              category: cols[2]?.trim(),
              imageUrl: cols[3]?.trim(),
            };
          })
          .filter((item) => item.title && item.price);

        setOkazje(parsedData);
      } catch (error) {
        console.error("Błąd pobierania promocji:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOccasions();
  }, []);

  useEffect(() => {
    if (okazje.length <= 3 || isModalOpen) return;

    const timer = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % okazje.length);
        setIsFading(false);
      }, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, [okazje.length, isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const visibleItems = [];
  if (okazje.length > 0) {
    const total = okazje.length;
    for (let i = 0; i < Math.min(3, total); i++) {
      visibleItems.push(okazje[(currentIndex + i) % total]);
    }
  }

  const ProductCard = ({ item }) => (
    <div className="occasion-card">
      <div className="occasion-image-wrapper">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="occasion-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x200?text=Brak+zdjęcia";
            }}
          />
        ) : (
          <div className="occasion-image-placeholder">🛍️</div>
        )}
      </div>
      <div className="occasion-content">
        <span className="occasion-category">{item.category}</span>
        <h3 className="occasion-title">{item.title}</h3>
        <p className="occasion-price">{item.price}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section
        className="occasions-section common-section-padding"
        id="occasions"
      >
        <div className="container text-center">Ładowanie promocji...</div>
      </section>
    );
  }

  return (
    <section
      className="occasions-section common-section-padding"
      id="occasions"
    >
      <div className="container">
        <h2 className="common-section-title">Okazje cenowe</h2>
        <p className="occasions-subtitle">Aktualne promocje w naszym sklepie</p>

        {okazje.length === 0 ? (
          <p className="text-center">
            Aktualnie brak specjalnych okazji. Zapraszamy wkrótce!
          </p>
        ) : (
          <>
            <div
              className={`occasions-grid ${isFading ? "grid-fade-out" : "grid-fade-in"}`}
            >
              {visibleItems.map((item, index) => (
                <ProductCard key={`carousel-${index}`} item={item} />
              ))}
            </div>

            {okazje.length > 3 && (
              <div className="occasions-actions">
                <button className="btn-see-all" onClick={openModal}>
                  Zobacz wszystkie okazje ({okazje.length})
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="occasions-modal-overlay" onClick={closeModal}>
          <div
            className="occasions-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="occasions-modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2 className="common-section-title">Wszystkie okazje</h2>
            <div className="occasions-modal-grid">
              {okazje.map((item, index) => (
                <ProductCard key={`modal-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Occasions;
