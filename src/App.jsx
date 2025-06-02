import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "./Components/Navbar/Navbar";
import AdminNavbar from "./Components/navbarAdmin/AdminNavBar";
import StaffNavbar from "./Components/navbarAdmin/StaffNavBar";

import HomePage from "./Components/HomePage";
import Menu from "./Components/MenuPage";
import CartPage from "./Components/CartPage";
import BookingPage from "./Components/BookingPage/BookingPage";
import PaymentPage from "./Components/PaymentPage/PaymentPage";
import ConfirmationPage from "./Components/ConfirmationPage/ConfirmationPage";
import MenuAdmin from "./Components/MenuPageAdmin";
import UserAdminPage from "./Components/navbarAdmin/UserAdminPage";
import AdminDashboard from "./Components/navbarAdmin/AdminDashboard";
import ManageHomePage from "./Components/navbarAdmin/ManageHomePage";
import DeliveryManagement from "./Components/navbarAdmin/DeliveryManagement";
import OrdersPage from "./Components/OrdersPage";

import LoginForm from "./Components/LoginPage";
import CusRegisterForm from "./Components/RegisterPage";
import { AboutUs } from "./Components/About us";

import "./App.css";
import TillPage from "./Components/TillPage";
import OrderItemsAdminPage from "./Components/StaffOrders";
import StaffRegisterForm from "./Components/RegisterStaff";

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );
  const [userRole, setUserRole] = useState(() =>
    (localStorage.getItem("role") || "user").toLowerCase()
  );
  const [cart, setCart] = useState([]);

  // 🔐 On app load: validate token and restore cart
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          setLoggedIn(true);
          setUserRole(role || "user");

          // ✅ Restore cart from localStorage
          if (userId) {
            const savedCart = localStorage.getItem(`cart_${userId}`);
            setCart(savedCart ? JSON.parse(savedCart) : []);
          }
        } else {
          localStorage.clear();
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.clear();
      }
    }
  }, []);

  // 💾 Save cart to localStorage on change
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart]);

  // ✅ After successful login
  const handleLogin = (role) => {
    setLoggedIn(true);
    setUserRole(role.toLowerCase());

    const userId = localStorage.getItem("userId");
    if (userId) {
      const savedCart = localStorage.getItem(`cart_${userId}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  };

  // ✅ On logout: clear cart and session
  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }

    localStorage.clear();
    setCart([]);
    setLoggedIn(false);
    setUserRole("user");
    navigate("/");
  };

  // ➕ Add to cart (with quantity support)
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.productID === item.productID
      );

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.productID === item.productID
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className="app-container">
      {/* Debug bar */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          background: "#333",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          zIndex: 9999,
        }}
      >
        Role: {userRole} | Logged in: {loggedIn ? "Yes" : "No"}
      </div>

      {/* Role-based Navbar */}
      {userRole === "admin" ? (
        <AdminNavbar onLogout={handleLogout} />
      ) : userRole === "staff" ? (
        <StaffNavbar onLogout={handleLogout} />
      ) : (
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      )}

      {/* Routing */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/till" element={<TillPage />} />
        <Route path="/staff/orders" element={<OrderItemsAdminPage />} />
        <Route path="/admin/registerstaff" element={<StaffRegisterForm/>} />

        {/* Admin Routes */}
        <Route
          path="/menuadmin"
          element={
            userRole === "admin" ? <MenuAdmin /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin/users"
          element={
            userRole === "admin" ? (
              <UserAdminPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            userRole === "admin" ? <OrdersPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin/delivery"
          element={
            userRole === "admin" ? (
              <DeliveryManagement />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <LoginForm setLoggedIn={setLoggedIn} handleLogin={handleLogin} />
          }
        />
        <Route path="/cusRegister" element={<CusRegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
