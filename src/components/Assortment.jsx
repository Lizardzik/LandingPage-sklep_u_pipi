import React from "react";
import "./Assortment.css";

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
    <section id="assortment" className="assortment-section">
      <h2>Nasz Asortyment</h2>
      <div className="assortment-grid">
        {categories.map((item, index) => (
          <div className="assortment-card" key={index}>
            <span className="card-icon">{item.icon}</span>
            <span className="card-name">{item.name}</span>
            <span className="card-desc">{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Assortment;
