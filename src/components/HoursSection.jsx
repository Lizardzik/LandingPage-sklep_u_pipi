import React from "react";
import { Clock, Info } from "lucide-react";
import "../components/css/HoursSection.css";

const HoursSection = () => {
  const hours = [
    { day: "Poniedziałek", time: "8:00 - 21:00" },
    { day: "Wtorek", time: "8:00 - 21:00" },
    { day: "Środa", time: "8:00 - 21:00" },
    { day: "Czwartek", time: "8:00 - 21:00" },
    { day: "Piątek", time: "8:00 - 21:00" },
    { day: "Sobota", time: "8:00 - 21:00" },
    { day: "Niedziela", time: "15:00 - 19:00" },
  ];

  const getCurrentDay = () => {
    const days = [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
    ];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();

  return (
    <section id="hours" className="hours-section">
      <div className="hours-container">
        <div className="hours-header">
          <h2 className="hours-title">Kiedy jesteśmy otwarci?</h2>
          <p className="hours-subtitle">
            Zapraszamy codziennie przez cały tydzień
          </p>
        </div>

        <div className="hours-content">
          <div className="hours-card">
            <div className="hours-card-header">
              <Clock className="hours-icon" />
              <h3 className="hours-card-title">Godziny Otwarcia</h3>
            </div>

            <div className="hours-list">
              {hours.map((item, index) => (
                <div
                  key={index}
                  className={`hours-item ${
                    item.day === currentDay ? "hours-item-current" : ""
                  }`}
                >
                  <span
                    className={`hours-day ${
                      item.day === currentDay ? "hours-day-current" : ""
                    }`}
                  >
                    {item.day}
                    {item.day === currentDay && (
                      <span className="hours-badge">Dziś</span>
                    )}
                  </span>
                  <span className="hours-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hours-info">
            <div className="hours-info-content">
              <Info className="hours-info-icon" />
              <div className="hours-info-text">
                <h4 className="hours-info-title">Informacje dodatkowe</h4>
                <p className="hours-info-description">
                  W okresie świątecznym godziny otwarcia mogą ulec zmianie.
                  Aktualne informacje zawsze dostępne w sklepie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoursSection;
