import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Beat from "../components/Loader/Beat";
import { fetchLatestProducts } from "../features/Products/productSlice";
import ProductSlide from "../components/ProductSlide/ProductSlide";


const Home = () => {
  const productList = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestProducts());
  }, [dispatch]);

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="banner-img-container width-100">
          <h1>Welcome to FYNL Mens Wear</h1>
          <p>
            Here you can find tons of collection of stylish T-shirts in various
            category
          </p>
        </div>

        <div className="latest-product-container padding-20">
          <div className="flex-row justify-between align-center">
            <h2>Latest Products</h2>
            <NavLink to="/product?page=1" className="text-decoration-none">
              <p className="text-center view-all-link">
                View All
                <span>
                  <MdKeyboardDoubleArrowRight className="arrow-icon" />
                </span>
              </p>
            </NavLink>
          </div>
          <div>
            {loading ? <Beat /> : <ProductSlide products={productList} />}
          </div>
        </div>
        <div className="banner-img-container banner-img-container-2 width-100">
          <h1>Look Good. Feel Real. Wear FYNL.</h1>
        </div>
        {/* <div className="latest-product-container padding-20">
          <h2 className="width-100 text-center">Categories</h2>
          <div className="category-item-container flex-row justify-between align-center">
            {categoriesConstants.map((category) => (
              <NavLink
                to={`/product?category=${category.value}&page=1`}
                className="text-decoration-none"
              >
                <div key={category.id} className="category-card">
                  <img
                    src={category.imageUrl}
                    alt={category.categoryName}
                    className="category-image"
                  />
                  <p className="category-name">{category.categoryName}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div> */}
        <div className="banner-img-container banner-img-container-3 width-100">
          <h1>Pick Your Fit. Print Your Style. Make Every Tee Yours.</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
