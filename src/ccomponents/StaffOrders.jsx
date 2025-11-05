import React, { useEffect, useState } from "react";
import "../Styles/StaffOrders.css";

const OrderItemsAdminPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedItems, setCompletedItems] = useState([]);

  // Load order items on component mount
  useEffect(() => {
    fetchOrderItems();
  }, []);

  // Fetch all order items from the backend
  const fetchOrderItems = async () => {
    try {
      const response = await fetch(
        "https://sippinpretty.fly.dev/api/OrderItems"
      );
      const data = await response.json();
      setOrderItems(data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark a single order item as complete
  const markAsComplete = async (orderItemId, orderID) => {
    try {
      // Track completed item locally
      setCompletedItems((prev) => [...prev, orderItemId]);

      // Get all items related to the same order
      const relatedItems = orderItems.filter(
        (item) => item.orderID === orderID
      );

      // Check if there are any remaining items not yet marked as complete
      const remaining = relatedItems.filter(
        (item) =>
          !completedItems.includes(item.order_Item_ID) &&
          item.order_Item_ID !== orderItemId
      );

      // If all items in the order are completed
      if (remaining.length === 0) {
        // Fetch the full order to determine its type
        const orderResponse = await fetch(
          `https://sippinpretty.fly.dev/api/Orders/${orderID}`
        );
        const order = await orderResponse.json();

        // Update the order status based on order type
        if (order.orderType === "delivery") {
          order.status = "ready";
        } else {
          order.status = "complete";
        }

        // Save updated order to backend
        await fetch(`https://sippinpretty.fly.dev/api/Orders/${orderID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });

        // Delete all order items related to this order
        for (const item of relatedItems) {
          await fetch(
            `https://sippinpretty.fly.dev/api/OrderItems/${item.order_Item_ID}`,
            {
              method: "DELETE",
            }
          );
        }

        // Refresh the list of order items
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

      {/* Show loading message or table */}
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
            {/* Display order items or show empty message */}
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
