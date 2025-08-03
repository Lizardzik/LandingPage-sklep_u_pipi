import React from "react";
import "../components/css/Occasions.css";

import img1 from "../Pictures/Occasions/okazja1.png";
import img2 from "../Pictures/Occasions/okazja2.png";
import img3 from "../Pictures/Occasions/okazja3.png";

const Occasions = () => {
  const okazje = [
    {
      title: "Piwo trybunał 0% but.",
      price: "3.49 zł",
      category: "Alkohol",
      img: img1,
    },
    {
      title: "Wafel princess longa",
      price: "2.49 zł",
      category: "Słodycze",
      img: img2,
    },
    {
      title: "Ciastka dessimo rurki",
      price: "3.99 zł",
      category: "Słodycze",
      img: img3,
    },
  ];

  return (
    <section
      className="occasions-section common-section-padding"
      id="occasions"
    >
      <h2 className="common-section-title">Okazje cenowe</h2>
      <p className="occasions-subtitle">Produkty, które polecamy</p>

      <div className="occasions-grid">
        {okazje.map((item, index) => (
          <div key={index} className="occasion-card">
            <img src={item.img} alt={item.title} className="occasion-image" />
            <div className="occasion-content">
              <h3 className="occasion-title">{item.title}</h3>
              <p className="occasion-price">{item.price}</p>
              <span className="occasion-category">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Occasions;
