
import React from 'react';
import './CoffeeMug.css';
import coffeeMug from '../../assets/Coffee mug.png';
import { useNavigate } from 'react-router-dom';

const CoffeeMug = () => {
  const navigate = useNavigate();

  return (
    <div className="booking-section">
      <div className="left-side">
        <button className="book-button" onClick={() => navigate('/booking')}>
          Book a Table
        </button>
      </div>
      <div className="right-side">
        <img src={coffeeMug} alt="Coffee Mug" className="coffee-mug" />
      </div>
    </div>
  );
};

export default CoffeeMug;