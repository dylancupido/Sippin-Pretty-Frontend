import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import "./DeliveryManagement.css";

const DeliveryManagement = () => {
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
    driver: ""
  });
  const [newItem, setNewItem] = useState("");

  // Fetch deliveries from backend
  useEffect(() => {
 
  }, []);

  // Filter deliveries based on status and search term
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesFilter = filter === "All" || delivery.status === filter;
    const matchesSearch = 
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Update delivery status
  const updateDeliveryStatus = (id, newStatus) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === id ? { ...delivery, status: newStatus } : delivery
    ));
    
    if (selectedDelivery && selectedDelivery.id === id) {
      setSelectedDelivery({ ...selectedDelivery, status: newStatus });
    }
    
    
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // View delivery details
  const viewDeliveryDetails = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "status-pending";
      case "Out for Delivery": return "status-out";
      case "Delivered": return "status-delivered";
      case "Cancelled": return "status-cancelled";
      default: return "";
    }
  };

  // Handle input change for new delivery
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery(prev => ({ ...prev, [name]: value }));
  };

  // Add item to new delivery
  const addItemToDelivery = () => {
    if (newItem.trim()) {
      setNewDelivery(prev => ({
        ...prev,
        items: [...prev.items, newItem.trim()]
      }));
      setNewItem("");
    }
  };

  // Remove item from new delivery
  const removeItemFromDelivery = (index) => {
    setNewDelivery(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // Submit new delivery
  const handleSubmitDelivery = () => {
    // Validate form
    if (!newDelivery.orderNumber || !newDelivery.customerName || !newDelivery.address || newDelivery.items.length === 0) {
      alert("Please fill in all required fields and add at least one item.");
      return;
    }

    const deliveryToAdd = {
      ...newDelivery,
      id: Date.now(), // In a real app, the backend would generate this
      orderDate: newDelivery.orderDate || new Date().toISOString(),
      deliveryDate: newDelivery.deliveryDate || null
    };

    // Add to state
    setDeliveries(prev => [...prev, deliveryToAdd]);
    
    // In a real app, send to backend
    // fetch('/api/deliveries', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(deliveryToAdd)
    // })
    //   .then(res => res.json())
    //   .then(data => console.log('Delivery added:', data))
    //   .catch(err => console.error('Failed to add delivery:', err));

    // Reset form and close modal
    setNewDelivery({
      orderNumber: "",
      customerName: "",
      address: "",
      items: [],
      status: "Pending",
      orderDate: new Date().toISOString().slice(0, 16),
      deliveryDate: "",
      driver: ""
    });
    setIsAddModalOpen(false);
  };

  // Delete delivery
  const handleDeleteDelivery = (id) => {
    if (window.confirm("Are you sure you want to delete this delivery?")) {
      setDeliveries(deliveries.filter(delivery => delivery.id !== id));
      
      // In a real app, delete from backend
      // fetch(`/api/deliveries/${id}`, {
      //   method: 'DELETE'
      // })
      //   .then(res => res.json())
      //   .then(data => console.log('Delivery deleted:', data))
      //   .catch(err => console.error('Failed to delete delivery:', err));
      
      if (isModalOpen && selectedDelivery && selectedDelivery.id === id) {
        setIsModalOpen(false);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Delivery Management</h1>
        <p className="dashboard-date">Track and manage all deliveries</p>
      </div>
      
      <div className="dashboard-content">
        <div className="delivery-controls">
          <div className="search-filter">
            <input 
              type="text" 
              placeholder="Search by name, order #, or address" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <div className="select-container">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="status-filter"
                aria-label="Filter by status"
              >
                <option value="All">All Statuses</option>
                <option value="Pending" className="status-option pending">Pending</option>
                <option value="Out for Delivery" className="status-option out">Out for Delivery</option>
                <option value="Delivered" className="status-option delivered">Delivered</option>
                <option value="Cancelled" className="status-option cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <button 
            className="add-delivery-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            + New Delivery
          </button>
        </div>
        
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
                filteredDeliveries.map(delivery => (
                  <tr key={delivery.id}>
                    <td>{delivery.orderNumber}</td>
                    <td>{delivery.customerName}</td>
                    <td>{delivery.items.join(", ")}</td>
                    <td>{formatDate(delivery.orderDate)}</td>
                    <td>{formatDate(delivery.deliveryDate)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(delivery.status)}`}>
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
                      <div className="select-container">
                        <select 
                          className="update-status"
                          value={delivery.status}
                          onChange={(e) => updateDeliveryStatus(delivery.id, e.target.value)}
                          aria-label="Update delivery status"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
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
                    {deliveries.length === 0 ? 
                      "No deliveries yet. Add your first delivery!" : 
                      "No deliveries found matching your criteria"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delivery Details Modal */}
      {isModalOpen && selectedDelivery && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="delivery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delivery Details - Order #{selectedDelivery.orderNumber}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <div className="modal-content">
              <div className="delivery-info">
                <div className="info-group">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {selectedDelivery.customerName}</p>
                  <p><strong>Address:</strong> {selectedDelivery.address}</p>
                </div>
                
                <div className="info-group">
                  <h3>Delivery Information</h3>
                  <p><strong>Status:</strong> 
                    <span className={`status-badge status-${selectedDelivery.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {selectedDelivery.status}
                    </span>
                  </p>
                  <p><strong>Order Date:</strong> {formatDate(selectedDelivery.orderDate)}</p>
                  <p><strong>Delivery Date:</strong> {formatDate(selectedDelivery.deliveryDate)}</p>
                  <p><strong>Driver:</strong> {selectedDelivery.driver || "Not assigned"}</p>
                </div>
                
                <div className="info-group">
                  <h3>Order Items</h3>
                  {selectedDelivery.items.length > 0 ? (
                    <ul className="item-list">
                      {selectedDelivery.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-items">No items in this order</p>
                  )}
                </div>
              </div>
              
              <div className="modal-actions">
                <div className="select-container">
                  <select 
                    value={selectedDelivery.status}
                    onChange={(e) => updateDeliveryStatus(selectedDelivery.id, e.target.value)}
                    className="status-select"
                    aria-label="Update status"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <button className="print-btn">Print Details</button>
                <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Delivery Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="delivery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Delivery</h2>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>&times;</button>
            </div>
            
            <div className="modal-content">
              <div className="add-delivery-form">
                <div className="form-group">
                  <label htmlFor="orderNumber">Order Number*</label>
                  <input 
                    type="text" 
                    id="orderNumber" 
                    name="orderNumber" 
                    value={newDelivery.orderNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="customerName">Customer Name*</label>
                  <input 
                    type="text" 
                    id="customerName" 
                    name="customerName" 
                    value={newDelivery.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Delivery Address*</label>
                  <textarea 
                    id="address" 
                    name="address" 
                    value={newDelivery.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="orderDate">Order Date & Time</label>
                  <input 
                    type="datetime-local" 
                    id="orderDate" 
                    name="orderDate" 
                    value={newDelivery.orderDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryDate">Estimated Delivery Date & Time</label>
                  <input 
                    type="datetime-local" 
                    id="deliveryDate" 
                    name="deliveryDate" 
                    value={newDelivery.deliveryDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="driver">Driver</label>
                  <input 
                    type="text" 
                    id="driver" 
                    name="driver" 
                    value={newDelivery.driver}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <div className="select-container">
                    <select 
                      id="status" 
                      name="status" 
                      value={newDelivery.status}
                      onChange={handleInputChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="items-group">
                  <label>Order Items*</label>
                  <div className="add-item-container">
                    <input 
                      type="text" 
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Enter item name"
                    />
                    <button 
                      type="button" 
                      className="add-item-btn"
                      onClick={addItemToDelivery}
                    >
                      Add Item
                    </button>
                  </div>
                  
                  {newDelivery.items.length > 0 ? (
                    <ul className="items-list">
                      {newDelivery.items.map((item, index) => (
                        <li key={index} className="item-entry">
                          <span>{item}</span>
                          <button 
                            type="button" 
                            className="remove-item-btn"
                            onClick={() => removeItemFromDelivery(index)}
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-items">No items added yet</p>
                  )}
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="save-btn"
                    onClick={handleSubmitDelivery}
                  >
                    Create Delivery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryManagement;




