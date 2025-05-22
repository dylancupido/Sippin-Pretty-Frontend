import React from "react";
import "../Styles/CartPage.css";

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
                alt={item.productName}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.productName}</h3>
                <p>{item.description}</p>
              </div>
              <div className="cart-item-price">R{item.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
