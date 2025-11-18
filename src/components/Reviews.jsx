import React, { useState, useEffect } from "react";
import "../components/css/Reviews.css";

const FullStarSVG = () => (
  <svg
    viewBox="0 0 24 24"
    className="star-svg star-filled"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.276-7.416-3.908-7.416 3.908 1.48-8.276-6.064-5.828 8.332-1.151z" />
  </svg>
);

const HalfStarSVG = () => (
  <svg
    viewBox="0 0 24 24"
    className="star-svg star-half"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
  >
    <defs>
      <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stopColor="#e8c875" />
        <stop offset="50%" stopColor="#ddd" />
      </linearGradient>
    </defs>
    <path
      d="M12 20.81l-7.416 3.908 1.48-8.276-6.064-5.828 8.332-1.151 3.668-7.568 3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.276z"
      fill="url(#half-fill)"
    />
  </svg>
);

const EmptyStarSVG = () => (
  <svg
    viewBox="0 0 24 24"
    className="star-svg star-empty"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 20.81l-7.416 3.908 1.48-8.276-6.064-5.828 8.332-1.151 3.668-7.568 3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.276z" />
  </svg>
);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(4.5);
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
        setAverageRating(data.averageRating || 4.5);
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
    const stars = [];
    const fullStars = Math.floor(rating);
    const fractionalPart = rating % 1;
    let hasHalfStar = false;

    if (fractionalPart >= 0.25 && fractionalPart <= 0.75) {
      hasHalfStar = true;
    }

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FullStarSVG key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<HalfStarSVG key="half" />);
    }

    const emptyStarsCount = 5 - stars.length;

    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<EmptyStarSVG key={`empty-${i}`} />);
    }

    return stars;
  };

  const handleGoogleReviewClick = () => {
    const googleReviewUrl = "https://g.page/r/CaLR9b1QR5NmEAE/review";
    window.open(googleReviewUrl, "_blank");
  };

  if (hasError || reviews.length === 0) {
    return null;
  }

  return (
    <section className="reviews-section common-section-padding">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="common-section-title">Opinie naszych klientów</h2>

          <div className="reviews-rating">
            <div className="rating-stars">{renderStars(averageRating)}</div>
            <span className="rating-number">{averageRating}</span>
            <span className="rating-source">na Google</span>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => {
            const commentText =
              review.comment || "Klient nie dodał komentarza.";
            const displayRating = review.rating || 5;

            return (
              <div key={index} className="review-card common-hover-transform">
                <div className="review-header">
                  <div className="review-stars">
                    {renderStars(displayRating)}
                  </div>
                  <div className="quote-icon">💬</div>
                </div>

                <p className="review-comment">"{commentText}"</p>

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
            );
          })}
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
