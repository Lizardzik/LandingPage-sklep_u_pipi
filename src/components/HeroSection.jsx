import "../components/css/HeroSection.css";

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="hero-clean" id="hero">
      <div className="hero-clean-container">
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
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToSection("assortment")}
          >
            <span>Zobacz Asortyment</span>
            <span>→</span>
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => scrollToSection("hours")}
          >
            <span>Godziny Otwarcia</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
