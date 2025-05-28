import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

const initialTables = [
  { id: 1, name: "Table 1", type: "individual", capacity: 2 },
  { id: 2, name: "Table 2", type: "individual", capacity: 2 },
  { id: 3, name: "Table 3", type: "individual", capacity: 4 },
  { id: 7, name: "Booth 1 - Table 1", type: "booth1", capacity: 4 },
  { id: 8, name: "Booth 1 - Table 2", type: "booth1", capacity: 4 },
  { id: 9, name: "Booth 2 - Table 1", type: "booth2", capacity: 4 },
  { id: 10, name: "Booth 2 - Table 2", type: "booth2", capacity: 4 },
  { id: 11, name: "Booth 3 - Table 1", type: "booth3", capacity: 6 },
  { id: 12, name: "Booth 3 - Table 2", type: "booth3", capacity: 6 },
  { id: 13, name: "Booth 4 - Table 1", type: "booth4", capacity: 8 },
  { id: 14, name: "Booth 4 - Table 2", type: "booth4", capacity: 8 },
];

// Mock existing bookings to simulate reserved tables for specific date/time
const mockBookings = [
  { tableId: 2, date: '2025-05-30', time: '12:00' },
  { tableId: 5, date: '2025-05-30', time: '12:00' },
  { tableId: 8, date: '2025-05-30', time: '14:30' },
  { tableId: 13, date: '2025-05-31', time: '15:00' },
];

const BookingPage = () => {
  const navigate = useNavigate();

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
    const startHour = 9;
    const endHour = 16;
    const slots = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, ]) {
        if (hour === endHour && minute > 0) continue; // Skip last half hour slot if not valid
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
      }
    }

    return slots;
  };

  const checkAvailability = (guests, date, time) => {
    if (!date || !time) return [];

    // Filter tables by capacity
    const suitableTables = initialTables.filter(table => table.capacity >= guests);

    // Exclude tables already booked at that date and time
    const availableTables = suitableTables.filter(table => {
      return !mockBookings.some(
        booking => booking.tableId === table.id && booking.date === date && booking.time === time
      );
    });

    // Price calculation: base R50, +20% if after 17:00 (not used here but you can adjust)
    const hour = parseInt(time.split(':')[0], 10);
    const basePrice = 50;

    return availableTables.map(table => ({
      ...table,
      available: true,
      finalPrice: hour >= 17 ? Math.round(basePrice * 1.2) : basePrice,
    }));
  };

  useEffect(() => {
    if (formData.date && formData.time && formData.guests) {
      const tables = checkAvailability(formData.guests, formData.date, formData.time);
      setAvailableTables(tables);
      setSelectedTable(null);
      setTotalPrice(0);
    } else {
      setAvailableTables([]);
      setSelectedTable(null);
      setTotalPrice(0);
    }
  }, [formData.date, formData.time, formData.guests]);

  useEffect(() => {
    if (selectedTable) {
      const table = availableTables.find(t => t.id === selectedTable);
      setTotalPrice(table ? table.finalPrice : 0);
    } else {
      setTotalPrice(0);
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
      // Here you can add the booking to mockBookings or API call
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
        <p>Book your table now and enjoy your coffee break with us!</p>
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
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            max="12"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>

        <div className="available-tables">
          <h2>Available Tables</h2>
          {availableTables.length === 0 ? (
            <p>No tables available for selected date, time and guests.</p>
          ) : (
            <ul>
              {availableTables.map(table => (
                <li key={table.id}>
                  <label>
                    <input
                      type="radio"
                      name="table"
                      value={table.id}
                      checked={selectedTable === table.id}
                      onChange={() => setSelectedTable(table.id)}
                    />
                    {table.name} - Capacity: {table.capacity} - Price: R{table.finalPrice}
                  </label>
                </li>
              ))}
            </ul>
          )}
          {errors.table && <div className="error-message">{errors.table}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            maxLength={200}
          ></textarea>
        </div>

        <div className="total-price">
          <h3>Total Price: R{totalPrice}</h3>
          <small>(R50 refundable deposit included)</small>
        </div>

        <button type="submit" disabled={isSubmitDisabled()}>
          Reserve Table
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
