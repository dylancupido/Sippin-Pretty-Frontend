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
  { id: 15, name: "Large Group Table 1", type: "large", capacity: 10 },
  { id: 16, name: "Large Group Table 2", type: "large", capacity: 12 },
];

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
      const h = hour.toString().padStart(2, '0');
      slots.push(`${h}:00`);
    }

    return slots;
  };

  const checkAvailability = (guests, date, time) => {
    if (!date || !time) return [];

    const suitableTables = initialTables.filter(table => table.capacity >= guests);

    const availableTables = suitableTables.filter(table => {
      return !mockBookings.some(
        booking => booking.tableId === table.id && booking.date === date && booking.time === time
      );
    });

    return availableTables.map(table => ({
      ...table,
      available: true
    }));
  };

  useEffect(() => {
    const { guests, date, time } = formData;
    if (date && time && guests >= 5 && guests <= 10) {
      const tables = checkAvailability(guests, date, time);
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
      const guestCount = parseInt(formData.guests, 10);
      // Remove the R50 deposit from the calculation
      const dynamicPrice = guestCount * 25;
      setTotalPrice(dynamicPrice);
    } else {
      setTotalPrice(0);
    }
  }, [selectedTable, formData.guests]);

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits (e.g., 0812345678).';
    }
    
    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date is required.';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date.';
      }
      
      // Check if date is more than 3 months in advance
      const threeMonthsLater = new Date();
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
      if (selectedDate > threeMonthsLater) {
        newErrors.date = 'Bookings can only be made up to 3 months in advance.';
      }
    }
    
    // Time validation
    if (!formData.time) {
      newErrors.time = 'Time is required.';
    } else {
      // Check if time is within operating hours (9:00 - 16:00)
      const [hours] = formData.time.split(':');
      const hourNum = parseInt(hours, 10);
      if (hourNum < 9 || hourNum > 16) {
        newErrors.time = 'Please select a time between 9:00 and 16:00.';
      }
    }
    
    // Guest count validation
    if (!formData.guests || formData.guests < 5) {
      newErrors.guests = 'Reservations require at least 5 guests.';
    } else if (formData.guests > 10) {
      newErrors.guests = 'For groups larger than 10, please contact us directly.';
    }
    
    // Table selection validation
    if (!selectedTable) {
      newErrors.table = 'Please select a table.';
    }
    
    // Special requests validation (optional field)
    if (formData.specialRequests && formData.specialRequests.length > 200) {
      newErrors.specialRequests = 'Special requests must be less than 200 characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for guest count
    if (name === 'guests') {
      const guestCount = parseInt(value, 10);
      if (guestCount < 1) {
        setFormData(prev => ({ ...prev, [name]: 1 }));
      } else if (guestCount > 20) {
        setFormData(prev => ({ ...prev, [name]: 20 }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user types
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
      navigate('/payment', { state: bookingDetails });
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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

      <div className="form-group">
        <label htmlFor="guests">Number of Guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="20"
          value={formData.guests}
          onChange={handleChange}
          required
        />
        {errors.guests && <div className="error-message">{errors.guests}</div>}
      </div>

      {formData.guests < 5 ? (
        <div className="walkin-notice">
          <h2>No Reservation Needed</h2>
          <p>Walk-ins are welcome for groups of 1 to 4 guests.</p>
        </div>
      ) : formData.guests > 10 ? (
        <div className="group-too-large">
          <h2>Group Too Large</h2>
          <p>Please contact us directly to arrange seating for groups over 10.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={errors.name ? "input-error" : ""}
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
              className={errors.email ? "input-error" : ""}
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
              className={errors.phone ? "input-error" : ""}
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
                className={errors.date ? "input-error" : ""}
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
                className={errors.time ? "input-error" : ""}
                required
              >
                <option value="">Select a time</option>
                {generateTimeSlots().map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.time && <div className="error-message">{errors.time}</div>}
            </div>
          </div>

          <div className="available-tables">
            <h2>Available Tables</h2>
            {availableTables.length === 0 ? (
              <p>No tables available for selected date, time and guests.</p>
            ) : (
              <ul>
                {availableTables.map(table => (
                  <li key={table.id}>
                    <label className={selectedTable === table.id ? "selected-table" : ""}>
                      <input 
                        type="radio" 
                        name="table" 
                        value={table.id} 
                        checked={selectedTable === table.id} 
                        onChange={() => setSelectedTable(table.id)} 
                      />
                      {table.name} - Capacity: {table.capacity}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {errors.table && <div className="error-message">{errors.table}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="specialRequests">Special Requests <span className="optional">(optional)</span></label>
            <textarea 
              id="specialRequests" 
              name="specialRequests" 
              value={formData.specialRequests} 
              onChange={handleChange} 
              maxLength={200}
              className={errors.specialRequests ? "input-error" : ""}
            ></textarea>
            <div className="char-count">
              {formData.specialRequests.length}/200 characters
            </div>
            {errors.specialRequests && <div className="error-message">{errors.specialRequests}</div>}
          </div>

          <div className="total-price">
            <h3>Total Price: R{totalPrice}</h3>
          </div>

          <button type="submit" disabled={isSubmitDisabled()}>Reserve Table</button>
        </form>
      )}
    </div>
  );
};

export default BookingPage;
