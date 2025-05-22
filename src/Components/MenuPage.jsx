import React from "react";
import "../Styles/MenuPage.css";
import { useEffect, useState } from "react";

const Menu = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:44320/api/MenuItems") 
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

  const filterByGroup = (groupName) => menuItems.filter(item => item.Group === groupName);

  const categories = ["Hot Beverages", "Cold Beverages", "Breakfast", "Sweet Treats"];

  return (
    <>
      {categories.map((category) => (
        <div key={category}>
          <div className="section-title"><h1>{category}</h1></div>
          <div className="card-container">
            {filterByGroup(category).map((item) => (
              <div key={item.ProductID} className="custom-card">
                <div className="card-image-allign">
                  <img src={item.ImageUrl} alt={item.ProductName} className="card-image" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.ProductName}</h3>
                  <p className="card-description">{item.Description}</p>
                  <p className="card-price">R{item.Price}</p>
                  <button className="buy-now-btn" onClick={() => onAddToCart(item)}>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Menu;
