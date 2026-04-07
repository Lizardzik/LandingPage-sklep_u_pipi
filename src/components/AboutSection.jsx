import React from "react";
import "./css/AboutSection.css";

const AboutSection = () => {
  return (
    <section id="about" className="about-section common-section-padding">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="common-section-title about-title">O nas</h2>

            <p className="about-description">
              Prowadzimy lokalny sklep spożywczo-przemysłowy od 2008 roku.
              Stawiamy na wygodne i szybkie zakupy.
              <br />
              Znajdziesz u nas podstawowe artykuły spożywcze, rzeczy do domu
              oraz pamiątki i lokalne produkty.
            </p>

            <p className="about-motto">
              Naszą misją jest proste i szybkie zakupy dla mieszkańców okolicy i
              turystów. Dbamy o dobry wybór, sensowne ceny i atmosferę.
            </p>
          </div>

          <div className="about-images">
            <img
              src="/wnetrze1.webp"
              alt="widok sklepu z daleka"
              className="about-img img-main"
              loading="lazy"
            />
            <img
              src="/wnetrze2.webp"
              alt="widok loga sklepu z bliska"
              className="about-img img-secondary"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
