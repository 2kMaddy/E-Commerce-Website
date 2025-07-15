import { NavLink } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import UpdateProduct from "../UpdateProduct";
import "./index.css";

const ProductTable = (props) => {
  const { data, onClickProductDelete, getProductList } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleUpdateProduct = (productId) => {
    const productObject = data.find((each) => each._id === productId);
    setSelectedProduct(productObject);
    setShowUpdateModal(true);
  };

  return (
    <div className="product-table-container">
      <div className="table-controls">
        <div className="search-box">
          <label htmlFor="table-search-input">Search </label>
          <input
            id="table-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="table-search-input"
            placeholder="Search product"
          />
        </div>
        <NavLink to="/add-product" style={{ textDecoration: "none" }}>
          <button type="button" className="add-product-btn">
            <span className="add-product-icon">
              <MdAddCircleOutline />
            </span>
            Add product
          </button>
        </NavLink>
      </div>
      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="table-header name-header">Image</th>
              <th className="table-header">Name</th>
              <th className="table-header">Price</th>
              <th className="table-header">Category</th>
              <th className="table-header">Sub category</th>
              <th className="table-header">Sold Units</th>
              <th className="table-header">Stock</th>
              <th className="table-header">Rating</th>
              <th className="table-header">Added at</th>
              <th className="table-header">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row._id} className="table-row">
                <td className="table-data">
                  <img
                    src={row.image[0].imageUrl}
                    alt="product img"
                    className="product-table-img"
                  />
                </td>
                <td className="table-data">{row.productName}</td>
                <td className="table-data">{Number(row.price).toFixed(2)}</td>
                <td className="table-data">{row.category}</td>
                <td className="table-data">{row.subCategory}</td>
                <td className="table-data">Sold Units</td>
                <td className="table-data">{row.stock}</td>
                <td className="table-data">{row.ratings}</td>
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
                  <button
                    type="button"
                    className="product-delete-btn"
                    onClick={() => handleUpdateProduct(row._id)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    type="button"
                    className="product-delete-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this product?"
                        )
                      ) {
                        onClickProductDelete(row._id);
                      }
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="4" className="no-data">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p>Total No. of entries: {filteredData.length}</p>
      {selectedProduct && showUpdateModal && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setShowUpdateModal(false)}
          onUpdateSuccess={() => {
            setShowUpdateModal(false);
            getProductList();
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;
