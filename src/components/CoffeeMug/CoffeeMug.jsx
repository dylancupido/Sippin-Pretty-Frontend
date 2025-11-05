
import React from 'react';
import './CoffeeMug.css';
import coffeeMug from '../../assets/Coffee mug.png';
import { useNavigate } from 'react-router-dom';

const CoffeeMug = () => {
  const navigate = useNavigate();

  return (
    <div className="booking-section">
      <div className="left-side">
        <div className="tagline">
          <h2>Enjoy Your Coffee Break</h2>
          <p>Start your day with our premium coffee selection</p>
        </div>
        
        <div className="action-buttons">
          <button className="shop-button" onClick={() => navigate('/menu')}>
            Shop Now
          </button>
          <button className="book-button" onClick={() => navigate('/booking')}>
            Book a Table
          </button>
        </div>
        
        <div className="search-bar">
          <input type="text" placeholder="Search our menu..." />
        </div>
      </div>
      
      <div className="right-side">
        <img 
          src={coffeeMug} 
          alt="Coffee Mug" 
          className="coffee-mug" 
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CoffeeMug;
