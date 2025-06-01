import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Logo from "./Components/Header/Logo";
import LoginSection from "./Components/Header/LoginSection";
import Navbar from "./Components/Navbar/Navbar";
import AdminLogo from "./Components/navbarAdmin/AdminLogo";
import AdminLogoutSection from "./Components/navbarAdmin/AdminLogoutSection";
import AdminNavbarOnly from "./Components/navbarAdmin/AdminNavbarOnly";
import StaffLogo from "./Components/navbarAdmin/StaffLogo";
import StaffLogoutSection from "./Components/navbarAdmin/StaffLogoutSection";
import StaffNavbarOnly from "./Components/navbarAdmin/StaffNavbarOnly";

import HomePage from "./Components/HomePage";
import Menu from "./Components/MenuPage";
import CartPage from "./Components/CartPage";
import BookingPage from "./Components/BookingPage/BookingPage";
import PaymentPage from "./Components/PaymentPage/PaymentPage";
import ConfirmationPage from "./Components/ConfirmationPage/ConfirmationPage";
import MenuAdmin from "./Components/MenuPageAdmin";
import UserAdminPage from "./Components/navbarAdmin/UserAdminPage";
import ManageHomePage from "./Components/navbarAdmin/ManageHomePage";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  // Check for saved login state on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData && userData.loggedIn) {
          setLoggedIn(true);
          setUserRole(userData.role || 'user');
          console.log(`Restored login state: ${userData.role}`);
        }
      } catch (e) {
        console.error('Failed to parse saved user data', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handle body scroll when modal is open
  useEffect(() => {
    if (showLogin || showRegister) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showLogin, showRegister]);

  const handleLogin = (role) => {
    setLoggedIn(true);
    setUserRole(role);
    setShowLogin(false);

    // Save login state with more details
    const userData = {
      role,
      loggedIn: true,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(userData));

    // Log for debugging
    console.log(`Logged in as ${role}`);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole("user");
    localStorage.removeItem('user');

    // Log for debugging
    console.log('Logged out');
  };

  const handleAddToCart = (item) => setCart((prev) => [...prev, item]);

  // Protected route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    console.log("Current user role:", userRole);
    console.log("Allowed roles:", allowedRoles);
    console.log("Is logged in:", loggedIn);
    console.log("Is role allowed:", allowedRoles.includes(userRole));

    if (!loggedIn || !allowedRoles.includes(userRole)) {
      console.log("Access denied, redirecting to home");
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    console.log("Access granted");
    return children;
  };

  return (
    <>
      <div className="app-container">
        {/* Logo, LoginSection, and Navbar - Only render based on role */}
        {userRole === "admin" ? (
          <div className="top-bar">
            <AdminLogo />
            <AdminNavbarOnly />
            <AdminLogoutSection onLogout={handleLogout} />
          </div>
        ) : userRole === "staff" ? (
          <div className="top-bar">
            <StaffLogo />
            <StaffNavbarOnly />
            <StaffLogoutSection onLogout={handleLogout} />
          </div>
        ) : (
          <div className="top-bar">
            <Logo />
            <Navbar />
            <LoginSection
              loggedIn={loggedIn}
              showRegisterModal={() => setShowRegister(true)}
              showLoginModal={() => setShowLogin(true)}
              onLogout={handleLogout}
              userRole={userRole}
            />
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/menuadmin"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <MenuAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageHomePage />
              </ProtectedRoute>
            }
          />

          {/* Staff Routes */}
          <Route
            path="/staff/orders"
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <div>Staff Orders Page</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/till"
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <div>Staff Till Page</div>
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Modals - Outside app-container for proper overlay */}
      {/* Register Modal */}
      {showRegister && (
        <div className="modal-backdrop" onClick={() => setShowRegister(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Register</h2>
            <p>Register form goes here.</p>
            <button onClick={() => setShowRegister(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-backdrop" onClick={() => setShowLogin(false)}>
          <div className="modal-content login-modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Welcome Back!</h2>
            <p className="modal-subtitle">Choose a role to continue:</p>

            <div className="role-buttons">
              <button
                className="role-button admin-role"
                onClick={() => handleLogin("admin")}
              >
                <i className="fas fa-user-shield"></i>
                <span>Admin</span>
                <small>Manage everything</small>
              </button>

              <button
                className="role-button staff-role"
                onClick={() => handleLogin("staff")}
              >
                <i className="fas fa-user-tie"></i>
                <span>Staff</span>
                <small>Handle orders & tables</small>
              </button>

              <button
                className="role-button user-role"
                onClick={() => handleLogin("user")}
              >
                <i className="fas fa-user"></i>
                <span>Customer</span>
                <small>Browse & order</small>
              </button>
            </div>

            <button className="close-modal-btn" onClick={() => setShowLogin(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
