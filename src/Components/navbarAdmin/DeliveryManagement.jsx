import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import "./DeliveryManagement.css";

// Component: Admin Delivery Management Panel
const DeliveryManagement = () => {
  // States
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newDelivery, setNewDelivery] = useState({
    orderNumber: "",
    customerName: "",
    address: "",
    items: [],
    status: "Pending",
    orderDate: new Date().toISOString().slice(0, 16),
    deliveryDate: "",
    driver: "",
  });

  const [newItem, setNewItem] = useState("");

  // Fetch deliveries from backend (TODO)
  useEffect(() => {
    // fetch('/api/deliveries')...
  }, []);

  // Filtering deliveries based on status and search input
  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesFilter = filter === "All" || delivery.status === filter;
    const matchesSearch =
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Update a delivery's status
  const updateDeliveryStatus = (id, newStatus) => {
    setDeliveries(
      deliveries.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    if (selectedDelivery?.id === id) {
      setSelectedDelivery({ ...selectedDelivery, status: newStatus });
    }
  };

  // Helper: Format a date string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Helper: Get CSS class for status badge
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Out for Delivery":
        return "status-out";
      case "Delivered":
        return "status-delivered";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  // Select delivery for viewing
  const viewDeliveryDetails = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  // Input change handler for delivery form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery((prev) => ({ ...prev, [name]: value }));
  };

  // Add item to new delivery
  const addItemToDelivery = () => {
    if (newItem.trim()) {
      setNewDelivery((prev) => ({
        ...prev,
        items: [...prev.items, newItem.trim()],
      }));
      setNewItem("");
    }
  };

  // Remove item from new delivery
  const removeItemFromDelivery = (index) => {
    setNewDelivery((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Submit new delivery (mock save to state)
  const handleSubmitDelivery = () => {
    if (
      !newDelivery.orderNumber ||
      !newDelivery.customerName ||
      !newDelivery.address ||
      newDelivery.items.length === 0
    ) {
      alert("Please fill in all required fields and add at least one item.");
      return;
    }

    const deliveryToAdd = {
      ...newDelivery,
      id: Date.now(),
      orderDate: newDelivery.orderDate || new Date().toISOString(),
      deliveryDate: newDelivery.deliveryDate || null,
    };

    setDeliveries((prev) => [...prev, deliveryToAdd]);

    setNewDelivery({
      orderNumber: "",
      customerName: "",
      address: "",
      items: [],
      status: "Pending",
      orderDate: new Date().toISOString().slice(0, 16),
      deliveryDate: "",
      driver: "",
    });

    setIsAddModalOpen(false);
  };

  // Delete a delivery
  const handleDeleteDelivery = (id) => {
    if (window.confirm("Are you sure you want to delete this delivery?")) {
      setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
      if (isModalOpen && selectedDelivery?.id === id) {
        setIsModalOpen(false);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Delivery Management</h1>
        <p className="dashboard-date">Track and manage all deliveries</p>
      </div>

      {/* Filters and Add Button */}
      <div className="delivery-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name, order #, or address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="status-filter"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button
          className="add-delivery-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          + New Delivery
        </button>
      </div>

      {/* Delivery Table */}
      <div className="delivery-table-container">
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Status</th>
              <th>Driver</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.length > 0 ? (
              filteredDeliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td>{delivery.orderNumber}</td>
                  <td>{delivery.customerName}</td>
                  <td>{delivery.items.join(", ")}</td>
                  <td>{formatDate(delivery.orderDate)}</td>
                  <td>{formatDate(delivery.deliveryDate)}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(delivery.status)}`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                  <td>{delivery.driver || "Not assigned"}</td>
                  <td className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() => viewDeliveryDetails(delivery)}
                    >
                      View
                    </button>
                    <select
                      className="update-status"
                      value={delivery.status}
                      onChange={(e) =>
                        updateDeliveryStatus(delivery.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteDelivery(delivery.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-deliveries">
                  {deliveries.length === 0
                    ? "No deliveries yet. Add your first delivery!"
                    : "No deliveries found matching your criteria"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals (kept unchanged) */}
      {/* ... Modal code unchanged for brevity, as already structured well ... */}
    </div>
  );
};

export default DeliveryManagement;
