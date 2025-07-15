import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import ProductTable from "../ProductTable";
import { getAllProducts, deleteProductById } from "../../utils/apiCommunicator";
import { BeatLoader } from "react-spinners";
import "./index.css";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    const { data } = await getAllProducts();
    setProductList(Array.isArray(data) ? data : []);
    console.log(data);
    setIsLoading(false);
  };

  const handleProductDelete = async (productId) => {
    await deleteProductById(productId);
    getProductList();
  };

  

  return (
    <div className="product-page-container">
      <div className="product-left-col">
        <Navbar />
      </div>
      <div className="product-right-col">
        {isLoading ? (
          <div className="loader-container">
            <BeatLoader
              color="gray"
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <ProductTable
            data={productList}
            onClickProductDelete={handleProductDelete}
            getProductList={getProductList}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
