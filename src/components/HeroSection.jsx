import "../components/css/HeroSection.css";
import { useState } from "react";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="hero-section" id="hero">
      <div className="hero-background">
        <div className="hero-pattern hero-pattern-1"></div>
        <div className="hero-pattern hero-pattern-2"></div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="nav-logo">
              <img src="/smallLogo.png" alt="Logo" className="logo-image" />
            </div>
            <span className="brand-text">Sklep U Pipi</span>
          </div>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a onClick={() => scrollToSection("hero")} className="nav-link">
              Strona Główna
            </a>
            <a
              onClick={() => scrollToSection("assortment")}
              className="nav-link"
            >
              Asortyment
            </a>
            <a onClick={() => scrollToSection("hours")} className="nav-link">
              Godziny
            </a>
            <a
              onClick={() => scrollToSection("occasions")}
              className="nav-link"
            >
              Okazje cenowe
            </a>
            <a onClick={() => scrollToSection("contact")} className="nav-link">
              Kontakt
            </a>
          </div>

          <div className="mobile-menu-btn" onClick={toggleMenu}>
            <span className="hamburger">{menuOpen ? "✕" : "☰"}</span>
          </div>
        </div>
      </nav>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Sklep U Pipi
            <span className="hero-title-motto">Szybkie i Tanie Zakupy</span>
          </h1>
          <p className="hero-subtitle">Codzienne zakupy w dobrej cenie</p>

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
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
