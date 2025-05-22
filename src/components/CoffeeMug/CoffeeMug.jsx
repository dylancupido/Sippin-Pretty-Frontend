
import React from 'react';
import './CoffeeMug.css';
import coffeeMug from '../../assets/Coffee mug.png'; 

const CoffeeMug = () => {
  return (
    <div className="coffee-mug-container">
      <img src={coffeeMug} alt="Coffee Mug" className="rotating-mug" />
    </div>
  );
};

export default CoffeeMug;
