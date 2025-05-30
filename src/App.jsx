import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("Current user role:", userRole);
  }, [userRole]);

  const handleLogin = (role) => {
    setLoggedIn(true);
    setUserRole(role);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole("user");
  };

  const handleAddToCart = (item) => setCart((prev) => [...prev, item]);

  return (
    <div className="app-container">
      {/* Debug info - remove after troubleshooting */}
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        background: '#333', 
        color: 'white', 
        padding: '5px 10px', 
        borderRadius: '5px',
        zIndex: 9999
      }}>
        Role: {userRole} | Logged in: {loggedIn ? 'Yes' : 'No'}
      </div>
      
      {/* Navbar - Only render one navbar based on role */}
      {userRole === "admin" ? (
        <AdminNavbar onLogout={handleLogout} />
      ) : userRole === "staff" ? (
        <StaffNavbar onLogout={handleLogout} />
      ) : (
        <Navbar
          loggedIn={loggedIn}
          showRegisterModal={() => setShowRegister(true)}
          showLoginModal={() => setShowLogin(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menuadmin" element={<MenuAdmin />} />
        <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin/users" element={<UserAdminPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
      </Routes>

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Register</h2>
            <p>Register form goes here.</p>
            <button onClick={() => setShowRegister(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Login</h2>
            <p>Select role to login as:</p>
            <button onClick={() => handleLogin("admin")}>Login as Admin</button>
            <button onClick={() => handleLogin("staff")}>Login as Staff</button>
            <button onClick={() => handleLogin("user")}>Login as User</button>
            <button onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
