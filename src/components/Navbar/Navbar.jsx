import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../assets/logo.png";
import accountIcon from "../../assets/account.png";
import "./Navbar.css";

const Navbar = ({
  loggedIn,
  showRegisterModal,
  showLoginModal,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo-container" aria-label="Homepage">
          <div className="logo-stack">
            <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
            <span className="nav-logo">Sippin'pretty</span>
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

      {/* Navigation links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`} role="menubar">
        <li role="none">
          <Link to="/" role="menuitem" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li role="none">
          <Link to="/menu" role="menuitem" onClick={() => setMenuOpen(false)}>
            Menu
          </Link>
        </li>
        <li role="none">
          <a href="#" role="menuitem" onClick={() => setMenuOpen(false)}>
            About Us
          </a>
        </li>
      </ul>

      {/* Right actions: Cart & Account */}
      <div className="nav-actions">
        <Link to="/cart" className="nav-cart" aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
        </Link>

        <div className="nav-account">
          <Dropdown align="end">
            <Dropdown.Toggle
              className="account-button"
              id="dropdown-account"
              as="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={accountIcon} alt="Account Icon" className="account-icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {loggedIn ? (
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item onClick={showRegisterModal}>Register</Dropdown.Item>
                  <Dropdown.Item onClick={showLoginModal}>Login</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
