import React from "react";
import coffeeMug from "../assets/coffee mug.png"; 
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="content-container">
        <div className="left-content">
          <h1>Welcome to Sippin' Pretty</h1>
          <p className="tagline">We’re not ordinary. We’re made to shine, stand out, <br></br>and carry ourselves with flair and confidence just like a perfectly crafted latte with a designer touch. <br></br>So stay cute, stay glam, and never forget who you are</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/booking')}
          >
            Book a Table
          </button>
        </div>
        
        <div className="right-content">
          <img 
            src={coffeeMug} 
            alt="Rotating coffee mug" 
            className="rotating-mug"  
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;