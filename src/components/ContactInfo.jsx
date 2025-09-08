import React from "react";
import "../components/css/ContactInfo.css";

const ContactInfo = () => {
  const address = "Groń, ul.Kobylarzówka 74, 34-406 Groń-Leśnica";
  const coordinates = "49.4227961,20.0878596";
  const mapsUrl =
    "https://www.google.com/maps/place/Sklep+u+Pipi/@49.4227961,20.0878596,17z";

  const openNavigation = () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.open(
        `https://maps.google.com/maps?daddr=${coordinates}`,
        "_blank"
      );
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`,
        "_blank"
      );
    }
  };

  const openGoogleMaps = () => {
    window.open(mapsUrl, "_blank");
  };

  return (
    <section className="contact-section common-section-padding" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="common-section-title">Gdzie nas można znaleźć</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card common-hover-transform">
              <div className="contact-card-content">
                <div className="contact-icon contact-icon-address">
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Nasz Adres</h3>
                  <p className="contact-address">{address}</p>
                  <div className="contact-buttons">
                    <button
                      className="contact-btn btn-primary"
                      onClick={openNavigation}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Wyznacz Trasę
                    </button>
                    <button
                      className="contact-btn btn-outline"
                      onClick={openGoogleMaps}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      Zobacz na Mapie
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card common-hover-transform">
              <div className="contact-card-content">
                <div className="contact-icon contact-icon-mail">
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Kontakt Pocztowy</h3>
                  <p className="contact-mail-info">sklepupipi@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="services-info">
              <h4>Dodatkowe Usługi</h4>
              <ul className="services-list">
                <li>Bezpłatny parking przed sklepem</li>
                <li>Piwo oraz nalewki regionalne</li>
                <li>Dostęp dla osób niepełnosprawnych</li>
                <li>Odbiór osobisty z punktu Orlen Paczka, Allegro One</li>
                <li>Możliwość wysyłki przez Orlen Paczka </li>
                <li>Płatność kartą, BLIK-iem i gotówką</li>
                <li>Sprzedaż i rejestracja kart SIM</li>
                <li>Doładowywanie kont telefonicznych</li>
              </ul>
            </div>
          </div>

          <div className="map-container">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.5!2d20.0878596!3d49.4227961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715fa87d688edf3:0x66934750bdf5d1a2!2sSklep+u+Pipi!5e0!3m2!1spl!2spl!4v1"
                width="100%"
                height="100%"
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa lokalizacji Sklep u Pipi w Groniu"
              ></iframe>
              <div className="map-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
