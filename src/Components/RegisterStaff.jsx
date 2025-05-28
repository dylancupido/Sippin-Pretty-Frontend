import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Register.css";
import axios from "axios";
 
const StaffRegisterForm = () => {
  const [name, setName] = useState('');
  const [dob, setDOB] = useState(null); // use Date object
  const [username, setId] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const role = 'Staff';
 
  const handleOnClick = (event) => {
    event.preventDefault();
 
    const data = {
      Id: username,
      Name: name,
      PhoneNumber: phonenumber,
      Password: password,
      Role: role,
      Address: address,
      DOB: dob ? dob.toISOString() : null,
 
    };
 
    const url = 'http://localhost:5010/api/Staff/RegisterStaff';
 
    axios.post(url, data)
      .then((response) => {
        const message = response.data;
        switch (message) {
          case 'Registration Successfull':
            alert('Registration successful!');
            break;
          case 'Alreday Exist':
            alert('User already exists. Try a different username.');
            break;
          default:
            alert('Server response: ' + message);
        }
      })
      .catch((error) => {
  console.error('Registration error:', error);
  if (error.response) {
    alert(`Error: ${JSON.stringify(error.response.data)}`);
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
        <h1>Register Staff</h1>
        <p>Staff Details</p>
 
        <div className="Inputbox">
          <input
            value={name}
            type="text"
            placeholder="Full Name*"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
 
        <div className="Inputbox">
          <input
            value={username}
            type="text"
            placeholder="Staff ID number*"
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
 
        <div className="Inputbox">
          <input
            value={password}
            type="password"
            placeholder="Password*"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
 
        <div className="Inputbox">
          <input
            value={phonenumber}
            type="text"
            placeholder="Mobile Number*"
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
        </div>
 
        <div className="Inputbox">
          <DatePicker
            selected={dob}
            onChange={(date) => setDOB(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date of birth*"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            required
          />
        </div>
 
        <div className="Inputbox">
          <input
            value={address}
            type="text"
            placeholder="Home Address*"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
 
        <button onClick={handleOnClick}>Register</button>
      </form>
    </div>
  );
};
 
export default StaffRegisterForm;
 
 