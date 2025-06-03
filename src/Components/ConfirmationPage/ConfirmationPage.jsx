import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";

// Component to display booking confirmation details
const ConfirmationPage = () => {
  const { state } = useLocation(); // Access navigation state passed from previous page
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // If no booking data was passed, show fallback message
  if (!state) {
    return (
      <div className="confirmation-container">
        <h2>No booking data found.</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  // Destructure booking details from navigation state
  const {
    fullName,
    email,
    phoneNumber,
    date,
    time,
    guests,
    table,
    totalPrice,
    cancellationFeeNotice,
  } = state;

  return (
    <div className="confirmation-container">
      {/* Confirmation Icon */}
      <div className="confirmation-icon">
        <i className="fas fa-crown"></i>
      </div>

      {/* Main Title */}
      <h1>Booking Confirmed</h1>
      <p>
        Thank you, <strong>{fullName}</strong>! Your table has been reserved.
      </p>

      {/* Booking Details */}
      <div className="confirmation-details">
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Guests:</strong> {guests}
        </p>
        <p>
          <strong>Table:</strong> {table?.name} (Capacity: {table?.capacity})
        </p>
        <p>
          <strong>Total Price:</strong> R{totalPrice}
        </p>
        <p>
          <strong>Contact Info:</strong> {email} | {phoneNumber}
        </p>
      </div>

      {/* Optional Cancellation Policy */}
      {cancellationFeeNotice && (
        <div className="cancellation-note">
          <strong>Cancellation Policy:</strong>
          <br />
          {cancellationFeeNotice}
        </div>
      )}

      {/* Action Buttons */}
      <div className="confirmation-actions">
        <button onClick={() => navigate("/")}>Return to Home</button>
        <button onClick={() => window.print()}>Print Confirmation</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
