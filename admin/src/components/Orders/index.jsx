import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} from "../../utils/apiCommunicator";
import Navbar from "../Navbar";
import "../ProductTable/index.css";
import OrderDetails from "../OrderDetails";
import "./index.css";

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusLoading, setStatusLoading] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await getAllOrders();
    setOrders(Array.isArray(res.data) ? res.data : []);
    console.log(res);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setStatusLoading(orderId);
    await updateOrderStatus(orderId, newStatus);
    await fetchOrders();
    setStatusLoading("");
  };

  const filteredData = orders.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleGetOrderDetails = async (userId, orderId) => {
    const res = await getOrderById(userId, orderId);
    setOrderDetails(res.data);
    setShowOrderDetailModal(true);
  };

  return (
    <div className="order-table-container">
      <div className="product-left-col">
        <Navbar />
      </div>
      <div className="order-table">
        <div className="product-table-container">
          <div className="table-controls">
            <div className="search-box">
              <label htmlFor="table-search-input">Search: </label>
              <input
                id="table-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="table-search-input"
                placeholder="Search order"
              />
            </div>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="table-header">Order ID</th>
                  <th className="table-header">Customer</th>
                  <th className="table-header">Total</th>
                  <th className="table-header">Created At</th>
                  <th className="table-header">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row._id} className="table-row">
                    <td
                      className="table-data order-id"
                      onClick={() => handleGetOrderDetails(row.userId, row._id)}
                    >
                      {row._id}
                    </td>
                    <td className="table-data">
                      {row.userDetails?.name || "-"}
                    </td>
                    <td className="table-data">
                      ₹{Number(row.totalPrice)?.toFixed(2) || "-"}
                    </td>
                    <td className="table-data">
                      {row.createdAt
                        ? new Date(row.createdAt)
                            .toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .replace(",", "")
                        : ""}
                    </td>
                    <td className="table-data">
                      <select
                        value={row.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(row._id, e.target.value)
                        }
                        disabled={statusLoading === row._id}
                        className="entries-select"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {orderDetails && showOrderDetailModal && (
        <OrderDetails
          orderData={orderDetails}
          onClose={() => setShowOrderDetailModal(false)}
        />
      )}
    </div>
  );
};

export default OrdersTable;
