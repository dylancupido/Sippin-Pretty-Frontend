import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import logo from "../../assets/logo.png";

// Staff navigation bar component
const StaffNavbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle state

  // Toggle menu open/close on small screens
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar" role="navigation" aria-label="Staff Navigation">
      {/* Left: Logo and label */}
      <div className="navbar-left">
        <Link to="/" className="logo-container" aria-label="Homepage">
          <div className="logo-stack">
            <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
            <span className="nav-logo">Staff Panel</span>
          </div>
        </Link>
      </div>

      {/* Toggle button for mobile menu */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      {/* Navigation links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`} role="menubar">
        <li>
          <Link to="/staff/orders">Orders</Link>
        </li>
        <li>
          <Link to="/till">Till</Link>
        </li>
        <li>
          <Link to="/deliveries">Deliveries</Link>
        </li>
      </ul>

      {/* Logout action button */}
      <div className="nav-actions">
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StaffNavbar;
