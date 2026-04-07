import React, { useEffect, useState } from "react";
import { Clock, Info, ExternalLink } from "lucide-react";
import "../components/css/HoursSection.css";

const HoursSection = () => {
  const [hours, setHours] = useState([]);
  const [openStatus, setOpenStatus] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

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
    const match = timeStr.trim().match(/(\d{1,2}):(\d{2})/);
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

    const todayHoursLine = allHours.find((line) =>
      line.toLowerCase().startsWith(currentDayName),
    );

    if (!todayHoursLine) {
      return false;
    }

    const timeParts = todayHoursLine.split(":");
    if (timeParts.length < 2) return false;

    const timeRange = timeParts.slice(1).join(":").trim();

    if (
      timeRange.toLowerCase().includes("zamknięte") ||
      timeRange.toLowerCase().includes("closed")
    ) {
      return false;
    }

    const rangeLimits = timeRange.split(/[-–]/).map((t) => t.trim());

    if (rangeLimits.length === 2) {
      const openMinutes = parseTime(rangeLimits[0]);
      const closeMinutes = parseTime(rangeLimits[1]);

      if (openMinutes !== null && closeMinutes !== null) {
        return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
      }
    }

    return false;
  };

  const fetchGoogleHours = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/google-hours");

      if (!response.ok) {
        throw new Error(`Błąd sieci: ${response.status}`);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleHours();

    const intervalId = setInterval(() => {
      setHours((currentHours) => {
        if (currentHours.length > 0) {
          setOpenStatus(calculateOpenStatus(currentHours));
        }
        return currentHours;
      });
    }, 60000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {openStatus !== null && !hasError && !loading && (
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
              {loading ? (
                <div
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    color: "rgba(43, 28, 26, 0.7)",
                  }}
                >
                  Sprawdzanie godzin otwarcia...
                </div>
              ) : hasError ? (
                <p
                  className="hours-error"
                  style={{ padding: "2rem", textAlign: "center" }}
                >
                  Ojej, mamy problem z pobraniem danych. <br />
                  <br />
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#d13b1f", textDecoration: "underline" }}
                  >
                    Zobacz godziny otwarcia na Google Maps
                    <ExternalLink
                      className="hours-link-icon"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        marginLeft: "0.5rem",
                      }}
                    />
                  </a>
                </p>
              ) : (
                hours.map((line, index) => {
                  const parts = line.split(":");
                  if (parts.length < 2) return null;

                  const day = parts[0].trim();
                  const time = parts.slice(1).join(":").trim();

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
