import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Coffee Shop Dashboard</h1>
        <p className="dashboard-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      <div className="dashboard-content">
        <div className="empty-dashboard-message">
          <i className="fas fa-coffee fa-3x"></i>
          <h2>Welcome to the Admin Dashboard</h2>
          <p>This area is under development. Check back soon for updates!</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
