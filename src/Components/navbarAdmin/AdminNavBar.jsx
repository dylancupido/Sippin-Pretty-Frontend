import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import logo from "../../assets/logo.png";

function AdminNavBar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar admin-navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-container">
          <div className="logo-stack">
            <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
            <span className="nav-logo">Admin Panel</span>
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
        <li><Link to="/menuadmin" onClick={() => setMenuOpen(false)}>Manage Menu</Link></li>
        <li><Link to="/admin/home" onClick={() => setMenuOpen(false)}>Manage Home</Link></li>
        <li><Link to="/admin/orders" onClick={() => setMenuOpen(false)}>Orders</Link></li>
        <li><Link to="/admin/users" onClick={() => setMenuOpen(false)}>Users</Link></li>
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

export default AdminNavBar;
