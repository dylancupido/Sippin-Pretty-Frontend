import React from "react";
import "../Styles/MenuPage.css";
import { useEffect, useState } from "react";

const Menu = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5010/api/MenuItemsAPI");
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched menu items:", data);
        setMenuItems(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("Failed to load menu items. Please try again later.");
        // Fallback data for development
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filterByGroup = (groupName) => menuItems.filter(item => item.group === groupName);

  const categories = ["Hot Beverages", "Cold Beverages", "Breakfast", "Sweet Treats"];

  return (
    <>
      {categories.map((category) => (
        <div key={category}>
          <div className="-section-title"><h1>{category}</h1></div>
          <div className="card-container">
            {filterByGroup(category).map((item) => (
              <div key={item.productID} className="custom-card">
                <div className="card-image-align">
                  <img src={item.imageUrl || "fallback.jpg"} alt={item.productName} className="card-image" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.productName}</h3>
                  <p className="card-description">{item.description}</p>
                  <p className="card-price">R{item.price}</p>
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
