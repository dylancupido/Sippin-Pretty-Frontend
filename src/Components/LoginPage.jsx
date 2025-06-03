import React, { useState } from "react";
import "../Styles/LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = ({ setLoggedIn, handleLogin }) => {
  const navigate = useNavigate();
  const [username, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Id: username,
      Password: password,
    };

    const url = "http://localhost:5010/api/Login/LoginCus";

    try {
      const response = await axios.post(url, data);
      const { message, token, user } = response.data;

      if (message === "Login successful") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role.toLowerCase());
        localStorage.setItem("userId", user.id);

        alert("Login successful!");
        setLoggedIn(true);

        if (user && user.role) {
          const role = user.role.toLowerCase();
          handleLogin(role);

          // Conditional routing based on role
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "staff") {
            navigate("/staff");
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } else {
        alert("Server response: " + message);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("No response from server. Is your backend running?");
      } else {
        alert("Error setting up request: " + error.message);
      }
    }
  };

  return (
    <div className="Wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="inputbox">
          <input
            type="text"
            placeholder="Email or Username"
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
          <a href="#" id="ForgetPassword">
            Forgot Password?
          </a>
        </div>

        <button id="BtnLogin" type="submit">
          Log In
        </button>

        <div className="registerLink">
          <p>
            Don't have an account? <Link to="/cusRegister">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
