import React from "react";
import {
  HotBeverages,
  ColdBeverages,
  Breakfast,
  SweetTreats,
} from "./MenuItems";
import "../Styles/MenuPage.css";
import { Link } from "react-router-dom";

const Menu = ({ onAddToCart }) => {
  return (
    <>
      <div className="section-title">
        <h1>Hot Beverages</h1>
      </div>
      <div className="card-container">
        {HotBeverages.map((item, index) => (
          <div key={index} className="custom-card">
            <div className="card-image-allign">
              <img src={item.imageUrl} alt={item.name} className="card-image" />
            </div>
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-description">{item.description}</p>
              <p className="card-price">{item.price}</p>
              <button className="buy-now-btn" onClick={() => onAddToCart(item)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="section-title">
        <h1>Cold Beverages</h1>
      </div>
      <div className="card-container">
        {ColdBeverages.map((item, index) => (
          <div key={index} className="custom-card">
            <div className="card-image-allign">
              <img src={item.imageUrl} alt={item.name} className="card-image" />
            </div>
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-description">{item.description}</p>
              <p className="card-price">{item.price}</p>
              <button className="buy-now-btn" onClick={() => onAddToCart(item)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="section-title">
        <h1>Breakfast</h1>
      </div>
      <div className="card-container">
        {Breakfast.map((item, index) => (
          <div key={index} className="custom-card">
            <div className="card-image-allign">
              <img src={item.imageUrl} alt={item.name} className="card-image" />
            </div>
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-description">{item.description}</p>
              <p className="card-price">{item.price}</p>
              <button className="buy-now-btn" onClick={() => onAddToCart(item)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="section-title">
        <h1>Sweet Treats</h1>
      </div>
      <div className="card-container">
        {SweetTreats.map((item, index) => (
          <div key={index} className="custom-card">
            <div className="card-image-allign">
              <img src={item.imageUrl} alt={item.name} className="card-image" />
            </div>
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-description">{item.description}</p>
              <p className="card-price">{item.price}</p>
              <button className="buy-now-btn" onClick={() => onAddToCart(item)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
