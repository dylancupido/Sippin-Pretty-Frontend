import React from "react";
import "../Styles/CartPage.css"; // Corrected the CSS file import

const CartPage = ({ cart }) => {
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="cart-item-price">{item.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
