import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";

import HomePage from "./Components/HomePage";
import Menu from "./Components/MenuPage";
import CartPage from "./Components/CartPage";
import BookingPage from "./Components/BookingPage.jsx/BookingPage";
import PaymentPage from "./Components/PaymentPage/PaymentPage";
import ConfirmationPage from "./Components/ConfirmationPage/ConfirmationPage";
import MenuAdmin from "./Components/MenuPageAdmin";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);

  const showRegisterModal = () => setShowRegister(true);
  const hideRegisterModal = () => setShowRegister(false);
  const showLoginModal = () => setShowLogin(true);
  const hideLoginModal = () => setShowLogin(false);
  const handleAddToCart = (item) => setCart((prev) => [...prev, item]);

  return (
    <div className="app-container">
      <Navbar
        loggedIn={loggedIn}
        showRegisterModal={showRegisterModal}
        showLoginModal={showLoginModal}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/menuadmin"
          element={<MenuAdmin onAddToCart={handleAddToCart} />}
        />
          <Route
          path="/menu"
          element={<Menu onAddToCart={handleAddToCart} />}
        />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>

      {showRegister && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Register</h2>
            <p>This is where your register form will go.</p>
            <button onClick={hideRegisterModal}>Close</button>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Login</h2>
            <p>This is where your login form will go.</p>
            <button onClick={hideLoginModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
