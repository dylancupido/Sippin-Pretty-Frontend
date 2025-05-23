import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";

const CusRegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumbers, setPhonenumbers] = useState('');

  const handleFirstnameChange = (e) => setFirstname(e.target.value);
  const handleLastnameChange = (e) => setLastname(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhonenumbersChange = (e) => setPhonenumbers(e.target.value);

  const handleOnClick = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Firstname: firstname,
      Lastname: lastname,
      PhoneNumbers: phonenumbers,
      Password: password,
    };

    const url = 'https://localhost:44379/Sippin/Registration';

    axios.post(url, data)
      .then((response) => {
        const message = response.data;

        switch (message) {
          case 'Registration Successfull':
            alert('Registration successful!');
            break;
          case 'Erorr':
            alert('User already exists. Try a different username.');
            break;
          default:
            alert('Server response: ' + message);
        }
      })
      .catch((error) => {
        console.error('Registration error:', error);
        alert(' An error occurred during registration.');
      });
  };

  return (
    <div className="Wrapper">
      <form>
        <h1>Create Account</h1>
        <div className="Inputbox">
          <input
            value={firstname}
            type="text"
            placeholder="First Name*"
            onChange={handleFirstnameChange}
            required
          />
        </div>
        <div className="Inputbox">
          <input
            value={lastname}
            type="text"
            placeholder="Last Name*"
            onChange={handleLastnameChange}
            required
          />
        </div>
        <div className="Inputbox">
          <input
            value={username}
            type="text"
            placeholder="Email Address*"
            onChange={handleUsernameChange}
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
            value={phonenumbers}
            type="text"
            placeholder="Mobile Number*"
            onChange={handlePhonenumbersChange}
            required
          />
        </div>
        <button onClick={handleOnClick}>Register</button>
      </form>
    </div>
  );
};
export default CusRegisterForm;
