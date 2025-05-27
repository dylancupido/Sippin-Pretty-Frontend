import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
<<<<<<< HEAD
import "../Styles/Register.css";
=======
import '../Styles/Register.css'
>>>>>>> dcbf916319fdcdbb48d62db2932679b49aa143a5
import axios from "axios";

const CusRegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setId] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const role = 'Customer';

  const handleIdChange = (e) => setId(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhonenumberChange = (e) => setPhonenumber(e.target.value);

  const handleOnClick = (event) => {
    event.preventDefault();

    const data = {
      Id: username,
      Name: name,
      PhoneNumber: phonenumber,
      Password: password,
      Role: role
    };

    const url = 'https://localhost:7015/api/Users';

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
<<<<<<< HEAD
        <h1>Create Account</h1>
        <div className="Inputbox">
          <input
            value={name}
            type="text"
            placeholder="Full Name*"
            onChange={handleNameChange}
=======
        <h1>Sign up</h1>
        <p>sign up to continue</p>
        <div className="Inputbox">
          <input
            value={lastname}
            type="text"
            placeholder="Name*"
            onChange={handleLastnameChange}
>>>>>>> dcbf916319fdcdbb48d62db2932679b49aa143a5
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
          />
        </div>
        <div className="Inputbox">
          <input
            value={password}
            type="password"
            placeholder="Password*"
            onChange={handlePasswordChange}
            required
          />
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
      <p className="login-prompt">Already have an account? <a href="/login">Log in</a></p>
    </div> 
    
  );
};

export default CusRegisterForm;
