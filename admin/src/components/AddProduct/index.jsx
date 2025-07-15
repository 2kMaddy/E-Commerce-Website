import { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";

import Navbar from "../Navbar";
import { addProduct } from "../../utils/apiCommunicator";

import "./index.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imagesUrl, setImagesUrl] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleDeleteImage = (idx) => {
    setImagesUrl((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Ecommerce");
    data.append("cloud_name", "du08m7fik");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/du08m7fik/image/upload",
        { method: "POST", body: data }
      );
      const uploadedImage = await res.json();
      if (uploadedImage.url) {
        setImagesUrl((prev) => [...prev, { imageUrl: uploadedImage.url }]);
      } else {
        alert("Image upload failed.");
      }
    } catch {
      alert("Error uploading image.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Prepare images array for API (only imageUrl)
    const images = imagesUrl.map((img) => ({ imageUrl: img.imageUrl }));
    try {
      const res = await addProduct(
        productName,
        description,
        price,
        category,
        subCategory,
        images,
        stock
      );
      if (res && res.success) {
        alert("Product added successfully!");
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSubCategory("");
        setStock("");
        setImagesUrl([]);
      } else {
        alert(res && res.message ? res.message : "Failed to add product.");
      }
    } catch {
      alert("Error adding product.");
    }
    setLoading(false);
  };

  return (
    <div className="add-product-container">
      <div>
        <Navbar />
      </div>
      <div className="form-container">
        <form className="add-product-form" onSubmit={handleSubmit}>
          <h2>Add Product</h2>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            className="form-input-element"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-input-element"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="price">Price</label>
          <input
            id="price"
            className="form-input-element"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="form-input-element"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Plain Teez">Plain Teez</option>
            <option value="Polo Teez">Polo Teez</option>
            <option value="Over Size">Over Size</option>
            <option value="Acid Wash">Acid Wash</option>
            <option value="Printed Teez">Printed Teez</option>
            <option value="Custom Teez">Custom Teez</option>
          </select>
          <label htmlFor="subCategory">Sub Category</label>
          <select
            id="subCategory"
            className="form-input-element"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">None</option>
            <option value="Acid">Acid</option>
            <option value="Polo">Polo</option>
            <option value="Over Size">Over Size</option>
          </select>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            className="form-input-element"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <label>Product Images (4)</label>
          <div className="image-inputs-container">
            {[0, 1, 2, 3].map((idx) => (
              <div className="image-input" key={idx}>
                {imagesUrl[idx] && imagesUrl[idx].imageUrl ? (
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img
                      src={imagesUrl[idx].imageUrl}
                      alt={`Product Preview ${idx + 1}`}
                      className="image-preview"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                        color: "#f00",
                        fontWeight: "bold",
                        boxShadow: "0 0 2px #888",
                        padding: "0",
                        fontSize: "18px",
                      }}
                      type="button"
                      onClick={() => handleDeleteImage(idx)}
                      aria-label="Delete image"
                    >
                      ×
                    </button>
                  </div>
                ) : isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <div className="image-input-logo">
                      <RiImageAddLine />
                    </div>
                    <input
                      className="image-input-element"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isLoading}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
