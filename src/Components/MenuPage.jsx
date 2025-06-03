import React, { useEffect, useState } from "react";
import "../Styles/MenuPage.css";

const Menu = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [notification, setNotification] = useState("");

  // Fetch menu items from API
  useEffect(() => {
    fetch("http://localhost:5010/api/MenuItemsAPI")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched menu items:", data);
        setMenuItems(data);
      })
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

  // Filter menu items by group/category
  const filterByGroup = (groupName) =>
    menuItems.filter((item) => item.group === groupName);

  // Categories to display
  const categories = [
    "Hot Beverages",
    "Cold Beverages",
    "Breakfast",
    "Sweet Treats",
  ];

  // Handle add-to-cart action and show notification
  const handleAddToCart = (item) => {
    onAddToCart(item);
    setNotification(`${item.productName} added to cart!`);
    setTimeout(() => setNotification(""), 3000); // Hide after 3 seconds
  };

  return (
    <>
      {/* Show temporary cart notification */}
      {notification && <div className="cart-notification">{notification}</div>}

      {/* Render each category with its menu items */}
      {categories.map((category) => (
        <div key={category}>
          <div className="-section-title">
            <h1>{category}</h1>
          </div>
          <div className="card-container">
            {filterByGroup(category).map((item) => (
              <div key={item.productID} className="custom-card">
                <div className="card-image-align">
                  <img
                    src={item.imageUrl || "fallback.jpg"}
                    alt={item.productName}
                    className="card-image"
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.productName}</h3>
                  <p className="card-description">{item.description}</p>
                  <p className="card-price">R{item.price}</p>
                  <button
                    className="buy-now-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Buy Now
                  </button>
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
