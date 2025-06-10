import React from "react";
import "../Styles/CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Calculate total amount for all cart items
  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const orderA=parseInt(calculateTotal());
  const VAT=(orderA*0.15);
  const Total =orderA+VAT;
  // Handle checkout button click
  const handleCheckout = () => {
    // Require user to be logged in
    if (!userId) {
      alert("Please log in before checking out.");
      return;
    }

    // Ensure cart is not empty
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    // Generate unique order ID
    const orderID =
      "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Prepare order data
    const order = {
      orderID,
      userID: userId,
      totalAmount: parseFloat(calculateTotal()),
      orderType: "online",
      status: "in progress",
    };

    // Navigate to payment page and pass order/cart data via route state
    navigate("/cartpayment", {
      state: {
        cart,
        order,
      },
    });
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {/* Show empty cart message or cart item list */}
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {/* Render each cart item */}
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
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="cart-item-price">
                R{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Show total and checkout button */}
          <div className="cart-total">
            <h5>Amount: R{calculateTotal()}</h5>
            <h5>VAT(15%):R {(VAT.toFixed(2))}</h5>
            <h3>Total:{Total.toFixed(2)}</h3>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
