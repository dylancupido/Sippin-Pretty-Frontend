import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import logo from "../../assets/logo.png";

function StaffNavBar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar staff-navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-container">
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

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/staff/orders" onClick={() => setMenuOpen(false)}>Orders</Link></li>
        <li><Link to="/staff/tables" onClick={() => setMenuOpen(false)}>Tables</Link></li>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>View Site</Link></li>
      </ul>

      <div className="nav-actions">
        <button className="logout-button" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  );
}

export default StaffNavBar;
