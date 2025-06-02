import React, { useEffect, useState } from "react";
import "../Styles/OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5010/api/Orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (orderID) => {
    try {
      const response = await fetch(
        `http://localhost:5010/api/Orders/${orderID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOrders(orders.filter((order) => order.orderID !== orderID));
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Amount</th>
              <th>Order Type</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.userID}</td>
                  <td>R{order.totalAmount.toFixed(2)}</td>
                  <td>{order.orderType}</td>
                  <td>{new Date(order.orderDateTime).toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(order.orderID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
