import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAdminPage.css";

const UserAdminPage = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // Track loading status
  const navigate = useNavigate(); // Navigation hook

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://sippinpretty.fly.dev/api/Users");
        const data = await response.json();
        setUsers(data); // Set retrieved user data
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Stop loading spinner regardless of result
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user by ID
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://sippinpretty.fly.dev/api/Users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove user from UI after successful deletion
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Navigate to staff registration page
  const handleAddStaff = () => {
    navigate("/admin/registerstaff");
  };

  return (
    <div className="user-admin-container">
      <h2>Users</h2>

      {/* Add staff button */}
      <button className="add-staff-button" onClick={handleAddStaff}>
        + Add Staff Member
      </button>

      {/* Conditional rendering based on loading status */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAdminPage;
