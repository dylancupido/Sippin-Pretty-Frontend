import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    section: 'window',
    specialRequests: ''
  });

  const [bookingFee, setBookingFee] = useState(null);
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (formData.date) {
      const bookingDate = new Date(formData.date);
      const currentDate = new Date();
      const timeDiff = bookingDate.setHours(0, 0, 0, 0) - currentDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setBookingFee(daysDiff > 0 ? 0 : 250);
    } else {
      setBookingFee(null);
    }
  }, [formData.date]);

  // Validate form fields and set errors
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) newErrors.email = 'Please enter a valid email.';

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phone)) newErrors.phone = 'Phone number should be 10 digits.';

    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.time) newErrors.time = 'Time is required.';

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error on field change
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Booking submitted:', formData);
      navigate('/confirmation');
    }
  };

  // Disable submit button if errors exist or required fields empty
  const isSubmitDisabled = () => {
    const requiredFields = ['name', 'email', 'phone', 'date', 'time'];
    return (
      requiredFields.some(field => !formData[field]) ||
      Object.keys(errors).some(key => errors[key])
    );
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Reserve Your Table</h1>
        <p>Experience the perfect blend at Sippin' Pretty</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="\d{10}"
            placeholder="e.g. 0812345678"
            required
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <div className="error-message">{errors.date}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            {errors.time && <div className="error-message">{errors.time}</div>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'person' : 'people'}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group section-group">
          <label>Preferred Section</label>
          <div className="section-options">
            <label className="section-option">
              <input
                type="radio"
                name="section"
                value="window"
                checked={formData.section === 'window'}
                onChange={handleChange}
              />
              <div className="option-content">
                <span className="icon">🪟</span>
                <span>Window View</span>
              </div>
            </label>

            <label className="section-option">
              <input
                type="radio"
                name="section"
                value="counter"
                checked={formData.section === 'counter'}
                onChange={handleChange}
              />
              <div className="option-content">
                <span className="icon">☕</span>
                <span>Near Counter</span>
              </div>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            maxLength={300}
            placeholder="e.g. Birthday setup, allergies..."
          />
        </div>

        {bookingFee !== null && (
          <div className={`fee-message ${bookingFee === 0 ? 'free' : 'paid'}`}>
            <strong>Booking Fee: </strong> {bookingFee === 0 ? 'Free' : `R${bookingFee}`}
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitDisabled()}
          aria-disabled={isSubmitDisabled()}
        >
          Book Table
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
