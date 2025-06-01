import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../Header/Logo.css";

const AdminLogo = () => {
  return (
    <div className="header-logo">
      <Link to="/" className="logo-container" aria-label="Homepage">
        <div className="logo-stack">
          <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
          <span className="nav-logo">Admin Panel</span>
        </div>
      </Link>
    </div>
  );
};

export default AdminLogo;
