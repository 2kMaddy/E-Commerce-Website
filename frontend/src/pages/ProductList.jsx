import { useEffect } from "react";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../features/Products/productSlice";
import ProductCard from "../components/ProductCard/ProductCard";
import Beat from "../components/Loader/Beat";

const ProductList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const currentPage = parseInt(searchParams.get("page"));
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const totalPage = useSelector((state) => state.products.totalPage);

  useEffect(() => {
    if (!category) {
      dispatch(fetchProducts(currentPage));
    } else {
      dispatch(fetchProductsByCategory({ page: currentPage, category }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, currentPage, category]);

  const paginationBtn = () => {
    const values = [];

    for (let i = 1; i <= totalPage; i++) {
      values.push(i);
    }
    return (
      <>
        {values.length > 0 &&
          values.map((each) => (
            <NavLink
              to={`/product?page=${each}`}
              className="text-decoration-none"
            >
              <button
                type="button"
                className={`page-btn ${
                  currentPage === each ? "active-btn" : ""
                }`}
              >
                {each}
              </button>
            </NavLink>
          ))}
      </>
    );
  };

  const prevPage = () => {
    if (currentPage > 1) {
      return navigate(`/product?page=${currentPage - 1}`);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      return navigate(`/product?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h3 className="product-list-heading padding-20">
          {category ? `Products in ${category}` : "All Products"}
        </h3>
        <div className="product-list-conainer">
          {loading && (
            <div className="loader-container">
              <Beat />
            </div>
          )}
          {products.length === 0 && !loading ? (
            <div className="width-100">
              <h3>No products found</h3>
            </div>
          ) : (
            <ul className="product-list-item-container width-100">
              {products.map((each) => (
                <li className="product-card" key={each._id}>
                  <ProductCard productDetail={each} />
                </li>
              ))}
            </ul>
          )}
        </div>
        {totalPage > 1 && (
          <>
            <div className="page-btn-container flex-row justify-center align-center margin-20">
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="page-btn"
              >
                {"< Prev"}
              </button>
              <>{paginationBtn()}</>
              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage === totalPage}
                className="page-btn"
              >
                {"Next >"}
              </button>
            </div>
            <p className="margin-12 text-center">{`${currentPage} / ${totalPage} Page`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
