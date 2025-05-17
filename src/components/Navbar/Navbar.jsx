import React from 'react';
import './Navbar.css';
import {dropdown} from 'react-d'
import logo from '../../assets/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container">
          <img src={logo} alt="Sippin' Pretty Logo" className="logo" />
          <div className="nav-logo">Sippin'pretty</div>
        </div>
      </div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Menu</a></li>
        <li><a href="#">Order</a></li>
        <li><a href="#">About Us</a></li>
      </ul> 

      <div className="nav-actions">
        <div className="nav-cart">
          <a href="#"><i className="fas fa-shopping-cart"></i></a>
        </div>
        <div className="nav-user">
          <i className="fas fa-user-circle"></i>
          <div className="user-dropdown">
            <a href="#">Login</a>
            <a href="#">Register</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
