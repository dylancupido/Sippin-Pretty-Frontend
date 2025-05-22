import React from "react";
import CoffeeMug from "./CoffeeMug/CoffeeMug";
import"../App.css";

const HomePage = () => {
  return (
    <>
      <CoffeeMug />
      <div className="left-heading">
        <h1>
          Slay the day,
          <br />
          one sip at a time
        </h1>
      </div>
    </>
  );
};

export default HomePage;
