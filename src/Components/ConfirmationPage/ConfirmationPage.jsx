import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="confirmation-container">
        <h2>No booking data found.</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const {
    fullName,
    email,
    phoneNumber,
    date,
    time,
    guests,
    table,
    totalPrice,
    cancellationFeeNotice
  } = state;

  return (
    <div className="confirmation-container">
      <div className="confirmation-icon">
        <i className="fas fa-crown"></i>
      </div>
      <h1>Booking Confirmed</h1>
      <p>Thank you, <strong>{fullName}</strong>! Your table has been reserved.</p>

      <div className="confirmation-details">
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Table:</strong> {table?.name} (Capacity: {table?.capacity})</p>
        <p><strong>Total Price:</strong> R{totalPrice}</p>
        <p><strong>Contact Info:</strong> {email} | {phoneNumber}</p>
      </div>

      {cancellationFeeNotice && (
        <div className="cancellation-note">
          <strong>Cancellation Policy:</strong><br />
          {cancellationFeeNotice}
        </div>
      )}

      <div className="confirmation-actions">
        <button onClick={() => navigate('/')}>Return to Home</button>
        <button onClick={() => window.print()}>Print Confirmation</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
