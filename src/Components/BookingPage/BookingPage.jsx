import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";

const BASE_URL = "http://localhost:5010";

const BookingPage = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    guests: "",
    date: "",
    time: "",
    tableId: null,
  });

  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  // Generate time slots from 9:00 to 16:00
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return slots;
  };

  // Fetch available tables
  const checkAvailability = async (guests, date, time) => {
    try {
      const res = await fetch(
          `${BASE_URL}/api/tables/available?guests=${guests}&date=${date}&time=${time}`
      );
      const data = await res.json();
      setAvailableTables(data.sort((a, b) => a.capacity - b.capacity));
    } catch (err) {
      console.error("Failed to fetch tables:", err);
    }
  };

  // Recheck availability when formData changes
  useEffect(() => {
    const { guests, date, time } = formData;
    if (guests >= 5 && guests <= 10 && date && time) {
      checkAvailability(guests, date, time);
      setSelectedTable(null);
    } else {
      setAvailableTables([]);
      setSelectedTable(null);
    }
  }, [formData.guests, formData.date, formData.time]);

  // Update price when guest count or selected table changes
  useEffect(() => {
    if (selectedTable) {
      setTotalPrice(formData.guests * 25);
    } else {
      setTotalPrice(0);
    }
  }, [selectedTable, formData.guests]);

  // Field-specific validation
  const validateField = (name, value) => {
    let message = null;
    switch (name) {
      case "fullName":
        if (!value.trim()) message = "Full name is required.";
        break;
      case "email":
        if (!value.trim()) message = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Invalid email format.";
        break;
      case "phoneNumber":
        const digits = value.replace(/\D/g, "");
        if (!value.trim()) message = "Phone number is required.";
        else if (!digits.startsWith("0")) message = "Phone must start with 0.";
        else if (digits.length !== 10) message = "Must be 10 digits.";
        break;
      case "date":
        if (!value) message = "Date is required.";
        break;
      case "time":
        if (!value) message = "Time is required.";
        break;
      case "guests":
        const g = parseInt(value, 10);
        if (isNaN(g) || g < 5 || g > 10) message = "Guests must be 5–10.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
    return !message;
  };

  // Full form validation
  const validate = () => {
    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "tableId" && !validateField(key, value)) isValid = false;
    });

    if (!selectedTable) {
      setErrors((prev) => ({ ...prev, table: "Please select a table." }));
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Submit booking to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const booking = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      guests: parseInt(formData.guests),
      date: formData.date,
      time: formData.time,
      tableId: selectedTable,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        navigate("/payment", { state: { ...booking, totalPrice } });
      } else {
        const error = await response.text();
        alert("Booking failed: " + error);
      }
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  return (
      <div className="booking-container">
        <div className="booking-header">
          <h1>Reserve Your Table</h1>
          <p>Book your table now and enjoy your coffee break with us!</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form" noValidate>

          {/* Honeypot field */}
          <div style={{ display: 'none' }}>
            <label htmlFor="phone_number">Phone Number</label>
            <input type="text" name="phone_number" id="phone_number" autoComplete="off" />
          </div>

          {/* Name */}
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
            {errors.fullName && (
                <div className="error-message">{errors.fullName}</div>
            )}
          </div>

          {/* Email */}
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

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? "input-error" : ""}
                required
            />
            {errors.phoneNumber && (
                <div className="error-message">{errors.phoneNumber}</div>
            )}
          </div>

          {/* Date & Time */}
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
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                ))}
              </select>
              {errors.time && <div className="error-message">{errors.time}</div>}
            </div>
          </div>

          {/* Guest Count */}
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
                className={errors.guests ? "input-error" : ""}
                required
            />
            {errors.guests && (
                <div className="error-message">{errors.guests}</div>
            )}
          </div>

          {/* Available Tables */}
          <div className="available-tables">
            <h2>Available Tables</h2>
            {availableTables.length === 0 ? (
                <p>Please select a date and time to see available tables.</p>
            ) : (
                <>
                  <p>Select a table:</p>
                  <ul>
                    {availableTables.map((table) => (
                        <li key={table.id}>
                          <label
                              className={
                                selectedTable === table.id ? "selected-table" : ""
                              }
                          >
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
                </>
            )}
            {errors.table && <div className="error-message">{errors.table}</div>}
          </div>

          {/* Price Summary */}
          <div className="total-price">
            Total Price: R{totalPrice} <small>(R25 per guest)</small>
          </div>

          <button type="submit" disabled={!selectedTable}>
            Confirm Booking
          </button>
        </form>
      </div>
  );
};

export default BookingPage;