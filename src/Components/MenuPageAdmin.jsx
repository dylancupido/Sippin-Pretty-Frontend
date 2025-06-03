import React, { useEffect, useState } from "react";
import "../Styles/MenuPageAdmin.css";

const MenuAdmin = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Form state for creating or editing menu items
  const [formData, setFormData] = useState({
    productName: "",
    group: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  // Fetch menu items from API on component mount
  useEffect(() => {
    fetch("http://localhost:5010/api/MenuItemsAPI")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

  // Menu categories to display
  const categories = [
    "Hot Beverages",
    "Cold Beverages",
    "Breakfast",
    "Sweet Treats",
  ];

  // Filter items by category group
  const filterByGroup = (group) =>
    menuItems.filter((item) => item.group === group);

  // Open modal for adding a new item in the selected group
  const openAddModal = (group) => {
    setFormData({
      productName: "",
      group,
      description: "",
      price: "",
      imageUrl: "",
    });
    setEditMode(false);
    setShowAddModal(true);
  };

  // Handle input changes in the form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save new or edited item to the backend
  const handleSave = async () => {
    try {
      const url = editMode
        ? `http://localhost:5010/api/MenuItemsAPI/${formData.productID}`
        : "http://localhost:5010/api/MenuItemsAPI";

      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save menu item.");
      }

      // Refresh menu items after save
      const updatedMenu = await fetch("http://localhost:5010/api/MenuItemsAPI");
      const data = await updatedMenu.json();
      setMenuItems(data);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // Delete an item by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `http://localhost:5010/api/MenuItemsAPI/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete menu item.");
      }

      // Refresh menu list after deletion
      const updatedMenu = await fetch("http://localhost:5010/api/MenuItemsAPI");
      const data = await updatedMenu.json();
      setMenuItems(data);

      console.log(`Item ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Open modal in edit mode with existing item data
  const openEditModal = (item) => {
    setFormData({ ...item });
    setEditMode(true);
    setShowAddModal(true);
  };

  return (
    <>
      {/* Render each category section */}
      {categories.map((category, idx) => (
        <div key={`category-${idx}`}>
          <div className="section-title">
            <h1>{category}</h1>
          </div>
          <div className="card-container">
            {/* Render menu items for the category */}
            {filterByGroup(category).map((item) => (
              <div key={`item-${item.productID}`} className="custom-card">
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
                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.productID)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Add new item card */}
            <div
              className="custom-card add-card"
              onClick={() => openAddModal(category)}
            >
              <div className="add-card-plus">+</div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for adding or editing menu items */}
      {showAddModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h2>Add New Menu Item</h2>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleFormChange}
            />
            <input type="text" name="group" value={formData.group} readOnly />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleFormChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleFormChange}
            />
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuAdmin;
