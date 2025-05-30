import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {};
  
  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });
  
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    setErrors(prev => ({ ...prev, [name]: null }));
    
    // Detect card type when card number changes
    if (name === "cardNumber") {
      detectCardType(value);
    }
  };

  // Detect card type based on first digits
  const detectCardType = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s+/g, "");
    
    // Visa cards start with 4
    if (/^4/.test(cleanNumber)) {
      setCardType("Visa");
    } 
    // Mastercard starts with 51-55 or 2221-2720
    else if (/^5[1-5]/.test(cleanNumber) || /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(cleanNumber)) {
      setCardType("Mastercard");
    }
    // Debit cards often start with 5 (but this is a simplified check)
    else if (/^5/.test(cleanNumber)) {
      setCardType("Debit");
    }
    else {
      setCardType("");
    }
  };

  // Format card number with spaces
  const formatCardNumber = (e) => {
    const input = e.target;
    let { value } = input;
    
    // Remove all non-digits
    value = value.replace(/\D/g, "");
    
    // Add space after every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    
    // Update the input value
    input.value = value;
    
    // Update state
    setCardData(prev => ({ ...prev, cardNumber: value }));
    
    // Detect card type
    detectCardType(value);
  };

  // Format expiry date as MM/YY
  const formatExpiry = (e) => {
    const input = e.target;
    let { value } = input;
    
    // Remove all non-digits
    value = value.replace(/\D/g, "");
    
    // Add slash after 2 digits
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    
    // Update the input value
    input.value = value;
    
    // Update state
    setCardData(prev => ({ ...prev, expiry: value }));
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate cardholder name
    if (!cardData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    }
    
    // Validate card number
    const cleanCardNumber = cardData.cardNumber.replace(/\s+/g, "");
    if (!cleanCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cleanCardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    } else if (!cardType) {
      newErrors.cardNumber = "Only Visa, Mastercard, or Debit cards are accepted";
    }
    
    // Validate expiry date
    if (!cardData.expiry) {
      newErrors.expiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = "Expiry date must be in MM/YY format";
    } else {
      // Check if card is expired
      const [month, year] = cardData.expiry.split("/");
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();
      
      if (expiryDate < currentDate) {
        newErrors.expiry = "Card has expired";
      }
    }
    
    // Validate CVC
    if (!cardData.cvc) {
      newErrors.cvc = "CVC is required";
    } else if (!/^\d{3,4}$/.test(cardData.cvc)) {
      newErrors.cvc = "CVC must be 3 or 4 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add payment info to booking data (excluding sensitive card details)
      const paymentInfo = {
        ...bookingData,
        paymentMethod: cardType,
        paymentStatus: "Completed",
        paymentDate: new Date().toISOString(),
        cancellationFeeNotice: "Cancellations within 24 hours of booking time will incur a 50% fee."
      };
      
      // Navigate to confirmation page with booking data
      navigate("/confirmation", { state: paymentInfo });
    }
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
          value={cardData.cardName}
          onChange={handleChange}
          className={errors.cardName ? "input-error" : ""}
          required
        />
        {errors.cardName && <div className="error-message">{errors.cardName}</div>}

        <div className="card-input-container">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardData.cardNumber}
            onChange={handleChange}
            onInput={formatCardNumber}
            maxLength="19"
            className={errors.cardNumber ? "input-error" : ""}
            required
          />
          {cardType && <div className="card-type">{cardType}</div>}
          {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
        </div>

        <div className="card-row">
          <div>
            <label htmlFor="expiry">Expiry</label>
            <input
              id="expiry"
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleChange}
              onInput={formatExpiry}
              maxLength="5"
              className={errors.expiry ? "input-error" : ""}
              required
            />
            {errors.expiry && <div className="error-message">{errors.expiry}</div>}
          </div>
          <div>
            <label htmlFor="cvc">CVC</label>
            <input
              id="cvc"
              type="text"
              name="cvc"
              placeholder="123"
              value={cardData.cvc}
              onChange={handleChange}
              maxLength="4"
              className={errors.cvc ? "input-error" : ""}
              required
            />
            {errors.cvc && <div className="error-message">{errors.cvc}</div>}
          </div>
        </div>

        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <div className="summary-row">
            <span>Table Reservation:</span>
            <span>R{bookingData.totalPrice || 0}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>R{bookingData.totalPrice || 0}</span>
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
