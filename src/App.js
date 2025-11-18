import React from "react";
import HeroSection from "./components/HeroSection";
import Assortment from "./components/Assortment";
import Gallery from "./components/Gallery";
import HoursSection from "./components/HoursSection";
import Occasions from "./components/Occasions";
import Reviews from "./components/Reviews";
import ContactInfo from "./components/ContactInfo";
import AboutSection from "./components/AboutSection";
import "./App.css";

function App() {
  return (
    <div className="App">
      <HeroSection />
      <AboutSection />
      <Assortment />
      <Gallery />
      <HoursSection />
      <Occasions />
      <Reviews />
      <ContactInfo />

      <footer className="app-footer">
        <div className="app-footer-content">
          © 2025 Sklep u Pipi. Wszystkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
}

export default App;
