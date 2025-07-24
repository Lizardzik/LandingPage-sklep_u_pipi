import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-section">
      {/* Background Pattern */}
      <div className="hero-background">
        <div className="hero-pattern hero-pattern-1"></div>
        <div className="hero-pattern hero-pattern-2"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="nav-logo">
              <span className="logo-icon">🛒</span>
            </div>
            <span className="brand-text">Sklep U Pipi</span>
          </div>

          <div className="nav-links">
            <a href="#hero" className="nav-link">
              Strona Główna
            </a>
            <a href="#promotions" className="nav-link">
              Promocje
            </a>
            <a href="#assortment" className="nav-link">
              Asortyment
            </a>
            <a href="#hours" className="nav-link">
              Godziny
            </a>
            <a href="#contact" className="nav-link">
              Kontakt
            </a>
          </div>

          <div className="mobile-menu-btn">
            <span className="hamburger">☰</span>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          {/* Main Heading */}
          <h1 className="hero-title">
            Twoje Codzienne
            <span className="hero-title-accent">Zakupy Świeżości</span>
            <span className="hero-title-location">w Groniu</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Lokalny sklep, gdzie znajdziesz świeże produkty i zawsze dostaniesz
            pomoc przy wyborze
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection("assortment")}
            >
              <span className="btn-icon">🛍️</span>
              <span>Zobacz Asortyment</span>
              <span className="btn-arrow">→</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection("hours")}
            >
              <span className="btn-icon">🕒</span>
              <span>Zobacz Godziny Otwarcia</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-element floating-1"></div>
      <div className="floating-element floating-2"></div>
      <div className="floating-element floating-3"></div>
      <div className="floating-element floating-4"></div>

      {/* Temporary sections for testing scroll */}
      <div id="promotions" className="temp-section">
        <h2>Aktualne Promocje</h2>
        <p>Tu będą najnowsze promocje i oferty...</p>
      </div>

      <div id="assortment" className="temp-section">
        <h2>Nasz Asortyment</h2>
        <p>Tu będzie lista produktów...</p>
      </div>

      <div id="hours" className="temp-section">
        <h2>Sekcja Godziny</h2>
        <p>Tu będą godziny otwarcia...</p>
      </div>
    </div>
  );
};

export default HeroSection;
