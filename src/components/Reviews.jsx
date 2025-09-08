import React, { useState, useEffect } from "react";
import "../components/css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(4.8);
  const [hasError, setHasError] = useState(false);

  const fetchGoogleReviews = async () => {
    try {
      const response = await fetch("/api/google-reviews");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
        setReviews(data.reviews);
        setAverageRating(data.averageRating || 4.8);
        setHasError(false);
      } else {
        setReviews([]);
        setHasError(true);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania opinii:", error);
      setReviews([]);
      setHasError(true);
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

  // nic nie renderuj, jeśli błąd albo brak recenzji
  if (hasError || reviews.length === 0) {
    return null;
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
