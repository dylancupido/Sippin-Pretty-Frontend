import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Booking details passed from previous screen
  const bookingData = location.state || {};

  // Card input form state
  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState(""); // Visa / Mastercard / Debit

  // Handle input field changes (name, number, expiry, cvc)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));

    if (name === "cardNumber") detectCardType(value);
  };

  // Identify card type from the card number pattern
  const detectCardType = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s+/g, "");
    if (/^4/.test(cleanNumber)) setCardType("Visa");
    else if (
        /^5[1-5]/.test(cleanNumber) ||
        /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(cleanNumber)
    )
      setCardType("Mastercard");
    else if (/^5/.test(cleanNumber)) setCardType("Debit");
    else setCardType("");
  };

  // Format card number (adds spaces every 4 digits)
  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    e.target.value = value;
    setCardData((prev) => ({ ...prev, cardNumber: value }));
    detectCardType(value);
  };

  // Format expiry to MM/YY
  const formatExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2)
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    e.target.value = value;
    setCardData((prev) => ({ ...prev, expiry: value }));
  };

  // Validate all card fields before submission
  const validateForm = () => {
    const newErrors = {};
    const cleanCardNumber = cardData.cardNumber.replace(/\s+/g, "");

    if (!cardData.cardName.trim())
      newErrors.cardName = "Cardholder name is required";

    if (!cleanCardNumber) newErrors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(cleanCardNumber))
      newErrors.cardNumber = "Card number must be 16 digits";
    else if (!cardType)
      newErrors.cardNumber =
          "Only Visa, Mastercard, or Debit cards are accepted";

    if (!cardData.expiry) newErrors.expiry = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry))
      newErrors.expiry = "Expiry must be in MM/YY format";
    else {
      const [month, year] = cardData.expiry.split("/");
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiryDate < new Date()) newErrors.expiry = "Card has expired";
    }

    if (!cardData.cvc) newErrors.cvc = "CVC is required";
    else if (!/^\d{3,4}$/.test(cardData.cvc))
      newErrors.cvc = "CVC must be 3 or 4 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // On form submit, validate & redirect to confirmation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const paymentInfo = {
      ...bookingData,
      paymentMethod: cardType,
      paymentStatus: "Completed",
      paymentDate: new Date().toISOString(),
      cancellationFeeNotice:
          "Cancellations within 24 hours of booking time will incur a 50% fee.",
    };

    navigate("/confirmation", { state: paymentInfo });
  };

  return (
      <div className="payment-container">
        <div className="payment-header">
          <h2>Complete Your Payment</h2>
          <p>Secure your table now!</p>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>

          {/* Honeypot field */}
          <div style={{ display: 'none' }}>
            <label htmlFor="phone_number">Phone Number</label>
            <input type="text" name="phone_number" id="phone_number" autoComplete="off" />
          </div>

          {/* Cardholder Name */}
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
          {errors.cardName && (
              <div className="error-message">{errors.cardName}</div>
          )}

          {/* Card Number + Card Type */}
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
            {errors.cardNumber && (
                <div className="error-message">{errors.cardNumber}</div>
            )}
          </div>

          {/* Expiry and CVC Fields */}
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
              {errors.expiry && (
                  <div className="error-message">{errors.expiry}</div>
              )}
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

          {/* Summary Section */}
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

          {/* Optional QR Code */}
          <div className="qr-section">
            <p>Or scan this QR to pay:</p>
            <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://your-payment-url.com"
                alt="QR Code"
            />
          </div>

          {/* Confirm Button */}
          <button type="submit" className="pay-btn">
            Confirm & Pay
          </button>
        </form>

        {/* Back Navigation */}
        <div className="back-btn" onClick={() => navigate("/booking")}>
          ← Go Back to Booking
        </div>
      </div>
  );
};

export default PaymentPage;