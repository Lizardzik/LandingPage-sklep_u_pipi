import React from "react";
import HeroSection from "./components/HeroSection";
import Assortment from "./components/Assortment";
import Gallery from "./components/Gallery";
import HoursSection from "./components/HoursSection";
import Promotions from "./components/Promotions";
import Reviews from "./components/Reviews";
import "./App.css";

function App() {
  return (
    <div className="App">
      <HeroSection />
      <Assortment />
      <Gallery />
      <HoursSection />
      <Promotions />
      <Reviews />
    </div>
  );
}

export default App;
