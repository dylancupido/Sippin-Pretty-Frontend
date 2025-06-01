import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import accountIcon from "../../assets/account.png";
import "./LoginSection.css";

const LoginSection = ({
  loggedIn,
  showRegisterModal,
  showLoginModal,
  onLogout,
  userRole,
}) => {
  return (
    <div className="login-section">
      {/* Account dropdown */}
      <Dropdown align="end">
        <Dropdown.Toggle as="button" className="account-button">
          <img src={accountIcon} alt="Account" className="account-icon" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {loggedIn ? (
            <>
              <Dropdown.Item as="button" onClick={onLogout} className="dropdown-item">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Dropdown.Item>
              {userRole === "admin" && (
                <>
                  <Dropdown.Item as={Link} to="/admin/home" className="dropdown-item">
                    <i className="fas fa-cog"></i> Admin Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/menuadmin" className="dropdown-item">
                    <i className="fas fa-utensils"></i> Manage Menu
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/users" className="dropdown-item">
                    <i className="fas fa-users"></i> Manage Users
                  </Dropdown.Item>
                </>
              )}
              {userRole === "staff" && (
                <>
                  <Dropdown.Item as={Link} to="/staff/orders" className="dropdown-item">
                    <i className="fas fa-clipboard-list"></i> Orders
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/staff/tables" className="dropdown-item">
                    <i className="fas fa-chair"></i> Tables
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/menuadmin" className="dropdown-item">
                    <i className="fas fa-utensils"></i> Manage Menu
                  </Dropdown.Item>
                </>
              )}
            </>
          ) : (
            <>
              <Dropdown.Item as="button" onClick={showLoginModal} className="dropdown-item">
                <i className="fas fa-sign-in-alt"></i> Login
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={showRegisterModal} className="dropdown-item">
                <i className="fas fa-user-plus"></i> Register
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LoginSection;
