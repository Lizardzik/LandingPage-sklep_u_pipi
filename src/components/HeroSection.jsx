import "../components/css/HeroSection.css";

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
              <span className="logo-icon">🛒</span>
            </div>
            <span className="brand-text">Sklep U Pipi</span>
          </div>

          <div className="nav-links">
            <a href="#hero" className="nav-link">
              Strona Główna
            </a>
            <a href="#assortment" className="nav-link">
              Asortyment
            </a>
            <a href="#hours" className="nav-link">
              Godziny
            </a>
            <a href="#promotions" className="nav-link">
              Promocje
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

          <div className="scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
