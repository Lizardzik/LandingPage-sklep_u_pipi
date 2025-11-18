import React, { useEffect, useState } from "react";
import { Clock, Info, ExternalLink } from "lucide-react";
import "../components/css/HoursSection.css";

const HoursSection = () => {
  const [hours, setHours] = useState([]);
  const [openStatus, setOpenStatus] = useState(null);
  const [hasError, setHasError] = useState(false);

  const getCurrentDayName = () => {
    const days = [
      "niedziela",
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
    ];
    return days[new Date().getDay()].toLowerCase();
  };

  const parseTime = (timeStr) => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return null;
  };

  const calculateOpenStatus = (allHours) => {
    if (!allHours || allHours.length === 0) return null;

    const currentDayName = getCurrentDayName();
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todayHoursLine = allHours.find(
      (line) => line.split(":")[0].trim().toLowerCase() === currentDayName
    );

    if (!todayHoursLine) {
      return false;
    }

    const timeRange = todayHoursLine
      .substring(todayHoursLine.indexOf(":") + 1)
      .trim();

    if (
      timeRange.toLowerCase().includes("zamknięte") ||
      timeRange.toLowerCase().includes("closed")
    ) {
      return false;
    }

    const timeParts = timeRange.split(/[\–-]/).map((t) => t.trim());

    if (timeParts.length === 2) {
      const [openTimeStr, closeTimeStr] = timeParts;

      const openMinutes = parseTime(openTimeStr);
      const closeMinutes = parseTime(closeTimeStr);

      if (openMinutes !== null && closeMinutes !== null) {
        if (openMinutes <= currentMinutes && currentMinutes < closeMinutes) {
          return true;
        }
      }
    }

    return false;
  };

  const fetchGoogleHours = async () => {
    try {
      const response = await fetch("/api/google-hours");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.hours) && data.hours.length > 0) {
        setHours(data.hours);
        setHasError(false);
        setOpenStatus(calculateOpenStatus(data.hours));
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

    const intervalId = setInterval(() => {
      if (hours.length > 0) {
        setOpenStatus(calculateOpenStatus(hours));
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const currentDay = getCurrentDayName();
  const googleMapsUrl = "https://g.page/r/CaLR9b1QR5NmEAE/";

  const isClosed = (timeString) => {
    return (
      timeString &&
      (timeString.toLowerCase().includes("zamknięte") ||
        timeString.toLowerCase().includes("closed"))
    );
  };

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
              {openStatus !== null && !hasError && (
                <div
                  className={`shop-status ${
                    openStatus ? "shop-open" : "shop-closed"
                  }`}
                >
                  {openStatus ? (
                    <>
                      <span className="status-dot status-open"></span>
                      OTWARTE
                    </>
                  ) : (
                    <>
                      <span className="status-dot status-closed"></span>
                      ZAMKNIĘTE
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="hours-list">
              {hasError ? (
                <p className="hours-error">
                  Ojej, mamy problem z pobraniem danych.{" "}
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                    Zobacz godziny otwarcia na Google Maps
                    <ExternalLink className="hours-link-icon" />
                  </a>
                </p>
              ) : (
                hours.map((line, index) => {
                  const [day, time] = line.split(": ");
                  const isToday = day.toLowerCase() === currentDay;
                  const isDayClosed = isClosed(time);

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
                      <span
                        className={`hours-time ${
                          isDayClosed ? "hours-closed" : ""
                        }`}
                      >
                        {isDayClosed ? "Zamknięte" : time}
                      </span>
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
