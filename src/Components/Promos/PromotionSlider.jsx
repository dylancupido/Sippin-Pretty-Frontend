import React, { useState, useEffect, useCallback } from "react";
import "./PromotionSlider.css";

// Import your promotion images
import Promo1 from "../../assets/images/Promo1.png";
import Promo2 from "../../assets/images/Promo2.png";
import Promo3 from "../../assets/images/Promo3.png";
import Promo4 from "../../assets/images/Promo4.png";

const PromotionSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Promotion data with your actual images
  const promotions = [
    {
      id: 1,
      title: "Summer Special",
      description: "Try our new Iced Lavender Latte with 15% off all week!",
      image: Promo1,
      catchPhrase: "Limited Time Only!",
    },
    {
      id: 2,
      title: "Happy Hour",
      description: "2-for-1 drinks every weekday from 2-4pm",
      image: Promo2,
      catchPhrase: "Double the Delight!",
    },
    {
      id: 3,
      title: "Loyalty Rewards",
      description:
        "Join our loyalty program and get a free drink after 10 purchases",
      image: Promo3,
      catchPhrase: "Sip & Save!",
    },
    {
      id: 4,
      title: "Seasonal Treats",
      description:
        "Discover our limited-time seasonal menu items",
      image: Promo4,
      catchPhrase: "Taste the Season!",
    },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, promotions.length]);

  // Handle manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle touch events for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setCurrentSlide((prev) => (prev === 0 ? promotions.length - 1 : prev - 1));
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
          <div key={promo.id} className="slide">
            <div className="slide-image">
              <img
                src={promo.image}
                alt={promo.title}
                className="promo-image"
                loading="lazy"
              />
            </div>
            <div className="slide-content">
              <h3>{promo.title}</h3>
              <p>{promo.description.length > 60 
                  ? promo.description.substring(0, 60) + '...' 
                  : promo.description}</p>
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
