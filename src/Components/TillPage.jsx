import '../Styles/Till.css';
import React, { useState } from 'react';

export function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        const evalResult = Function('"use strict";return (' + input + ')')();
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "+", "0", "-",
    "/", "=", "C"
  ];

  return (
      <div className="app-container">
        <div className="calculator-container">
          <div className="cmd-display">
            {result ? result : input || '0'}
          </div>
          <div className="calculator">
            <div className="button-grid">
              {buttons.map((btn, index) => (
                  <button key={index} onClick={() => handleClick(btn)}>
                    {btn}
                  </button>
              ))}
            </div>
          </div>
          <PaymentOptions />
        </div>
        <Menu />
      </div>
  );
}

function PaymentOptions() {
  return (
      <div className="payment-options">
        <button className="payment">Cash</button>
        <button className="payment">Card</button>
      </div>
  );
}

function Menu() {
  const MenuItems = [
    "Black Coffee", "Chai", "Latte",
    "Espresso", "Cappuccino", "Mocha"
  ];

  return (
      <div className="menu">
        <h3>Menu</h3>
        <div className="menu-grid">
          {MenuItems.map((item, index) => (
              <button className="menu-button" key={index}>{item}</button>
          ))}
        </div>
      </div>
  );
}
