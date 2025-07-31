import React from "react";
import "../components/css/Occasions.css";

const Occasions = () => {
  const okazje = [
    { title: "Chleb żytni", price: "3.15 zł", category: "Pieczywo" },
    { title: "Truskawki świeże", price: "10.39 zł", category: "Owoce" },
    { title: "Jogurt naturalny 400g", price: "2.89 zł", category: "Nabiał" },
  ];

  return (
    <section className="occasions-section" id="occasions">
      <h2 className="occasions-title">Okazje cenowe</h2>
      <p className="occasions-subtitle">Produkty, które polecamy</p>

      <div className="occasions-grid">
        {okazje.map((item, index) => (
          <div key={index} className="occasion-card">
            <h3 className="occasion-title">{item.title}</h3>
            <p className="occasion-price">{item.price}</p>
            <span className="occasion-category">{item.category}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Occasions;
