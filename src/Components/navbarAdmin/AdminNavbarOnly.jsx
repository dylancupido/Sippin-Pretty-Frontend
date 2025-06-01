import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navbar/Navbar.css";

const AdminNavbarOnly = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar admin-navbar" role="navigation" aria-label="Admin Navigation">
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
          <Link to="/menuadmin" role="menuitem" onClick={() => setMenuOpen(false)}>
            Manage Menu
          </Link>
        </li>
        <li role="none">
          <Link to="/admin/home" role="menuitem" onClick={() => setMenuOpen(false)}>
            Manage Home
          </Link>
        </li>
        <li role="none">
          <Link to="/admin/orders" role="menuitem" onClick={() => setMenuOpen(false)}>
            Orders
          </Link>
        </li>
        <li role="none">
          <Link to="/admin/users" role="menuitem" onClick={() => setMenuOpen(false)}>
            Users
          </Link>
        </li>
      </ul>

      {/* No cart for admin */}
      <div className="nav-actions">
      </div>
    </nav>
  );
};

export default AdminNavbarOnly;
