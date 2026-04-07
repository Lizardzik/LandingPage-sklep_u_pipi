import React, { useState, useEffect } from "react";
import "./css/AgeVerification.css";

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem("ageVerified");
  });

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const handleYes = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVisible(false);
  };

  const handleNo = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isVisible) return null;

  return (
    <div className="age-modal-overlay">
      <div className="age-modal-content">
        <h2>Czy masz ukończone 18 lat?</h2>
        <p>Musisz być pełnoletni, aby wejść na tę stronę.</p>
        <div className="age-modal-buttons">
          <button onClick={handleYes} className="age-btn age-btn-primary">
            Tak
          </button>
          <button onClick={handleNo} className="age-btn age-btn-outline">
            Nie
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
