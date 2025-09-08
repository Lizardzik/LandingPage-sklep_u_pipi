import React, { useEffect, useState } from "react";
import { Clock, Info, ExternalLink } from "lucide-react";
import "../components/css/HoursSection.css";

const HoursSection = () => {
  const [hours, setHours] = useState([]);
  const [openNow, setOpenNow] = useState(null);
  const [hasError, setHasError] = useState(false);

  const fetchGoogleHours = async () => {
    try {
      const response = await fetch("/api/google-hours");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.hours) && data.hours.length > 0) {
        setHours(data.hours);
        setOpenNow(data.openNow);
        setHasError(false);
      } else {
        setHours([]);
        setHasError(true);
      }
    } catch (error) {
      console.error("Błąd pobierania godzin:", error);
      setHours([]);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchGoogleHours();
  }, []);

  const getCurrentDay = () => {
    const days = [
      "niedziela",
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
    ];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();
  const googleMapsUrl = "https://g.page/r/CaLR9b1QR5NmEAE/";

  return (
    <section id="hours" className="hours-section common-section-padding">
      <div className="hours-container">
        <div className="hours-header">
          <h2 className="common-section-title">Kiedy jesteśmy otwarci?</h2>
          <p className="hours-subtitle">
            Zapraszamy codziennie przez cały tydzień
          </p>
        </div>

        <div className="hours-content">
          <div className="hours-card common-hover-transform">
            <div className="hours-card-header">
              <Clock className="hours-icon" />
              <h3 className="hours-card-title">Godziny Otwarcia</h3>
            </div>

            <div className="hours-list">
              {hasError ? (
                <p className="hours-error">
                  Ojej, mamy problem z pobraniem danych.{" "}
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                    Zobacz godziny otwarcia na Google Maps
                  </a>
                </p>
              ) : (
                hours.map((line, index) => {
                  const [day, time] = line.split(": ");
                  const isToday = day.toLowerCase() === currentDay;

                  return (
                    <div
                      key={index}
                      className={`hours-item ${
                        isToday ? "hours-item-current" : ""
                      }`}
                    >
                      <span
                        className={`hours-day ${
                          isToday ? "hours-day-current" : ""
                        }`}
                      >
                        {day}
                      </span>
                      <span className="hours-time">{time}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="hours-info">
            <div className="hours-info-content">
              <Info className="hours-info-icon" />
              <div className="hours-info-text">
                <h4 className="hours-info-title">Informacje dodatkowe</h4>
                <p className="hours-info-description">
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
