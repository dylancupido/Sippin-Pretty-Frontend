import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";

// Component to display order confirmation after cart checkout
const CartConfirmationPage = () => {
  const { state } = useLocation(); // Retrieve state passed from the payment/checkout page
  const navigate = useNavigate(); // For navigation between routes

  // If no order data was passed, fallback UI
  if (!state) {
    return (
      <div className="confirmation-container">
        <h2>No order data found.</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  // Destructure order details
  const { orderID, total, orderType, cart, deliveryAddress } = state;

  // Utility to return estimated time based on order type
  const getEstimatedTime = () => {
    return orderType === "delivery" ? "45-60 minutes" : "15-20 minutes";
  };

  return (
    <div className="confirmation-container">
      {/* Icon header */}
      <div className="confirmation-icon">
        <i className="fas fa-check-circle"></i>
      </div>

      {/* Main title */}
      <h1>Order Confirmed!</h1>
      <p>Thank you for your order! Your delicious items are being prepared.</p>

      {/* Order details */}
      <div className="confirmation-details">
        <p>
          <strong>Order ID:</strong> {orderID}
        </p>
        <p>
          <strong>Total Amount:</strong> R{total}
        </p>
        <p>
          <strong>Order Type:</strong>{" "}
          {orderType === "delivery" ? "Delivery" : "Collection"}
        </p>
        <p>
          <strong>Estimated Time:</strong> {getEstimatedTime()}
        </p>

        {/* Conditional delivery address section */}
        {orderType === "delivery" && deliveryAddress && (
          <div className="delivery-info">
            <p>
              <strong>Delivery Address:</strong>
            </p>
            <p>{deliveryAddress.street}</p>
            <p>
              {deliveryAddress.city}, {deliveryAddress.postalCode}
            </p>
          </div>
        )}
      </div>

      {/* Itemized list of cart products */}
      {cart && cart.length > 0 && (
        <div className="order-items">
          <h3>Your Order:</h3>
          {cart.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-details">
                <span className="item-name">{item.productName}</span>
                <span className="item-quantity">x{item.quantity}</span>
              </div>
              <span className="item-price">
                R{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Static status display */}
      <div className="order-status">
        <p>
          <strong>Status:</strong> Order Received
        </p>
      </div>

      {/* Action buttons */}
      <div className="confirmation-actions">
        <button onClick={() => navigate("/")}>
          <span>Return to Home</span>
        </button>
        <button onClick={() => navigate("/menu")}>
          <span>Continue Shopping</span>
        </button>
        <button onClick={() => window.print()}>
          <span>Print Receipt</span>
        </button>
      </div>
    </div>
  );
};

export default CartConfirmationPage;
