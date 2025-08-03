import React, { useState, useEffect } from "react";
import "../components/css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(4.8);

  // Funkcja do pobierania opinii z Google API
  const fetchGoogleReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/google-reviews");
      const data = await response.json();

      setReviews(data.reviews);
      setAverageRating(data.averageRating);
      setLoading(false);
    } catch (error) {
      console.error("Błąd podczas pobierania opinii:", error);
      setReviews([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "star-filled" : "star-empty"}`}
      >
        ⭐
      </span>
    ));
  };

  const handleGoogleReviewClick = () => {
    const googleReviewUrl = "https://g.page/r/CaLR9b1QR5NmEAE/review";
    window.open(googleReviewUrl, "_blank");
  };

  if (loading) {
    return (
      <section className="reviews-section">
        <div className="reviews-container">
          <div className="reviews-loading">
            <div className="loading-spinner"></div>
            <p>Ładowanie opinii...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reviews-section common-section-padding">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="common-section-title">Opinie naszych klientów</h2>

          <div className="reviews-rating">
            <div className="rating-stars">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="rating-number">{averageRating}</span>
            <span className="rating-source">na Google</span>
          </div>

          <p className="reviews-subtitle">Opinie naszych klientów</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card common-hover-transform">
              <div className="review-header">
                <div className="review-stars">{renderStars(review.rating)}</div>
                <div className="quote-icon">💬</div>
              </div>

              <p className="review-comment">"{review.comment}"</p>

              <div className="review-footer">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">{review.avatar}</div>
                  <div className="reviewer-details">
                    <p className="reviewer-name">{review.name}</p>
                    <p className="review-date">{review.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-cta">
          <button
            className="google-reviews-btn"
            onClick={handleGoogleReviewClick}
          >
            <span className="btn-icon">🔗</span>
            Zobacz więcej opinii na Google
          </button>
          <p className="reviews-note">Twoja opinia jest ważna!</p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
