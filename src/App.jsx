import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Navigation Components for different user roles
import Navbar from "./ccomponents/Navbar/Navbar.js";
import AdminNavbar from "./ccomponents/navbarAdmin/AdminNavBar.js";
import StaffNavbar from "./ccomponents/navbarAdmin/StaffNavBar.js";

// Pagesb
import CartConfirmationPage from "./ccomponents/ConfirmationPage/CartConfirmationPage.js";
import HomePage from "./ccomponents/HomePage.js";
import Menu from "./ccomponents/MenuPage.js";
import CartPage from "./ccomponents/CartPage.js";
import BookingPage from "./ccomponents/BookingPage/BookingPage.js";
import PaymentPage from "./ccomponents/PaymentPage/PaymentPage.js";
import ConfirmationPage from "./ccomponents/ConfirmationPage/ConfirmationPage.js";
import MenuAdmin from "./ccomponents/MenuPageAdmin.js";
import UserAdminPage from "./ccomponents/navbarAdmin/UserAdminPage.js";
import AdminDashboard from "./ccomponents/navbarAdmin/AdminDashboard.js";
import DeliveryManagement from "./ccomponents/navbarAdmin/DeliveryManagement.js";
import OrdersPage from "./ccomponents/OrdersPage.js";
import LoginForm from "./ccomponents/LoginPage.js";
import CusRegisterForm from "./ccomponents/RegisterPage.js";
import { AboutUs } from "./ccomponents/AboutUs.js";
import TillPage from "./ccomponents/TillPage.jsx";
import OrderItemsAdminPage from "./ccomponents/StaffOrders.js";
import StaffRegisterForm from "./ccomponents/RegisterStaff.js";
import PaymentPageCart from "./ccomponents/PaymentPage/PaymentPageCart.js";
import DeliveriesPage from "./ccomponents/DeliveriesPage.js";
import AdminBookingPage from "./ccomponents/navbarAdmin/AdminBookingPage.js";
import Footer from "./ccomponents/Footer/Footer.js";
import "./App.css";
import AdminPromotionsSlider from "./ccomponents/Promos/AdminPromotionSlider.js";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );
  const [userRole, setUserRole] = useState(() =>
    (localStorage.getItem("role") || "user").toLowerCase()
  );
  const [cart, setCart] = useState([]);

  // Check token validity and restore cart on app load
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

  // Save cart to localStorage when it changes
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart]);

  // Handle successful login
  const handleLogin = (role) => {
    setLoggedIn(true);
    setUserRole(role.toLowerCase());

    const userId = localStorage.getItem("userId");
    if (userId) {
      const savedCart = localStorage.getItem(`cart_${userId}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  };

  // Clear session and cart on logout
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

  // Add item to cart with quantity tracking
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
      {/* Display current role and login status */}
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

      {/* Load appropriate navbar based on role */}
      {userRole === "admin" ? (
        <AdminNavbar onLogout={handleLogout} />
      ) : userRole === "staff" ? (
        <StaffNavbar onLogout={handleLogout} />
      ) : (
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      )}

      {/* Main content wrapper */}
      <main className="main-content">
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/menu"
            element={<Menu onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} setCart={setCart} />}
          />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/cart-confirmation" element={<CartConfirmationPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/till" element={<TillPage />} />
          <Route path="/staff/orders" element={<OrderItemsAdminPage />} />
          <Route path="/admin/registerstaff" element={<StaffRegisterForm />} />
          <Route path="/cartpayment" element={<PaymentPageCart />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
          <Route path="/admin/bookings" element={<AdminBookingPage />} />
          <Route path="/admin/promotions" element={<AdminPromotionsSlider />} />

          {/* Admin-only routes */}
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
              userRole === "admin" ? (
                <OrdersPage />
              ) : (
                <Navigate to="/" replace />
              )
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

          {/* Auth routes */}
          <Route
            path="/login"
            element={
              <LoginForm setLoggedIn={setLoggedIn} handleLogin={handleLogin} />
            }
          />
          <Route path="/cusRegister" element={<CusRegisterForm />} />
        </Routes>
      </main>

      {/* Footer - appears on all pages except auth pages */}
      {!location.pathname.includes("/login") &&
        !location.pathname.includes("/cusRegister") &&
        !location.pathname.includes("/admin/registerstaff") && <Footer />}
    </div>
  );
}

export default App;
