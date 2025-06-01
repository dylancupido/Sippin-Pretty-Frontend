import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

// This would come from your API in a real application
const initialTables = [
  { id: 1, name: "Table 1", capacity: 5 },
  { id: 2, name: "Table 2", capacity: 6 },
  { id: 3, name: "Table 3", capacity: 7 },
  { id: 4, name: "Table 4", capacity: 8 },
  { id: 5, name: "Booth 1", capacity: 8 },
  { id: 6, name: "Booth 2", capacity: 9 },
  { id: 7, name: "Large Table", capacity: 10 },
  { id: 8, name: "Large Booth", capacity: 10 }
];

// Mock bookings - would be fetched from API
const mockBookings = [
  { tableId: 2, date: '2025-05-30', time: '12:00' },
  { tableId: 5, date: '2025-05-30', time: '12:00' },
  { tableId: 3, date: '2025-05-30', time: '14:30' },
  { tableId: 1, date: '2025-05-31', time: '15:00' },
];

const BookingPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    guests: 5,
    tableId: null
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

    // Find tables that can accommodate the guests
    const suitableTables = initialTables.filter(table => table.capacity >= guests);

    // Filter out booked tables
    const availableTables = suitableTables.filter(table => {
      return !mockBookings.some(
        booking => booking.tableId === table.id && booking.date === date && booking.time === time
      );
    });

    // Sort tables by capacity (ascending) to prioritize tables closest to guest count
    const sortedTables = [...availableTables].sort((a, b) => a.capacity - b.capacity);

    // Ensure we have at least 3 options if possible
    let finalTables = sortedTables;
    
    // If we have more than 3 tables, ensure we have a mix of table types
    if (sortedTables.length > 3) {
      // Get tables with capacity exactly matching or +1 guest count
      const exactFitTables = sortedTables.filter(t => 
        t.capacity === guests || t.capacity === guests + 1
      );
      
      // Get tables with slightly larger capacity
      const largerTables = sortedTables.filter(t => 
        t.capacity > guests + 1 && t.capacity <= guests + 3
      );
      
      // Get booth options (if any)
      const boothOptions = sortedTables.filter(t => 
        t.name.toLowerCase().includes('booth')
      );
      
      // Combine options to ensure variety
      finalTables = [
        ...exactFitTables.slice(0, 1),
        ...largerTables.slice(0, 1),
        ...boothOptions.slice(0, 1)
      ];
      
      // If we don't have 3 options yet, add more from the sorted list
      if (finalTables.length < 3) {
        const remainingOptions = sortedTables.filter(t => 
          !finalTables.some(ft => ft.id === t.id)
        );
        finalTables = [...finalTables, ...remainingOptions.slice(0, 3 - finalTables.length)];
      }
    }

    return finalTables.map(table => ({
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
      const dynamicPrice = guestCount * 25;
      setTotalPrice(dynamicPrice);
    } else {
      setTotalPrice(0);
    }
  }, [selectedTable, formData.guests]);

  const validateField = (name, value) => {
    let errorMessage = null;
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) errorMessage = 'Full name is required.';
        break;
      
      case 'email':
        if (!value.trim()) {
          errorMessage = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = 'Invalid email format.';
        }
        break;
      
      case 'phoneNumber':
        if (!value.trim()) {
          errorMessage = 'Phone number is required.';
        } else {
          // Remove all non-digit characters for validation
          const cleanNumber = value.replace(/\D/g, '');
          
          // Check if it starts with 0
          if (!cleanNumber.startsWith('0')) {
            errorMessage = 'Phone number must start with 0.';
          } 
          // Check if it has exactly 10 digits
          else if (cleanNumber.length !== 10) {
            errorMessage = 'Phone must be 10 digits.';
          }
        }
        break;
      
      case 'date':
        if (!value) errorMessage = 'Date is required.';
        break;
      
      case 'time':
        if (!value) errorMessage = 'Time is required.';
        break;
      
      case 'guests':
        const guests = parseInt(value, 10);
        if (isNaN(guests) || guests < 5 || guests > 10) {
          errorMessage = 'Number of guests must be between 5 and 10.';
        }
        break;
      
      default:
        break;
    }
    
    // Update only the specific field error
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
    
    return !errorMessage;
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate each field
    Object.entries(formData).forEach(([name, value]) => {
      if (name !== 'tableId') { // Skip tableId as it's handled separately
        const fieldIsValid = validateField(name, value);
        isValid = isValid && fieldIsValid;
      }
    });
    
    // Validate table selection
    if (!selectedTable) {
      newErrors.table = 'Please select a table.';
      isValid = false;
      setErrors(prev => ({ ...prev, table: 'Please select a table.' }));
    }
    
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate the field immediately after change
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const bookingDetails = {
        ...formData,
        tableId: selectedTable,
        table: availableTables.find(t => t.id === selectedTable),
        totalPrice
      };
      console.log('Booking submitted:', bookingDetails);
      navigate('/payment', { state: bookingDetails });
    }
  };

  const isSubmitDisabled = () => {
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'date', 'time'];
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
          min="5"
          max="10"
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
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              className={errors.fullName ? "input-error" : ""}
              required 
            />
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>

          <div className="form-divider"></div>

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
            <label htmlFor="phoneNumber">Phone Number</label>
            <input 
              type="tel" 
              id="phoneNumber" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              pattern="0\d{9}" 
              placeholder="e.g. 0812345678" 
              className={errors.phoneNumber ? "input-error" : ""}
              required 
            />
            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
            {!errors.phoneNumber && <div className="input-hint">Must be 10 digits starting with 0</div>}
          </div>

          <div className="form-divider"></div>

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

          <div className="form-divider"></div>

          <div className="available-tables">
            <h2>Available Tables</h2>
            {availableTables.length === 0 ? (
              <p>Please select a date and time to see available tables.</p>
            ) : (
              <>
                <p className="table-selection-hint">Select a table that best fits your group size:</p>
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
                        {table.name.toLowerCase().includes('booth') && 
                          <span className="table-type">(Booth Seating)</span>}
                        {!table.name.toLowerCase().includes('booth') && 
                          <span className="table-type">(Table Seating)</span>}
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {errors.table && <div className="error-message">{errors.table}</div>}
          </div>

          <div className="total-price">
            <h3>Total Price: R{totalPrice}</h3>
          </div>

          <div className="booking-footer">
            <p className="vintage-note">We look forward to serving you with love ♥</p>
          </div>

          <button type="submit" disabled={isSubmitDisabled()}>Reserve Table</button>
        </form>
      )}
    </div>
  );
};

export default BookingPage;
