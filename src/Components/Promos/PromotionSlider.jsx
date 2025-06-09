import React, { useState, useEffect, useCallback } from "react";
import "./PromotionSlider.css";

const BASE_URL = "http://localhost:5010/api/Promotions"; // adjust to match your backend

const PromotionSlider = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Fetch promotions from backend
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (promotions.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, promotions.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }

    if (touchStart - touchEnd < -50) {
      setCurrentSlide((prev) =>
        prev === 0 ? promotions.length - 1 : prev - 1
      );
    }
  }, [touchStart, touchEnd, promotions.length]);

  return (
    <div className="promotion-slider">
      <div
        className="slider-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {promotions.map((promo) => (
          <div key={promo.promotionID} className="slide">
            <div className="slide-image">
              <img
                src={promo.imagePath}
                alt={promo.title}
                className="promo-image"
                loading="lazy"
              />
            </div>
            <div className="slide-content">
              <h3>{promo.title}</h3>
              <p>
                {promo.description.length > 60
                  ? promo.description.substring(0, 60) + "..."
                  : promo.description}
              </p>
              <p className="catch-phrase">{promo.catchPhrase}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionSlider;
