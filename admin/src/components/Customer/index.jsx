import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Navbar from "../Navbar";
import { getAllUsers } from "../../utils/apiCommunicator";
import "./index.css";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await getAllUsers();
    setCustomerList(Array.isArray(res.data) ? res.data : []);
  };

  // Pagination logic
  const filteredData = customerList.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Navbar />
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
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
                placeholder="Search customer"
              />
            </div>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header">Role</th>
                  <th className="table-header">Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr
                    key={row._id}
                    className="table-row"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      if (e.target.closest(".product-delete-btn")) return;
                      setSelectedUser(row);
                      setShowModal(true);
                    }}
                  >
                    <td className="table-data">{row.name}</td>
                    <td className="table-data">{row.email}</td>
                    <td className="table-data">{row.phone || "-"}</td>
                    <td className="table-data">{row.role}</td>
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
        {/* User Detail Modal */}
        {showModal && selectedUser && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ minWidth: 350, maxWidth: 500 }}
            >
              <h2>User Details</h2>
              <div style={{ marginBottom: 10 }}>
                <strong>Name:</strong> {selectedUser.name}
              </div>
              <div style={{ marginBottom: 10 }}>
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div style={{ marginBottom: 10 }}>
                <strong>Phone:</strong> {selectedUser.phone || "-"}
              </div>
              <div style={{ marginBottom: 10 }}>
                <strong>Role:</strong> {selectedUser.role}
              </div>
              <div style={{ marginBottom: 10 }}>
                <strong>Created At:</strong>{" "}
                {selectedUser.createdAt
                  ? new Date(selectedUser.createdAt)
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(",", "")
                  : ""}
              </div>
              <div style={{ marginBottom: 10 }}>
                <strong>Address:</strong> {selectedUser.address || "-"}
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
                style={{ marginTop: 10 }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;
