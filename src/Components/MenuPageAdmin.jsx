import React, { useEffect, useState } from "react";
import "../Styles/MenuPageAdmin.css";

const MenuAdmin = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    group: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch("http://localhost:5010/api/MenuItemsAPI")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

  const categories = [
    "Hot Beverages",
    "Cold Beverages",
    "Breakfast",
    "Sweet Treats",
  ];
  const filterByGroup = (group) =>
    menuItems.filter((item) => item.group === group);

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Validate form data before saving
      if (!formData.name || !formData.price || !formData.group) {
        alert("Please fill in all required fields");
        return;
      }

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
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          `Failed to save menu item. Status: ${response.status}`
        );
      }

      // Refresh menu items after successful save
      const updatedMenu = await fetch("http://localhost:5010/api/MenuItemsAPI");
      if (!updatedMenu.ok) {
        throw new Error("Failed to fetch updated menu items");
      }
      
      const data = await updatedMenu.json();
      setMenuItems(data);
      setShowAddModal(false);
      
      // Reset form data after successful save
      setFormData({
        productID: 0,
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        group: "",
        isAvailable: true
      });
      
      // Show success message
      alert(editMode ? "Item updated successfully" : "Item added successfully");
    } catch (error) {
      console.error("Error saving item:", error);
      alert(`Error: ${error.message}`);
    }
  };

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
  const openEditModal = (item) => {
    setFormData({ ...item }); // populate form with item values
    setEditMode(true);
    setShowAddModal(true);
  };

  return (
    <>
      {categories.map((category, idx) => (
        <div key={`category-${idx}`}>
          <div className="section-title">
            <h1>{category}</h1>
          </div>
          <div className="card-container">
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
            <div
              className="custom-card add-card"
              onClick={() => openAddModal(category)}
            >
              <div className="add-card-plus">+</div>
            </div>
          </div>
        </div>
      ))}

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
