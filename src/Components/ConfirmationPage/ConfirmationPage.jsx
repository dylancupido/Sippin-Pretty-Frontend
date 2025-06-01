import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css'; // Optional CSS

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
    name,
    email,
    phone,
    date,
    time,
    guests,
    specialRequests,
    table,
    totalPrice,
    cancellationFeeNotice
  } = state;

  return (
    <div className="confirmation-container">
      <h1>Booking Confirmed </h1>
      <p>Thank you, <strong>{name}</strong>! Your table has been reserved.</p>

      <div className="confirmation-details">
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Table:</strong> {table?.name} (Capacity: {table?.capacity})</p>
        <p><strong>Total Price:</strong> R{totalPrice}</p>
        {specialRequests && <p><strong>Special Requests:</strong> {specialRequests}</p>}
        <p><strong>Contact Info:</strong> {email} | {phone}</p>
      </div>

      {cancellationFeeNotice && (
        <div className="cancellation-note">
          <strong>Cancellation Policy:</strong><br />
          {cancellationFeeNotice}
        </div>
      )}

      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default ConfirmationPage;
