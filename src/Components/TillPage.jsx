import '../Styles/Till.css';
import React, { useState } from 'react';


export function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  let handleClick;
  handleClick = (value) => {
    if (value === "=") {
      try {
        // Evaluate the expression using Function (safer than eval)
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
    "7", "8","9",
    "+", "0", "-",
    "/", "="
        ];
    
  return (
    <div className={"card-container"}>
        <div>Input: {input}</div>
        <div>Result: {result}</div>
    <div className={"calculator"}>
        {buttons.map((btn, index) => (
            <React.Fragment key = {index}>
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
          {(index + 1) % 3 === 0 && <br />}
          </React.Fragment>
        ))}
      </div>
      <div>
        <PaymentOptions />
      </div>
      <div>
        <Menu />
      </div>
</div>
  );
}

function PaymentOptions() {
  const options =[
      "Cash","card"
  ];
  return (
    <div className={"payment"}>
      {options.map((btn, index) => (
          <React.Fragment key = {index}>
            <button key={btn}>
              {btn}
            </button>
            {(index + 1) && <br />}
          </React.Fragment>
      ))}
    </div>
  );
};

function Menu() {
  const MenuItems =[
      "Black Coffee", "Chai", "Latte"
      , "Espresso", "Cappuccino", "Mocha"
  ];
  return (
    <div className={"menu"}>
      {MenuItems.map((btn, index) => (
          <React.Fragment key = {index}>
            <button key={btn}>
              {btn}
            </button>
            {(index + 1) % 3 === 0&& <br />}
          </React.Fragment>
      ))}
    </div>
  )
}