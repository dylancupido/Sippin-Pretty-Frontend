// src/layouts/AdminLayout.jsx
import React from "react";
import AdminNavBar from "../components/Navbar/AdminNavBar";

const AdminLayout = ({ children, onLogout }) => {
  return (
    <>
      <AdminNavBar onLogout={onLogout} />
      <main className="admin-content">{children}</main>
    </>
  );
};

export default AdminLayout;
