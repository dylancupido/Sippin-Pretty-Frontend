import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import AdminNavbar from "./Components/navbarAdmin/AdminNavBar";
import StaffNavbar from "./Components/navbarAdmin/StaffNavBar";
import AdminDashboard from "./Components/navbarAdmin/AdminDashboard";
import UserAdminPage from "./Components/navbarAdmin/UserAdminPage"; // Adjust the path if it's in a different folder

import HomePage from "./Components/HomePage";
import Menu from "./Components/MenuPage";
import CartPage from "./Components/CartPage";
import BookingPage from "./Components/BookingPage/BookingPage";
import PaymentPage from "./Components/PaymentPage/PaymentPage";
import ConfirmationPage from "./Components/ConfirmationPage/ConfirmationPage";
import MenuAdmin from "./Components/MenuPageAdmin";

import "./App.css";

// Admin Layout
const AdminLayout = ({ children, onLogout }) => (
  <>
    <AdminNavbar onLogout={onLogout} />
    <div className="admin-page-wrapper">{children}</div>
  </>
);

// Admin Route Guard
const ProtectedAdminRoute = ({ userRole, children }) => {
  return userRole === "admin" ? children : <Navigate to="/" replace />;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

  return (
    <div className="app-container">
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
        {/* Removed the admin dashboard route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menuadmin" element={<MenuAdmin />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin/users" element={<UserAdminPage />} />
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
