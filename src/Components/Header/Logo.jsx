import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="header-logo">
      <Link to="/" className="logo-container" aria-label="Homepage">
        <div className="logo-stack">
          <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
          <span className="nav-logo">Sippin'pretty</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
