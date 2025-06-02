import React, { useEffect, useState } from "react";
import "../Styles/StaffOrders.css";

const OrderItemsAdminPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedItems, setCompletedItems] = useState([]);

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const response = await fetch("http://localhost:5010/api/OrderItems");
      const data = await response.json();
      setOrderItems(data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async (orderItemId, orderID) => {
    try {
      // Mark the item as completed locally
      setCompletedItems((prev) => [...prev, orderItemId]);

      // Re-fetch all items for this order to check if all are completed
      const relatedItems = orderItems.filter(
        (item) => item.orderID === orderID
      );
      const remaining = relatedItems.filter(
        (item) =>
          !completedItems.includes(item.order_Item_ID) &&
          item.order_Item_ID !== orderItemId
      );

      if (remaining.length === 0) {
        // Fetch order to check type
        const orderResponse = await fetch(
          `http://localhost:5010/api/Orders/${orderID}`
        );
        const order = await orderResponse.json();

        // Update status conditionally
        if (order.orderType === "delivery") {
          order.status = "ready";
        } else {
          order.status = "complete";
        }

        await fetch(`http://localhost:5010/api/Orders/${orderID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });

        // Delete all order items for this order
        for (const item of relatedItems) {
          await fetch(
            `http://localhost:5010/api/OrderItems/${item.order_Item_ID}`,
            {
              method: "DELETE",
            }
          );
        }

        // Refresh view
        fetchOrderItems();
        alert(
          `Order ${orderID} marked as ${order.status} and all items deleted.`
        );
      }
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div className="order-items-container">
      <h2>Order Items</h2>
      {loading ? (
        <p>Loading order items...</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order Item ID</th>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Item Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <tr key={item.order_Item_ID}>
                  <td>{item.order_Item_ID}</td>
                  <td>{item.orderID}</td>
                  <td>{item.productID}</td>
                  <td>{item.quantity}</td>
                  <td>R{item.item_price.toFixed(2)}</td>
                  <td>
                    <button
                      className="complete-btn"
                      disabled={completedItems.includes(item.order_Item_ID)}
                      onClick={() =>
                        markAsComplete(item.order_Item_ID, item.orderID)
                      }
                    >
                      {completedItems.includes(item.order_Item_ID)
                        ? "Completed"
                        : "Complete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No order items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderItemsAdminPage;
