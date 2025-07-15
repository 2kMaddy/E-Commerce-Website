import { useState } from "react";
import { updateProductById } from "../../utils/apiCommunicator";
import "./index.css";

const UpdateProduct = (props) => {
  const { onClose } = props;
  const { category, description, price, productName, stock, subCategory, _id } =
    props.product;

  const [updatedCategory, setUpdatedCategory] = useState(category || null);
  const [updatedDescription, setUpdatedDescription] = useState(
    description || null
  );
  const [updatedPrice, setUpdatedPrice] = useState(price || null);
  const [updatedStock, setUpdatedStock] = useState(stock || null);
  const [updatedSubCategory, setUpdatedSubCategory] = useState(
    subCategory || null
  );
  const [updatedProductName, setUpdatedProductName] = useState(
    productName || null
  );

  const handleUpdateForm = async (e) => {
    e.preventDefault();
    const updatedProductObject = {
      productName: updatedProductName,
      description: updatedDescription,
      price: updatedPrice,
      category: updatedCategory,
      subCategory: updatedSubCategory,
      stock: updatedStock,
    };
    const res = await updateProductById(_id, updatedProductObject);
    console.log(res);
    if (props.onUpdateSuccess) {
      props.onUpdateSuccess();
    }
  };

  return (
    <div className="update-product-container">
      <form className="update-product-form fade-in" onSubmit={handleUpdateForm}>
        <h2>Update Product</h2>
        <label htmlFor="productName" className="update-product-label">
          Product Name
        </label>
        <input
          id="productName"
          type="text"
          className="update-product-input"
          value={updatedProductName}
          onChange={(e) => setUpdatedProductName(e.target.value)}
          placeholder=""
        />
        <label htmlFor="description" className="update-product-label">
          Description
        </label>
        <textarea
          id="description"
          className="update-product-input"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          placeholder=""
        />
        <label htmlFor="price" className="update-product-label">
          Price
        </label>
        <input
          id="price"
          type="number"
          className="update-product-input"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(e.target.value)}
          placeholder=""
        />
        <label htmlFor="category" className="update-product-label">
          Category
        </label>
        <select
          id="category"
          className="update-product-input"
          value={updatedCategory}
          onChange={(e) => setUpdatedCategory(e.target.value)}
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
        <label className="update-product-label" htmlFor="subCategory">
          Sub Category
        </label>
        <select
          id="subCategory"
          className="update-product-input"
          value={updatedSubCategory}
          onChange={(e) => setUpdatedSubCategory(e.target.value)}
        >
          <option value="">None</option>
          <option value="Acid">Acid</option>
          <option value="Polo">Polo</option>
          <option value="Over Size">Over Size</option>
        </select>
        <label htmlFor="stock" className="update-product-label">
          Stock
        </label>
        <input
          id="stock"
          className="update-product-input"
          value={updatedStock}
          onChange={(e) => setUpdatedStock(e.target.value)}
        />
        <div className="update-product-btn-container">
          <button type="submit" className="update-product-btn">
            Update
          </button>
          <button
            type="button"
            className="cancel-product-btn"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
