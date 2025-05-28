import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle real payment logic or validation here
    navigate("/confirmation", { state: bookingData });
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Complete Your Payment</h2>
        <p>Secure your table now!</p>
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="cardName">Cardholder Name</label>
        <input
          id="cardName"
          type="text"
          name="cardName"
          placeholder="e.g. Jane Doe"
          required
        />

        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          required
        />

        <div className="card-row">
          <div>
            <label htmlFor="expiry">Expiry</label>
            <input
              id="expiry"
              type="text"
              name="expiry"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label htmlFor="cvc">CVC</label>
            <input
              id="cvc"
              type="text"
              name="cvc"
              placeholder="123"
              required
            />
          </div>
        </div>

        <div className="qr-section">
          <p>Or scan this QR to pay:</p>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://your-payment-url.com"
            alt="QR Code"
          />
        </div>

        <button type="submit" className="pay-btn">
          Confirm & Pay
        </button>
      </form>

      <div className="back-btn" onClick={() => navigate("/booking")}>
        ← Go Back to Booking
      </div>
    </div>
  );
};

export default PaymentPage;
