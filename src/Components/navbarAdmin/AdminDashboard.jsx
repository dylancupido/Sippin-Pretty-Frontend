import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Mock data for dashboard
  const stats = {
    totalOrders: 156,
    pendingOrders: 12,
    totalRevenue: '$3,245.50',
    newCustomers: 28
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-date">Today: {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-label">Last 30 days</div>
        </div>
        
        <div className="dashboard-card">
          <h3>Pending Orders</h3>
          <div className="stat-value">{stats.pendingOrders}</div>
          <div className="stat-label">Require attention</div>
        </div>
        
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <div className="stat-value">{stats.totalRevenue}</div>
          <div className="stat-label">Last 30 days</div>
        </div>
        
        <div className="dashboard-card">
          <h3>New Customers</h3>
          <div className="stat-value">{stats.newCustomers}</div>
          <div className="stat-label">Last 30 days</div>
        </div>
      </div>
    </div>
  );
};

// This file will be deleted
