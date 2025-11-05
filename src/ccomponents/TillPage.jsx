import React, { useEffect, useState } from "react";
import "../Styles/Till.css";
import axios from "axios";

export default function TillPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [receiptItems, setReceiptItems] = useState([]);
  const [paymentType, setPaymentType] = useState("");

  // Load menu items from the API
  useEffect(() => {
    fetch("https://sippinpretty.fly.dev/api/MenuItemsAPI")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          ...item,
          id: item.productID,
          name: item.productName,
          price: item.price,
          productID: item.productID,
          quantity: 1,
        }));
        setMenuItems(formatted);
      })
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

  // Add an item to the receipt
  const handleAddItem = (item) => {
    setReceiptItems([...receiptItems, item]);
  };

  // Clear receipt and payment selection
  const handleClear = () => {
    setReceiptItems([]);
    setPaymentType("");
  };

  // Set selected payment method
  const handlePayment = (type) => {
    setPaymentType(type);
  };

  const total = receiptItems.reduce((sum, item) => sum + item.price, 0);
  const exclusive = parseFloat(total.toFixed(2));
  const vat = parseFloat((exclusive * 0.15).toFixed(2));
  const inclusive = parseFloat((exclusive + vat).toFixed(2));

  console.log({
    exclusive,
    vat,
    inclusive,
  });

  // Submit order and order items to the backend
  const handleCheckout = async () => {
    if (receiptItems.length === 0) {
      alert("No items to checkout.");
      return;
    }

    if (!paymentType) {
      alert("Please select a payment method.");
      return;
    }

    const orderID =
      "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const userID = "INSTORE1";

    const order = {
      orderID,
      userID,
      totalAmount: parseFloat(total.toFixed(2)),
      orderType: "In-Store",
      status: "in progress",
      paymentMethod: paymentType,
    };

    const orderItems = receiptItems.map((item) => ({
      orderID,
      productID: item.productID,
      quantity: item.quantity || 1,
      item_price: item.price,
    }));

    const payload = {
      order,
      orderItems,
    };

    try {
      console.log("Sending payload:", payload);
      const response = await axios.post(
        "https://sippinpretty.fly.dev/api/Orders/WithItems",
        payload
      );
      console.log("Checkout success:", response.data);
      alert("In-store order placed successfully!");
      handleClear();
    } catch (error) {
      console.error(
        "Error placing in-store order:",
        error.response?.data || error.message
      );
      alert(
        "Something went wrong: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className="calculator-app-container">
      <h1 className="heading">Till System</h1>

      <div className="till-container">
        {/* Receipt display and actions */}
        <div className="receipt">
          <h3>Receipt</h3>
          {receiptItems.length === 0 ? (
            <p className="no-items">No items added</p>
          ) : (
            <ul>
              {receiptItems.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  <span>R{item.price}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="vat">VAT(15%):R{vat}</div>
          <div className="total">Total: R{inclusive}</div>

          {/* Checkout and clear buttons */}
          <div className="checkout-controls">
            <button
              className="checkout"
              onClick={handleCheckout}
              disabled={receiptItems.length === 0 || !paymentType}
            >
              Checkout
            </button>
            <button className="clear" onClick={handleClear}>
              Clear
            </button>
          </div>

          {/* Payment method selection */}
          <div className="payment-options">
            <p>Select Payment:</p>
            <button
              className={`payment ${paymentType === "Cash" ? "selected" : ""}`}
              onClick={() => handlePayment("Cash")}
            >
              Cash
            </button>
            <button
              className={`payment ${paymentType === "Card" ? "selected" : ""}`}
              onClick={() => handlePayment("Card")}
            >
              Card
            </button>
          </div>
        </div>

        {/* Menu display */}
        <div className="menu">
          <h3>Menu</h3>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <button
                key={item.productID}
                className="menu-button"
                onClick={() => handleAddItem(item)}
              >
                {item.name} - R{item.price}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
