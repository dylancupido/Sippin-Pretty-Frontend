import React, { useState } from "react";
import "../Styles/Register.css";
import axios from "axios";

const StaffRegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setId] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errors, setErrors] = useState({});
  const role = "Staff";

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation (min 8 chars, one number, one special character)
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // South African phone number validation (10 digits)
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Handle registration form submission
  const handleOnClick = (event) => {
    event.preventDefault();

    const newErrors = {};

    // Validate each input field
    if (!validateEmail(username)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters with one number and one special character (!@#$%^&*)";
    }

    if (!validatePhoneNumber(phonenumber)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // If validation fails, show error messages
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Construct registration payload
    const data = {
      Id: username,
      Name: name,
      PhoneNumber: phonenumber,
      Password: password,
      Role: role,
    };

    const url = "https://sippinpretty.fly.dev/api/Users/RegisterCus";

    // Send POST request to backend
    axios
      .post(url, data)
      .then((response) => {
        const message = response.data;
        switch (message) {
          case "Registration Successfull":
            alert("Staff registered successfully!");
            break;
          case "Error":
            alert("User already exists. Try a different ID.");
            break;
          default:
            alert("Server response: " + message);
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        if (error.response) {
          alert(`Error: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          alert("No response from server. Is your backend running?");
        } else {
          alert("Error setting up request: " + error.message);
        }
      });
  };

  return (
    <div className="Wrapper">
      <form>
        {/* Honeypot field */}
        <div style={{ display: "none" }}>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            autoComplete="off"
          />
        </div>

        <h1>Register Staff</h1>
        <p>Staff Details</p>

        {/* Full Name input */}
        <div className="Inputbox">
          <input
            value={name}
            type="text"
            placeholder="Full Name*"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email input */}
        <div className="Inputbox">
          <input
            value={username}
            type="text"
            placeholder="Email Address*"
            onChange={(e) => {
              setId(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            required
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        {/* Password input */}
        <div className="Inputbox">
          <input
            value={password}
            type="password"
            placeholder="Password*"
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            required
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        {/* Phone number input */}
        <div className="Inputbox">
          <input
            value={phonenumber}
            type="text"
            placeholder="Mobile Number*"
            onChange={(e) => {
              setPhonenumber(e.target.value);
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            required
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        {/* Submit button */}
        <button onClick={handleOnClick}>Register</button>
      </form>
    </div>
  );
};

export default StaffRegisterForm;
