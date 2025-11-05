import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import logo from "../../assets/logo.png"; // App logo

// Component: Admin Navigation Bar
function AdminNavBar({ onLogout }) {
  return (
    <nav className="navbar">
      {/* Left: Logo and title */}
      <div className="navbar-left">
        <Link to="/" className="logo-container">
          <div className="logo-stack">
            <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
            <span className="nav-logo">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/admin/promotions">Manage Promotions</Link>
        </li>
        <li>
          <Link to="/menuadmin">Manage Menu</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/bookings">Bookings</Link>
        </li>
      </ul>

      {/* Right: Logout button */}
      <div className="nav-actions">
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavBar;
