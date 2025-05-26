import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();

  // Sample table data with capacity and base price
  const tables = [
    { id: 1, name: "Table 1", capacity: 2, price: 100, available: true },
    { id: 2, name: "Table 2", capacity: 4, price: 180, available: true },
    { id: 3, name: "Table 3", capacity: 6, price: 250, available: true },
    { id: 4, name: "Booth 1", capacity: 4, price: 200, available: true },
    { id: 5, name: "Booth 2", capacity: 6, price: 280, available: true },
    { id: 6, name: "Window 1", capacity: 2, price: 150, available: true },
    { id: 7, name: "Window 2", capacity: 4, price: 220, available: true },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split('T')[0];

  const generateTimeSlots = () => {
    const startHour = 12;
    const endHour = 20;
    const slots = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, 30]) {
        if (hour === endHour && minute > 0) continue; // Skip 20:30
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
      }
    }

    return slots;
  };

  const checkAvailability = (guests, time) => {
    const suitableTables = tables
      .filter(table => table.capacity >= guests)
      .map(table => ({
        ...table,
        available: Math.random() > 0.3,
        finalPrice: time && parseInt(time.split(':')[0]) >= 17 ?
          Math.round(table.price * 1.2) : table.price
      }));
    return suitableTables;
  };

  useEffect(() => {
    if (formData.time && formData.guests) {
      const tables = checkAvailability(formData.guests, formData.time);
      setAvailableTables(tables);
      setSelectedTable(null);
      setTotalPrice(0);
    }
  }, [formData.time, formData.guests]);

  useEffect(() => {
    if (selectedTable) {
      const table = availableTables.find(t => t.id === selectedTable);
      setTotalPrice(table ? table.finalPrice : 0);
    }
  }, [selectedTable, availableTables]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email.';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits.';
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.time) newErrors.time = 'Time is required.';
    if (!selectedTable) newErrors.table = 'Please select a table.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const bookingDetails = {
        ...formData,
        table: availableTables.find(t => t.id === selectedTable),
        totalPrice
      };
      console.log('Booking submitted:', bookingDetails);
      navigate('/confirmation', { state: bookingDetails });
    }
  };

  const isSubmitDisabled = () => {
    const requiredFields = ['name', 'email', 'phone', 'date', 'time'];
    return (
      requiredFields.some(field => !formData[field]) ||
      Object.keys(errors).some(key => errors[key]) ||
      !selectedTable
    );
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Reserve Your Table</h1>
        <p>Choose from available tables based on your party size</p>
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
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>
              {generateTimeSlots().map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'person' : 'people'}
              </option>
            ))}
          </select>
        </div>

        {formData.time && availableTables.length > 0 && (
          <div className="form-group">
            <label>Available Tables ({formData.guests} people)</label>
            <div className="tables-grid">
              {availableTables.map(table => (
                <div 
                  key={table.id}
                  className={`table-card ${selectedTable === table.id ? 'selected' : ''} ${!table.available ? 'unavailable' : ''}`}
                  onClick={() => table.available && setSelectedTable(table.id)}
                >
                  <h3>{table.name}</h3>
                  <p>Capacity: {table.capacity} people</p>
                  <p>Price: R{table.finalPrice}</p>
                  {!table.available && <span className="unavailable-badge">Booked</span>}
                </div>
              ))}
            </div>
            {errors.table && <div className="error-message">{errors.table}</div>}
          </div>
        )}

        {formData.time && availableTables.length === 0 && (
          <div className="no-tables-message">
            No available tables for {formData.guests} people at {formData.time}. 
            Please try a different time or party size.
          </div>
        )}

        {totalPrice > 0 && (
          <div className="price-summary">
            <h3>Booking Summary</h3>
            <p>Table: {availableTables.find(t => t.id === selectedTable)?.name || 'Not selected'}</p>
            <p>Total Price: <strong>R{totalPrice}</strong></p>
            <p className="note">Note: This includes a R50 reservation deposit</p>
            <p className="cancellation-note">
              Cancellations made within 2 hours of the booking time will incur a fee of R50.
            </p>
          </div>
        )}

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

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitDisabled()}
        >
          Confirm Booking (R{totalPrice || '0'})
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
