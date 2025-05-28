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
import CusRegisterForm from "./Components/RegisterPage";
import StaffRegisterForm from "./Components/RegisterStaff";
import LoginForm from "./Components/LoginPage";
import OrdersPage from "./Components/OrdersPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => setCart((prev) => [...prev, item]);

  return (
    <div className="app-container">
      <Navbar loggedIn={loggedIn} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/menuadmin"
          element={<MenuAdmin onAddToCart={handleAddToCart} />}
        />
        <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/cusRegister" element={<CusRegisterForm />} />
        <Route path="/staffRegister" element={<StaffRegisterForm />} />
        <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn}/>} />
        <Route path="/Orders" element={<OrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;
