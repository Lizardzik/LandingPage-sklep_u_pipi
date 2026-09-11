import React, { useState, useEffect } from "react";
import "../components/css/ContactInfo.css";

const SHOP_LOCATION = {
  address: "Groń, ul. Kobylarzówka 74, 34-406 Groń-Leśnica",
  coordinates: "49.4227961,20.0878596",
  iframeUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.5!2d20.0878596!3d49.4227961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715fa87d688edf3:0x66934750bdf5d1a2!2sSklep+u+Pipi!5e0!3m2!1spl!2spl!4v1",
};

const fetchServicesFromAPI = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    "Bezpłatny parking przed sklepem",
    "Piwo oraz nalewki regionalne",
    "Pamiątki oraz produkty lokalne",
    "Odbiór osobisty z punktu Orlen Paczka, Allegro One",
    "Możliwość wysyłki przez Orlen Paczka",
    "Możliwość płatności kartą, BLIK-iem",
    "Sprzedaż i rejestracja kart SIM",
    "Doładowywanie kont telefonicznych",
  ];
};

const ContactInfo = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServicesFromAPI().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const openNavigation = () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      window.open(
        `https://maps.google.com/maps?daddr=${SHOP_LOCATION.coordinates}`,
        "_blank",
      );
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${SHOP_LOCATION.coordinates}`,
        "_blank",
      );
    }
  };

  return (
    <section className="contact-section common-section-padding" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="common-section-title">Tu nas znajdziesz</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            {/* Karta 1: Adres */}
            <div className="contact-card common-hover-transform">
              <div className="contact-card-content">
                <div className="contact-icon contact-icon-address">
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Nasz Adres</h3>
                  <p className="contact-address">{SHOP_LOCATION.address}</p>
                  <button
                    className="contact-btn btn-primary"
                    onClick={openNavigation}
                  >
                    Wyznacz Trasę w Google Maps
                  </button>
                </div>
              </div>
            </div>

            {/* Karta 2: Email */}
            <div className="contact-card common-hover-transform">
              <div className="contact-card-content">
                <div className="contact-icon contact-icon-mail">
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Kontakt Pocztowy</h3>
                  <a
                    href="mailto:sklepupipi@gmail.com"
                    className="contact-mail-link"
                  >
                    sklepupipi@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Karta 3: Usługi (ta sama klasa contact-card) */}
            <div className="contact-card services-card common-hover-transform">
              <h3>Dodatkowe Usługi</h3>
              {loading ? (
                <p className="services-loading">Ładowanie usług...</p>
              ) : (
                <ul className="services-list">
                  {services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Kolumna z mapą */}
          <div className="map-container">
            <div className="map-wrapper">
              <iframe
                src={SHOP_LOCATION.iframeUrl}
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa lokalizacji Sklep u Pipi w Groniu"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
