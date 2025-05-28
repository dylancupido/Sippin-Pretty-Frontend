import React, { useState } from "react";
import "./Navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../assets/logo.png";
import accountIcon from "../../assets/account.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-left">
        <a href="#" className="logo-container" aria-label="Homepage">
          <div className="logo-stack">
            <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
            <span className="nav-logo">Sippin'pretty</span>
          </div>
        </a>
      </div>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`} role="menubar">
        <li role="none">
          <a role="menuitem" href="/" onClick={() => setMenuOpen(false)}>
            Home
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href="/menu" onClick={() => setMenuOpen(false)}>
            Menu
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href="/Orders" onClick={() => setMenuOpen(false)}>
            Orders
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href="/Orders" onClick={() => setMenuOpen(false)}>
            Users
          </a>
        </li>
      </ul>

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
              <img
                src={accountIcon}
                alt="Account Icon"
                className="account-icon"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {loggedIn ? (
                <Dropdown.Item disabled>Logged in</Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item as={Link} to="/cusRegister">
                    Register
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/login">
                    Login
                  </Dropdown.Item>
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
