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
    <header className="hero-clean" id="hero">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="nav-logo">
              <img src="/smallLogo.webp" alt="Logo" className="logo-image" />
            </div>
            <span className="brand-text">Sklep U Pipi</span>
          </div>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              className="nav-link"
            >
              Strona Główna
            </a>
            <a
              href="#assortment"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("assortment");
              }}
              className="nav-link"
            >
              Asortyment
            </a>
            <a
              href="#hours"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hours");
              }}
              className="nav-link"
            >
              Godziny
            </a>
            <a
              href="#occasions"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("occasions");
              }}
              className="nav-link"
            >
              Okazje cenowe
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="nav-link"
            >
              Kontakt
            </a>
          </div>

          <div className="mobile-menu-btn" onClick={toggleMenu}>
            <span className="hamburger">{menuOpen ? "✕" : "☰"}</span>
          </div>
        </div>
      </nav>

      <div className="hero-clean-container">
        <span className="hero-badge">Twój lokalny sklep w okolicy</span>
        <h1 className="hero-clean-title">
          Sklep Spożywczo-Przemysłowy
          <span className="hero-highlight">„U Pipi”</span>
        </h1>
        <p className="hero-clean-subtitle">
          Szybkie i tanie zakupy na co dzień. Świeże pieczywo, nabiał i artykuły
          domowe w dobrych cenach.
        </p>

        <div className="hero-clean-buttons">
          <button
            className="btn btn-red"
            onClick={() => scrollToSection("assortment")}
          >
            <span>Zobacz Asortyment</span>
            <span>→</span>
          </button>

          <button
            className="btn btn-dark"
            onClick={() => scrollToSection("hours")}
          >
            <span>Godziny Otwarcia</span>
            <span>→</span>
          </button>
        </div>

        <div className="hero-summary-strip">
          <div className="summary-item">
            <span className="summary-label">Asortyment</span>
            <span className="summary-value">
              Świeże pieczywo, nabiał i chemia domowa
            </span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-label">Płatności</span>
            <span className="summary-value">Karta, BLIK oraz gotówka</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-label">Dojazd</span>
            <span className="summary-value">
              Wygodny parking bezpośrednio pod sklepem
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
