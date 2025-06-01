import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navbar/Navbar.css";

const StaffNavbarOnly = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar staff-navbar" role="navigation" aria-label="Staff Navigation">
      {/* Mobile menu toggle */}
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
        <li role="none">
          <Link to="/staff/till" role="menuitem" onClick={() => setMenuOpen(false)}>
            Till
          </Link>
        </li>
        <li role="none">
          <Link to="/staff/orders" role="menuitem" onClick={() => setMenuOpen(false)}>
            Orders
          </Link>
        </li>
      </ul>

      {/* No cart for staff */}
      <div className="nav-actions">
      </div>
    </nav>
  );
};

export default StaffNavbarOnly;
