import React from "react";
import "./css/AboutSection.css";

const AboutSection = () => {
  return (
    <section id="about" className="about-section common-section-padding">
      <div className="about-container">
        <h2 className="common-section-title about-title">O nas</h2>

        <p className="about-description">
          Prowadzimy lokalny sklep spożywczo-przemysłowy wraz z innymi usługami.
          Stawiamy na wygodne zakupy blisko domu, świeże produkty i przyjazną
          obsługę. Znajdziesz u nas podstawowe artykuły spożywcze, rzeczy do
          domu i codzienne drobiazgi.
        </p>

        <p className="about-motto">
          Naszą misją jest proste i szybkie zakupy dla mieszkańców okolicy.
          Dbamy o dobry wybór, sensowne ceny i atmosferę, dzięki której wraca
          się do nas chętnie.
        </p>

        <div className="seo-keywords" style={{ display: "none" }}>
          sklep spożywczy Gróń, sklep przemysłowy Gróń, lokalny sklep Gróń,
          artykuły spożywcze Gróń, zakupy w Groniu
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
