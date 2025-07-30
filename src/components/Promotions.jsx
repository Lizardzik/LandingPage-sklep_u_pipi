import React from "react";
import "../components/css/Promotions.css";

const Promotions = () => {
  const promocje = [
    {
      title: "Owoce -20%",
      description: "Sezonowe owoce w niższych cenach",
      oldPrice: "12.99 zł",
      newPrice: "10.39 zł",
      discount: "20%",
      category: "Owoce",
      isActive: true,
    },
    {
      title: "Pieczywo po 15:00",
      description: "Codziennie po 15:00 pieczywo taniej",
      oldPrice: "4.50 zł",
      newPrice: "3.15 zł",
      discount: "30%",
      category: "Pieczywo",
      isActive: true,
    },
    {
      title: "Produkty bio",
      description: "Wybrane produkty ekologiczne w promocji",
      oldPrice: "25.99 zł",
      newPrice: "22.09 zł",
      discount: "15%",
      category: "Bio",
      isActive: false,
    },
  ];

  return (
    <section className="promotions-section" id="promotions">
      <div className="promotions-container ">
        <div className="promotions-header">
          <h2 className="promotions-title">Aktualne promocje</h2>
          <p className="promotions-subtitle">
            Co jakiś czas robimy promocje na wybrane produkty
          </p>
        </div>

        <div className="promotions-grid">
          {promocje.map((promocja, index) => (
            <div key={index} className="promotion-card">
              <div className="promotion-header">
                <div className="promotion-discount">
                  <span className="discount-icon">%</span>
                  {promocja.discount}
                </div>
                <div className="promotion-category">
                  <span className="category-icon">🏷️</span>
                  {promocja.category}
                </div>
              </div>

              <h3 className="promotion-title">{promocja.title}</h3>

              <p className="promotion-description">{promocja.description}</p>

              <div className="promotion-prices">
                <span className="old-price">{promocja.oldPrice}</span>
                <span className="new-price">{promocja.newPrice}</span>
              </div>

              <div className="promotion-status">
                <span className="status-icon">📅</span>
                <span
                  className={`status-text ${
                    promocja.isActive ? "status-active" : "status-inactive"
                  }`}
                >
                  {promocja.isActive ? "Aktualne" : "Nieaktualne"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="promotions-footer">
          <p className="promotions-note">
            Promocje się zmieniają. Aktualne oferty zawsze w sklepie.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
