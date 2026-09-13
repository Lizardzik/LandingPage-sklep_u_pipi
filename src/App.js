import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import Gallery from "./components/Gallery";
import HoursSection from "./components/HoursSection";
import Occasions from "./components/Occasions";
import Reviews from "./components/Reviews";
import ContactInfo from "./components/ContactInfo";
import AgeVerification from "./components/AgeVerification";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Gallery />
      <HoursSection />
      <Occasions />
      <Reviews />
      <ContactInfo />
      <AgeVerification />

      <footer className="app-footer">
        <div className="app-footer-content">
          <p className="footer-copy">
            © {new Date().getFullYear()} Sklep „U Pipi”. Wszelkie prawa
            zastrzeżone.
          </p>
          <p className="footer-author">
            Projekt i wykonanie:{" "}
            <a
              href="https://github.com/Lizardzik"
              target="_blank"
              rel="noopener noreferrer"
              className="author-link"
            >
              Rafał Jasiura
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
