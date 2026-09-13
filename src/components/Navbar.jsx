import React, { useState, useEffect } from "react";
import "./css/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

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
    <nav className="navbar">
      <div className="nav-container">
        <div
          className="nav-brand"
          onClick={() => scrollToSection("hero")}
          style={{ cursor: "pointer" }}
        >
          <div className="nav-logo">
            <img src="/smallLogo.webp" alt="Logo" className="logo-image" />
          </div>
          <span className="brand-text">Sklep U Pipi</span>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
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

      {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
