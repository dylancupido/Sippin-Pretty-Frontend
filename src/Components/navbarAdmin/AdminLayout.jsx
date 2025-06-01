// src/layouts/AdminLayout.jsx
import React from "react";
import AdminNavBar from "../components/Navbar/AdminNavBar";

const AdminLayout = ({ children, onLogout }) => {
  // If there's any logic that redirects to the dashboard, update it
  // For example:
  // const defaultAdminRoute = "/admin/dashboard"; // Old
  // const defaultAdminRoute = "/admin/home"; // New

  return (
    <>
      <AdminNavBar onLogout={onLogout} />
      <main className="admin-content">
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
