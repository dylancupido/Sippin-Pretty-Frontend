import React from "react";
import "../Styles/CartPage.css";
import axios from "axios";

const CartPage = ({ cart, setCart }) => {
  const userId = localStorage.getItem("userId");

  // Calculate total cost of cart
  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Handle checkout action
  const handleCheckout = async () => {
    if (!userId) {
      alert("Please log in before checking out.");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const orderID =
      "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    const order = {
      orderID,
      userID: userId,
      totalAmount: parseFloat(calculateTotal()),
      orderType: "online",
      status: "in progress",
    };

    const orderItems = cart.map((item) => ({
      orderID,
      productID: item.productID,
      quantity: item.quantity,
      item_price: item.price,
    }));

    const payload = {
      order: order,
      orderItems: orderItems,
    };

    try {
      const response = await axios.post(
        "http://localhost:5010/api/Orders/WithItems",
        payload
      );
      console.log("Order response:", response.data);
      alert("Order placed successfully!");

      // Clear cart in state and localStorage
      setCart([]);
      localStorage.removeItem(`cart_${userId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing your order.");
    }
  };

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
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="cart-item-price">
                R{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h2>Total: R{calculateTotal()}</h2>
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
