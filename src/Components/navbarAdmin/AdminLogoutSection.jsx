import React from "react";
import "../Header/LoginSection.css";

const AdminLogoutSection = ({ onLogout }) => {
  return (
    <div className="login-section">
      <button className="logout-button" onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  );
};

export default AdminLogoutSection;
