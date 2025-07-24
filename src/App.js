import React from "react";
import HeroSection from "./components/HeroSection";
import Assortment from "./components/Assortment";
import Gallery from "./components/Gallery";
import "./App.css";

function App() {
  return (
    <div className="App">
      <HeroSection />
      <Assortment />
      <Gallery />
    </div>
  );
}

export default App;
