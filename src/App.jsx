import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import CoffeeMug from './components/CoffeeMug/CoffeeMug'; // cute steaming mug
import './App.css';
import backgroundImg from './assets/background.png';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const showRegisterModal = () => setShowRegister(true);
  const hideRegisterModal = () => setShowRegister(false);
  const showLoginModal = () => setShowLogin(true);
  const hideLoginModal = () => setShowLogin(false);

  return (
     <div className="app-container">
    {/* Top Navigation Bar */}
    <Navbar
      loggedIn={loggedIn}
      showRegisterModal={showRegisterModal}
      showLoginModal={showLoginModal}
    />

    {/* Centered Cute Coffee Mug */}
 
      <CoffeeMug />
    

    {/* Main Content */}
    <div className="left-heading">
      <h1>Slay the day,<br />one sip at a time</h1>
    </div>

    {/* Register Modal */}
    {showRegister && (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Register</h2>
          <p>This is where your register form will go.</p>
          <button onClick={hideRegisterModal}>Close</button>
        </div>
      </div>
    )}

    {/* Login Modal */}
    {showLogin && (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Login</h2>
          <p>This is where your login form will go.</p>
          <button onClick={hideLoginModal}>Close</button>
        </div>
      </div>
    )}
  </div>
  );
}

export default App;
