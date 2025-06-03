import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';
 
const CartConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
 
  if (!state) {
    return (
      <div className="confirmation-container">
        <h2>No order data found.</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }
 
  const { orderID, total, orderType, cart, deliveryAddress } = state;
 
  // Calculate estimated time based on order type
  const getEstimatedTime = () => {
    if (orderType === 'delivery') {
      return '45-60 minutes';
    } else {
      return '15-20 minutes';
    }
  };
 
  return (
    <div className="confirmation-container">
      <div className="confirmation-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      <h1>Order Confirmed!</h1>
      <p>Thank you for your order! Your delicious items are being prepared.</p>
 
      <div className="confirmation-details">
        <p><strong>Order ID:</strong> {orderID}</p>
        <p><strong>Total Amount:</strong> R{total}</p>
        <p><strong>Order Type:</strong> {orderType === 'delivery' ? 'Delivery' : 'Collection'}</p>
        <p><strong>Estimated Time:</strong> {getEstimatedTime()}</p>
        {orderType === 'delivery' && deliveryAddress && (
          <div className="delivery-info">
            <p><strong>Delivery Address:</strong></p>
            <p>{deliveryAddress.street}</p>
            <p>{deliveryAddress.city}, {deliveryAddress.postalCode}</p>
          </div>
        )}
      </div>
 
      {cart && cart.length > 0 && (
        <div className="order-items">
          <h3>Your Order:</h3>
          {cart.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-details">
                <span className="item-name">{item.productName}</span>
                <span className="item-quantity">x{item.quantity}</span>
              </div>
              <span className="item-price">R{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
 
      <div className="order-status">
        <p><strong>Status:</strong> Order Received</p>
      </div>
 
      <div className="confirmation-actions">
        <button onClick={() => navigate('/')}>
          <span>Return to Home</span>
        </button>
        <button onClick={() => navigate('/menu')}>
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
 