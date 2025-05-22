// src/components/CoffeeMug/CoffeeMug.jsx
import React from 'react';
import './CoffeeMug.css';
import coffeeMug from '../../assets/Coffee mug.png'; // adjust if the path is different

const CoffeeMug = () => {
  return (
    <div className="coffee-mug-container">
      <img src={coffeeMug} alt="Coffee Mug" className="rotating-mug" />
    </div>
  );
};

export default CoffeeMug;
