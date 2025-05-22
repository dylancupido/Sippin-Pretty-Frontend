import React from 'react';
import './Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../../assets/logo.png';
import accountIcon from '../../assets/account.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

 // Adjust path as needed


const Navbar = ({
  loggedIn = false,
  showRegisterModal = () => {},
  showLoginModal = () => {}
}) => {
  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      {/* Left side: Logo */}
      <div className="navbar-left">
        <a href="#" className="logo-container" aria-label="Homepage">
          <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
          <span className="nav-logo">Sippin'pretty</span>
        </a>
      </div>

      {/* Center: Navigation links */}
      <ul className="nav-links" role="menubar">
        <li role="none"><a role="menuitem" href="/">Home</a></li>
        <li role="none"><a role="menuitem" href="/menu">Menu</a></li>
        <li role="none"><a role="menuitem" href="/till">Till</a></li>
        <li role="none"><a role="menuitem" href="#">About Us</a></li>
      </ul>

      {/* Right side: Cart & Account */}
      <div className="nav-actions">
        <a href="#" className="nav-cart" aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
        </a>

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
