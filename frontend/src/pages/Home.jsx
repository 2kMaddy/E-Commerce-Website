import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Beat from "../components/Loader/Beat";
import { fetchLatestProducts } from "../features/Products/productSlice";
import ProductSlide from "../components/ProductSlide/ProductSlide";
import categoriesConstants from "../utlis/constants";

const Home = () => {
  const productList = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestProducts());
  }, [dispatch]);

  return (
    <div className="min-h-dvh max-h-full bg-gradient-to-r from-[#f4edff] to-[#d6c8f4]">
      <div>
        <div className="bg-[url('https://res.cloudinary.com/dhavsxxnd/image/upload/v1755842918/2149448742_qwr0vg.jpg')] bg-cover w-full h-[90vh] flex flex-row items-center justify-end-safe">
          <div className="w-[100%] md:w-[50%] text-center md:text-left p-2 md:p-0">
            <h1 className="text-4xl font-bold mb-4 font-[Edu_NSW_ACT_Cursive]">
              Welcome to FYNL Mens Wear
            </h1>
            <p className="text-2xl font-medium text-[#333333]">
              Discover unique designs and find the perfect tee to express
              yourself. Happy shopping!
            </p>
          </div>
        </div>
        <div className="mt-12 p-5 lg:p-10">
          <div className="flex flex-row justify-between items-center mb-6">
            <h2 className="text-[18px] md:text-3xl text-[#333] font-bold">
              Latest Products
            </h2>
            <NavLink to="/product?page=1">
              <p className="relative top-0 text-1xl cursor-pointer flex flex-row items-center gap-1 text-[#993df5]">
                View All
                <span>
                  <MdKeyboardDoubleArrowRight />
                </span>
              </p>
            </NavLink>
          </div>
          <div>
            {loading ? (
              <div className="w-full h-full flex flex-row justify-center items-center">
                <Beat />
              </div>
            ) : (
              <ProductSlide products={productList} />
            )}
          </div>
        </div>
        <div className="mt-12 p-10 flex flex-col justify-center items-center">
          <h2 className="text-[18px] md:text-3xl text-[#333] font-bold">
            Categories
          </h2>
          <div className="mt-12 flex flex-col justify-center items-center md:flex-row gap-6 flex-wrap">
            {categoriesConstants.map((category) => (
              <NavLink to={`/product?category=${category.value}&page=1`}>
                <div
                  key={category.id}
                  className="rounded-2xl flex flex-col justify-center items-center w-[200px] lg:w-[180px] hover:text-[#993df5] cursor-pointer"
                >
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.categoryName}
                      className="hover:scale-105 transition-transform duration-300 rounded-2xl"
                    />
                  </div>
                  <p className="p-2 text-center font-semibold">
                    {category.categoryName}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        {/* <div>
          <h1>Pick Your Fit. Print Your Style. Make Every Tee Yours.</h1>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
