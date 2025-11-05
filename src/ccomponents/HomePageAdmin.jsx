import React from "react";
import coffeeMug from "../assets/coffee mug.png";
import "./HomePageAdmin.css";
import { useNavigate } from "react-router-dom";
import PromotionSlider from "./Promos/PromotionSlider";

const HomePageAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Main content layout */}
      <div className="content-container">
        {/* Left section: heading, description, and CTA */}
        <div className="left-content">
          <h1>Welcome to Sippin' Pretty</h1>
          <p className="tagline">
            We’re not ordinary. We’re made to shine, stand out, <br />
            and carry ourselves with flair and confidence just like a perfectly
            crafted latte with a designer touch. <br />
            So stay cute, stay glam, and never forget who you are
          </p>
          <button className="cta-button" onClick={() => navigate("/booking")}>
            Book a Table
          </button>
        </div>

        {/* Right section: rotating coffee mug image */}
        <div className="right-content">
          <img
            src={coffeeMug}
            alt="Rotating coffee mug"
            className="rotating-mug"
          />
        </div>
      </div>

      {/* Promotional slider component */}
      <PromotionSlider />
    </div>
  );
};

export default HomePageAdmin;
