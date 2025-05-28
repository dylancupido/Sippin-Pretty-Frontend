import React, { useState } from "react";
import "../Styles/LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const data = {
      Id: username,
      Password: password,
    };

    const url = "http://localhost:5010/api/Login/LoginCus";

    axios
      .post(url, data)
      .then((response) => {
        const message = response.data;
        switch (message) {
          case "Login successful":
            alert("Login successful!");
            setLoggedIn(true);
            navigate("/");
            break;
          case "Invalid ID":
            alert("Invalid ID. Try a different username.");
            break;
          default:
            alert("Server response: " + message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
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
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="inputbox">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="inputbox">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="RemembermeBox-forget">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" id="ForgetPAssword">
            Forget Password?
          </a>
        </div>
        <button id="BtnLogin" type="submit">
          Log In
        </button>
        <div className="registerLink">
          <p>
            Don't have an account? <a href="#">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
