import React from "react";
import HeroSection from "./components/HeroSection";
import Gallery from "./components/Gallery";
import HoursSection from "./components/HoursSection";
import Occasions from "./components/Occasions";
import Reviews from "./components/Reviews";
import ContactInfo from "./components/ContactInfo";
import AboutSection from "./components/AboutSection";
import AgeVerification from "./components/AgeVerification";
import "./App.css";

function App() {
  return (
    <div className="App">
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
          © {new Date().getFullYear()} Sklep u Pipi. Wszystkie prawa
          zastrzeżone.
        </div>
      </footer>
    </div>
  );
}

export default App;
