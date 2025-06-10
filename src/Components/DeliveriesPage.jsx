import React, { useEffect, useState } from "react";
import "../Styles/DeliveriesPage.css";

const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch deliveries and orders when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch deliveries and corresponding orders from API
  const fetchData = async () => {
    try {
      const [deliveriesRes, ordersRes] = await Promise.all([
        fetch("http://localhost:5010/api/Deliveries"),
        fetch("http://localhost:5010/api/Orders"),
      ]);
      const [deliveriesData, ordersData] = await Promise.all([
        deliveriesRes.json(),
        ordersRes.json(),
      ]);
      setDeliveries(deliveriesData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark delivery as complete by updating the order status
  // Mark delivery as complete by updating order status and removing delivery
  const handleComplete = async (orderID) => {
    try {
      const order = orders.find((o) => o.orderID === orderID);
      if (!order) return;

      const updatedOrder = { ...order, status: "complete" };

      // Step 1: Update order status
      const response = await fetch(
        `http://localhost:5010/api/Orders/${orderID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedOrder),
        }
      );

      if (!response.ok) {
        console.error("Failed to update order status.");
        return;
      }

      // Step 2: Delete corresponding delivery
      const deliveryToDelete = deliveries.find((d) => d.orderID === orderID);
      if (deliveryToDelete) {
        const deleteResponse = await fetch(
          `http://localhost:5010/api/Deliveries/${deliveryToDelete.deliveryID}`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          console.error("Failed to delete delivery.");
          return;
        }
      }

      alert(`Order ${orderID} marked as complete and delivery removed.`);
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error completing delivery:", error);
    }
  };

  // Get the current status of a given order
  const getOrderStatus = (orderID) => {
    const order = orders.find((o) => o.orderID === orderID);
    return order?.status || "unknown";
  };

  return (
    <div className="deliveries-container">
      <h2>Deliveries</h2>

      {/* Show loading state or data table */}
      {loading ? (
        <p>Loading deliveries...</p>
      ) : (
        <table className="deliveries-table">
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Street Address</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render delivery rows or fallback message */}
            {deliveries.length > 0 ? (
              deliveries.map((delivery) => {
                const status = getOrderStatus(delivery.orderID);
                return (
                  <tr key={delivery.deliveryID}>
                    <td>{delivery.deliveryID}</td>
                    <td>{delivery.orderID}</td>
                    <td>{delivery.userID}</td>
                    <td>{delivery.streetAddress}</td>
                    <td>{delivery.city}</td>
                    <td>{delivery.postalCode}</td>
                    <td>{new Date(delivery.deliveryDate).toLocaleString()}</td>
                    <td>{status}</td>
                    <td>
                      <button
                        className="complete-btn"
                        disabled={status !== "ready"}
                        onClick={() => handleComplete(delivery.orderID)}
                      >
                        {status === "complete" ? "Completed" : "Complete"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9">No deliveries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeliveriesPage;
