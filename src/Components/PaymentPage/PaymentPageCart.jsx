import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPageCart.css";
import axios from "axios";

const PaymentPageCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, order } = location.state || {};

  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState("");
  const [orderType, setOrderType] = useState("collection");

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));

    if (name === "cardNumber") detectCardType(value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
  };

  const detectCardType = (number) => {
    const clean = number.replace(/\s+/g, "");
    if (/^4/.test(clean)) setCardType("Visa");
    else if (
      /^5[1-5]/.test(clean) ||
      /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(clean)
    )
      setCardType("Mastercard");
    else if (/^5/.test(clean)) setCardType("Debit");
    else setCardType("");
  };

  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    e.target.value = value;
    setCardData((prev) => ({ ...prev, cardNumber: value }));
    detectCardType(value);
  };

  const formatExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2)
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    e.target.value = value;
    setCardData((prev) => ({ ...prev, expiry: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!cardData.cardName.trim())
      newErrors.cardName = "Cardholder name is required";
    const cleanCardNumber = cardData.cardNumber.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(cleanCardNumber))
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!cardType)
      newErrors.cardNumber = "Only Visa, Mastercard, or Debit accepted";
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry))
      newErrors.expiry = "Use MM/YY format";
    else {
      const [mm, yy] = cardData.expiry.split("/");
      const exp = new Date(2000 + parseInt(yy), parseInt(mm) - 1);
      if (exp < new Date()) newErrors.expiry = "Card expired";
    }
    if (!/^\d{3,4}$/.test(cardData.cvc))
      newErrors.cvc = "CVC must be 3 or 4 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderItems = cart.map((item) => ({
      orderID: order.orderID,
      productID: item.productID,
      quantity: item.quantity,
      item_price: item.price,
    }));

    const payload = { order: { ...order, orderType }, orderItems };
    console.log("Sending order payload:", payload);

    try {
      const response = await axios.post(
        "http://localhost:5010/api/Orders/WithItems",
        payload
      );
      console.log("Order posted successfully:", response.data);

      if (orderType === "delivery") {
        const delivery = {
          orderID: order.orderID,
          userID: order.userID,
          streetAddress: deliveryAddress.street,
          city: deliveryAddress.city,
          postalCode: deliveryAddress.postalCode,
        };
        console.log("Sending delivery info:", delivery);

        await axios.post("http://localhost:5010/api/Deliveries", delivery);
      }

      alert("Payment successful and order placed!");
      localStorage.removeItem(`cart_${order.userID}`);
      navigate("/confirmation", {
        state: { orderID: order.orderID, total: order.totalAmount },
      });
    } catch (error) {
      console.error("Order failed:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      alert("Something went wrong while placing your order.");
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Complete Cart Payment</h2>
        <p>Secure your order now!</p>
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <label>Cardholder Name</label>
        <input
          type="text"
          name="cardName"
          placeholder="e.g. John Smith"
          value={cardData.cardName}
          onChange={handleChange}
          className={errors.cardName ? "input-error" : ""}
        />
        {errors.cardName && (
          <div className="error-message">{errors.cardName}</div>
        )}

        <div className="card-input-container">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardData.cardNumber}
            onChange={handleChange}
            onInput={formatCardNumber}
            maxLength="19"
            className={errors.cardNumber ? "input-error" : ""}
          />
          {cardType && <div className="card-type">{cardType}</div>}
          {errors.cardNumber && (
            <div className="error-message">{errors.cardNumber}</div>
          )}
        </div>

        <div className="card-row">
          <div>
            <label>Expiry</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleChange}
              onInput={formatExpiry}
              maxLength="5"
              className={errors.expiry ? "input-error" : ""}
            />
            {errors.expiry && (
              <div className="error-message">{errors.expiry}</div>
            )}
          </div>
          <div>
            <label>CVC</label>
            <input
              type="text"
              name="cvc"
              placeholder="123"
              value={cardData.cvc}
              onChange={handleChange}
              maxLength="4"
              className={errors.cvc ? "input-error" : ""}
            />
            {errors.cvc && <div className="error-message">{errors.cvc}</div>}
          </div>
        </div>

        <div className="order-type-selection">
          <label>
            <input
              type="radio"
              name="orderType"
              checked={orderType === "collection"}
              onChange={() => setOrderType("collection")}
            />
            Collection
          </label>
          <label>
            <input
              type="radio"
              name="orderType"
              checked={orderType === "delivery"}
              onChange={() => setOrderType("delivery")}
            />
            Delivery
          </label>
        </div>

        {orderType === "delivery" && (
          <div className="delivery-fields">
            <label>Street Address</label>
            <input
              type="text"
              name="street"
              value={deliveryAddress.street}
              onChange={handleAddressChange}
            />

            <label>City</label>
            <input
              type="text"
              name="city"
              value={deliveryAddress.city}
              onChange={handleAddressChange}
            />

            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={deliveryAddress.postalCode}
              onChange={handleAddressChange}
            />
          </div>
        )}

        <div className="payment-summary">
          <h3>Order Summary</h3>
          <div className="summary-row total">
            <span>Total:</span>
            <span>R{order.totalAmount}</span>
          </div>
        </div>

        <button type="submit" className="pay-btn">
          Confirm & Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentPageCart;
