import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../Styles/Register.css";
import axios from "axios";

const CusRegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setId] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errors, setErrors] = useState({});
  const role = "Customer";

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password: min 8 chars, one number, one special character
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle email input change and clear error if present
  const handleIdChange = (e) => {
    const value = e.target.value;
    setId(value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // Handle full name input change
  const handleNameChange = (e) => setName(e.target.value);

  // Handle password input change and clear error if present
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // Handle phone number input change
  const handlePhonenumberChange = (e) => setPhonenumber(e.target.value);

  // Handle form submission
  const handleOnClick = (event) => {
    event.preventDefault();

    const newErrors = {};

    // Validate email and password inputs
    if (!validateEmail(username)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters with one number and one special character (!@#$%^&*)";
    }

    // If validation errors exist, display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data to send to backend
    const data = {
      Id: username,
      Name: name,
      PhoneNumber: phonenumber,
      Password: password,
      Role: role,
    };

    const url = "https://sippinpretty.fly.dev/api/Users/RegisterCus";

    // Send POST request to register user
    axios
      .post(url, data)
      .then((response) => {
        const message = response.data;

        switch (message) {
          case "Registration Successfull":
            alert("Registration successful!");
            break;
          case "Error":
            alert("User already exists. Try a different username.");
            break;
          default:
            alert("Server response: " + message);
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        if (error.response) {
          alert(`Error: ${error.response.data}`);
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

        <h1>Sign up</h1>
        <p>Sign up to continue</p>

        {/* Full Name input */}
        <div className="Inputbox">
          <input
            value={name}
            type="text"
            placeholder="Full Name*"
            onChange={handleNameChange}
            required
          />
        </div>

        {/* Email input */}
        <div className="Inputbox">
          <input
            value={username}
            type="text"
            placeholder="Email Address*"
            onChange={handleIdChange}
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
            onChange={handlePasswordChange}
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
            onChange={handlePhonenumberChange}
            required
          />
        </div>

        {/* Submit button */}
        <button onClick={handleOnClick}>Sign up</button>
      </form>

      {/* Login prompt */}
      <p className="login-prompt">
        Already have an account? <a href="">Log in</a>
      </p>
    </div>
  );
};

export default CusRegisterForm;
