import React, { useEffect, useState } from "react";
import "./AdminBookingPage.css";

// Component: Admin Booking Management Page
const AdminBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from backend on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "https://sippinpretty.fly.dev/api/Bookings"
        );
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Delete a booking by ID
  const handleDeleteBooking = async (id) => {
    try {
      const response = await fetch(
        `https://sippinpretty.fly.dev/api/Bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setBookings(bookings.filter((booking) => booking.id !== id));
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="admin-booking-container">
      <h2>Bookings</h2>

      {/* Loading indicator */}
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Guests</th>
              <th>Date</th>
              <th>Time</th>
              <th>Table</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render booking rows */}
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.fullName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phoneNumber}</td>
                  <td>{booking.guests}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.time}</td>
                  <td>{booking.tableName || booking.tableId}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookingPage;
