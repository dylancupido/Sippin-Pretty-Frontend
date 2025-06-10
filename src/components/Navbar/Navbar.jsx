import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../assets/logo.png";
import accountIcon from "../../assets/account.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const NOTIFY_URL = "http://localhost:5010/api/Notifications";

const Navbar = ({ loggedIn = false, onLogout }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(NOTIFY_URL);
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await fetch(`${NOTIFY_URL}/${id}`, { method: "DELETE" });
      fetchNotifications();
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-left">
        <Link to="/" className="logo-container" aria-label="Homepage">
          <div className="logo-stack">
            <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
            <span className="nav-logo">Sippin'pretty</span>
          </div>
        </Link>
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
          <a role="menuitem" href="/aboutus" onClick={() => setMenuOpen(false)}>
            About Us
          </a>
        </li>
      </ul>

      <div className="nav-actions">
        <div className="nav-notification">
          <button
            className="notification-button"
            onClick={toggleNotifications}
            aria-label="View Notifications"
          >
            <i className="fas fa-bell"></i>
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              {notifications.length === 0 ? (
                <p className="notification-empty">No notifications</p>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.notificationID} className="notification-item">
                    <span>{notif.message}</span>
                    <button
                      className="view-button"
                      onClick={() => deleteNotification(notif.notificationID)}
                    >
                      X
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

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
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
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
