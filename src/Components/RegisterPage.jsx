import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../Styles/Register.css";
import axios from "axios";
 
const CusRegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setId] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [errors, setErrors] = useState({});
  const role = 'Customer';
 
  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, one special character, one number
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    setId(value);

    // Clear email error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Clear password error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handlePhonenumberChange = (e) => setPhonenumber(e.target.value);
 
  const handleOnClick = (event) => {
    event.preventDefault();

    // Validate inputs
    const newErrors = {};

    if (!validateEmail(username)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with one number and one special character (!@#$%^&*)';
    }

    // If there are validation errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      Id: username,
      Name: name,
      PhoneNumber: phonenumber,
      Password: password,
      Role: role
    };

    const url = 'http://localhost:5010/api/Users/RegisterCus';
 
    axios.post(url, data)
      .then((response) => {
        const message = response.data;
 
        switch (message) {
          case 'Registration Successfull':
            alert('Registration successful!');
            break;
          case 'Error':
            alert('User already exists. Try a different username.');
            break;
          default:
            alert('Server response: ' + message);
        }
      })
      .catch((error) => {
        console.error('Registration error:', error);
        if (error.response) {
          alert(`Error: ${error.response.data}`);
        } else if (error.request) {
          alert('No response from server. Is your backend running?');
        } else {
          alert('Error setting up request: ' + error.message);
        }
      });
  };
 
  return (
    <div className="Wrapper">
      <form>
        <h1>Sign up</h1>
        <p>Sign up to continue</p>
        <div className="Inputbox">
          <input
            value={name}
            type="text"
            placeholder="Full Name*"
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="Inputbox">
          <input
            value={username}
            type="text"
            placeholder="Email Address*"
            onChange={handleIdChange}
            required
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="Inputbox">
          <input
            value={password}
            type="password"
            placeholder="Password*"
            onChange={handlePasswordChange}
            required
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <div className="Inputbox">
          <input
            value={phonenumber}
            type="text"
            placeholder="Mobile Number*"
            onChange={handlePhonenumberChange}
            required
          />
        </div>
        <button onClick={handleOnClick}>Sign up</button>
      </form>
      <p className="login-prompt">
        Already have an account? <a href="">Log in</a>
      </p>
    </div>
  );
};
 
export default CusRegisterForm;
 
 