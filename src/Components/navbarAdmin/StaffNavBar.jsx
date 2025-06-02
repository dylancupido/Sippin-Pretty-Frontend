import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import logo from "../../assets/logo.png";

const StaffNavbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar" role="navigation" aria-label="Staff Navigation">
      <div className="navbar-left">
        <Link to="/" className="logo-container" aria-label="Homepage">
          <div className="logo-stack">
            <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
            <span className="nav-logo">Staff Panel</span>
          </div>
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`} role="menubar">
        <li role="none"><Link to="/booking" role="menuitem">Orders</Link></li>
        <li role="none"><Link to="/menu" role="menuitem">Till</Link></li>
      </ul>

      <div className="nav-actions">
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default StaffNavbar;
