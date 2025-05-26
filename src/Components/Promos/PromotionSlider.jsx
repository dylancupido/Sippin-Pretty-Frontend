import React, { useState, useEffect } from "react";
import "./PromotionSlider.css";

// Import your promotion images
import Promo1 from "../../assets/images/Promo1.png";
import Promo2 from "../../assets/images/Promo2.png";
import Promo3 from "../../assets/images/Promo3.png";
import Promo4 from "../../assets/images/Promo4.png";

const PromotionSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Promotion data with your actual images
  const promotions = [
    {
      id: 1,
      title: "Summer Special",
      description: "Try our new Iced Lavender Latte with 15% off all week!",
      image: Promo1,
      cta: "Order Now",
    },
    {
      id: 2,
      title: "Happy Hour",
      description: "2-for-1 drinks every weekday from 2-4pm",
      image: Promo2,
      cta: "View Menu",
    },
    {
      id: 3,
      title: "Loyalty Rewards",
      description:
        "Join our loyalty program and get a free drink after 10 purchases",
      image: Promo3,
      cta: "Sign Up",
    },
     {
      id: 4,
      title: "Loyalty Rewards",
      description:
        "Join our loyalty program and get a free drink after 10 purchases",
      image: Promo4,
      cta: "Sign Up",
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

  return (
    <div className="promotion-slider">
      <div
        className="slider-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promotions.map((promo) => (
          <div key={promo.id} className="slide">
            <div className="slide-image">
              <img
                src={promo.image}
                alt={promo.title}
                className={`promo-image promo-image-${promo.id}`}
              />{" "}
            </div>
            <div className="slide-content">
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              <button className="cta-button">{promo.cta}</button>
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
