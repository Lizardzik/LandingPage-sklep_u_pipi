import React from "react";
import "../components/css/Assortment.css";

const categories = [
  { icon: "🧀", name: "Nabiał", desc: "Mleko, jogurty, serki" },
  { icon: "🍖", name: "Mięso i wędliny", desc: "Szynki, kiełbasy, parówki" },
  { icon: "🥖", name: "Pieczywo", desc: "Świeże bułki, chleby" },
  { icon: "🍺", name: "Alkohole", desc: "Piwo, wino, wódka" },
  { icon: "🥤", name: "Napoje", desc: "Soki, woda, napoje gaz." },
  {
    icon: "🍬",
    name: "Słodycze i przekąski",
    desc: "Batoniki, ciastka, chipsy",
  },
  { icon: "☕", name: "Kawy i herbaty", desc: "Sypane i ekspresowe" },
  { icon: "🎁", name: "Bombonierki i upominki", desc: "Idealne na prezent" },
  { icon: "🧼", name: "Chemia domowa", desc: "Środki czystości" },
  { icon: "🧃", name: "Artykuły higieniczne", desc: "Podpaski, tampony" },
  { icon: "💊", name: "Leki OTC", desc: "Na gardło, ból głowy itd" },
  { icon: "✏️", name: "Szkoła i biuro", desc: "Zeszyty, bloki, długopisy" },
];

const Assortment = () => {
  return (
    <section
      id="assortment"
      className="assortment-section common-section-padding"
    >
      <div className="assortment-header">
        <h2 className="common-section-title">Nasz Asortyment</h2>
        <p className="assortment-subtitle">
          Oferujemy wszystko, co potrzebne w domu, od świeżych produktów
          spożywczych po artykuły przemysłowe i chemię.
        </p>
      </div>

      <div className="assortment-grid">
        {categories.map((item, index) => (
          <div
            className="assortment-card common-hover-transform"
            key={index}
            title={`Kategoria: ${item.name}. Dokładniej: ${item.desc}`}
          >
            <span className="card-icon">{item.icon}</span>
            <h3 className="card-name">{item.name}</h3>
            <p className="card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Assortment;
