import { useState, useEffect } from "react";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

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
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [sortInput, setSortInput] = useState("");

  let filteredProducts = products;
  if (searchKeyWord?.trim()) {
    const key = searchKeyWord.trim().toLowerCase();
    filteredProducts = products.filter((product) =>
      product.productName?.trim().toLowerCase().includes(key)
    );
  }

  if (sortInput === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortInput === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortInput === "latest") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortInput === "oldest") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

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
            <NavLink to={`/product?page=${each}`}>
              <button
                type="button"
                className={`cursor-pointer border border-[#8f49ff] rounded-md pr-4 pl-4 p-2 hover:bg-[#8f49ff] hover:text-white font-mono ${
                  currentPage === each ? "bg-[#8f49ff] text-white" : ""
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
    <div className="p-4 md:p-10 max-w-[1400px] mx-auto">
      <div>
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[18px] md:text-3xl text-[#333] font-bold">
            {category ? `Products in ${category}` : "All Products"}
          </h2>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row items-center gap-4 border border-gray-300 rounded-md p-2">
              <FaSearch />
              <input
                type="text"
                placeholder="Search..."
                className="border-none outline-none w-full"
                value={searchKeyWord}
                onChange={(e) => setSearchKeyWord(e.target.value)}
              />
            </div>
            <div>
              <select
                onChange={(e) => setSortInput(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Sort by </option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          {loading ? (
            <div className="h-dvh w-full flex justify-center items-center">
              <Beat />
            </div>
          ) : filteredProducts.length === 0 && !loading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <h3 className="text-xl font-semibold text-[#333]">
                No products found
              </h3>
            </div>
          ) : (
            <ul className="grid grid-cols-1 place-items-center md:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
              {filteredProducts.map((each) => (
                <li key={each._id} className="w-[230px] lg:w-[300px]">
                  <ProductCard productDetail={each} />
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10 md:mt-20">
            <div className="flex flex-row items-center gap-2">
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="border border-gray-300 rounded-md p-2 hover:bg-gray-200 disabled:opacity-50 font-mono"
              >
                {"< Prev"}
              </button>
              <>{paginationBtn()}</>
              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage === totalPage}
                className="border border-gray-300 rounded-md p-2 hover:bg-gray-200 disabled:opacity-50 font-mono"
              >
                {"Next >"}
              </button>
            </div>
            <p>{`${currentPage} / ${totalPage} Page`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
