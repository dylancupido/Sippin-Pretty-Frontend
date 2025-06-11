import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPageCart.css";
import axios from "axios";

const PaymentPageCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, order } = location.state || {}; // Get order & cart from previous page

  // Payment form data state
  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState("");
  const [orderType, setOrderType] = useState("collection"); // Default to collection

  // Delivery address state (shown only for delivery orders)
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
  });

  // Handle changes for card input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));

    if (name === "cardNumber") detectCardType(value); // Detect card brand
  };

  // Handle delivery address changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Determine card type from card number
  const detectCardType = (number) => {
    const clean = number.replace(/\s+/g, "");
    if (/^4/.test(clean)) setCardType("Visa");
    else if (
        /^5[1-5]/.test(clean) ||
        /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(clean)
    ) {
      setCardType("Mastercard");
    } else if (/^5/.test(clean)) {
      setCardType("Debit");
    } else {
      setCardType("");
    }
  };

  // Format card number with spacing
  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    e.target.value = value;
    setCardData((prev) => ({ ...prev, cardNumber: value }));
    detectCardType(value);
  };

  // Format expiry as MM/YY
  const formatExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2)
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    e.target.value = value;
    setCardData((prev) => ({ ...prev, expiry: value }));
  };

  // Validate form input fields before submission
  const validateForm = () => {
    const newErrors = {};
    if (!cardData.cardName.trim())
      newErrors.cardName = "Cardholder name is required";

    const cleanCardNumber = cardData.cardNumber.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(cleanCardNumber))
      newErrors.cardNumber = "Card number must be 16 digits";

    if (!cardType)
      newErrors.cardNumber = "Only Visa, Mastercard, or Debit accepted";

    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = "Use MM/YY format";
    } else {
      const [mm, yy] = cardData.expiry.split("/");
      const exp = new Date(2000 + parseInt(yy), parseInt(mm) - 1);
      if (exp < new Date()) newErrors.expiry = "Card expired";
    }

    if (!/^\d{3,4}$/.test(cardData.cvc))
      newErrors.cvc = "CVC must be 3 or 4 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle payment form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prepare order items
    const orderItems = cart.map((item) => ({
      orderID: order.orderID,
      productID: item.productID,
      quantity: item.quantity,
      item_price: item.price,
    }));

    const payload = {
      order: { ...order, orderType },
      orderItems,
    };

    try {
      // Submit order and order items
      await axios.post("http://localhost:5010/api/Orders/WithItems", payload);

      // If delivery is selected, submit delivery details
      if (orderType === "delivery") {
        const delivery = {
          orderID: order.orderID,
          userID: order.userID,
          streetAddress: deliveryAddress.street,
          city: deliveryAddress.city,
          postalCode: deliveryAddress.postalCode,
        };
        await axios.post("http://localhost:5010/api/Deliveries", delivery);
      }

      // Clear cart and redirect
      localStorage.removeItem(`cart_${order.userID}`);
      navigate("/cart-confirmation", {
        state: {
          orderID: order.orderID,
          total: order.totalAmount,
          orderType,
          cart,
          deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
        },
      });

      alert("Payment successful and order placed!");
    } catch (error) {
      console.error("Order failed:", error);
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

          {/* Honeypot field */}
          <div style={{ display: 'none' }}>
            <label htmlFor="phone_number">Phone Number</label>
            <input type="text" name="phone_number" id="phone_number" autoComplete="off" />
          </div>

          {/* Cardholder Name */}
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

          {/* Card Number + Card Type */}
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

          {/* Expiry and CVC */}
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

          {/* Order Type: Collection or Delivery */}
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

          {/* Delivery Fields (conditional) */}
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

          {/* Summary */}
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