import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "../Styles/OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5010/api/Orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const columns = [
    { name: "Order ID", selector: (row) => row.orderID, sortable: true },
    { name: "User ID", selector: (row) => row.userID, sortable: true },
    {
      name: "Total Amount (R)",
      selector: (row) => `R${row.totalAmount.toFixed(2)}`,
      sortable: true,
    },
    { name: "Order Type", selector: (row) => row.orderType, sortable: true },
    {
      name: "Date & Time",
      selector: (row) => new Date(row.orderDateTime).toLocaleString(),
      sortable: true,
    },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  return (
    <div className="orders-page-container">
      <h2 className="orders-page-title">Orders</h2>
      <DataTable
        columns={columns}
        data={orders}
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default OrdersPage;
