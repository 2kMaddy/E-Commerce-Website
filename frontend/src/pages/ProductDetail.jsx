import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { PiPackage } from "react-icons/pi";
import { BsCalendarDate } from "react-icons/bs";
import {
  fetchProductById,
  fetchAddReview,
  fetchProductsByCategory,
} from "../features/Products/productSlice";
import {
  incQuantity,
  decQuantity,
  fetchAddToCart,
  fetchGetCartById,
  setNoOfItems,
} from "../features/Cart/cartSlice.js";
import { setNewList } from "../features/Order/orderSlice";
import priceFormat from "../utlis/priceFormat";
import dateFormat from "../utlis/dateFormat";
import timeDifferenceFormat from "../utlis/timeDifferenceFormat";
import RatingStars from "../components/StarRepeater/RatingStars.jsx";
import ProductSlide from "../components/ProductSlide/ProductSlide.jsx";
import Beat from "../components/Loader/Beat.jsx";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [displayImage, setDisplayImage] = useState("");

  const product = useSelector((state) => state.products.productDetail);
  const relatedProducts = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const isAuthorised = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user?.name);
  const userId = useSelector((state) => state.auth.user?._id);
  const quantity = useSelector((state) => state.cart.quantity);
  const size = useSelector((state) => state.cart.size);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setDisplayImage(product.image[0].imageUrl);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      dispatch(
        fetchProductsByCategory({ page: "1", category: product.category })
      );
    }
  }, [dispatch, product]);

  useEffect(() => {
    const getCart = async () => {
      if (isAuthorised) {
        await dispatch(fetchGetCartById(userId));
      }
    };
    getCart();
  }, [dispatch, isAuthorised, userId]);

  const stockAvailability = () => {
    if (!product) return "";
    if (product.stock === 0) return "Out of Stock";
    if (product.stock < 15) return `Only ${product.stock} left`;
    return "In Stock";
  };

  const handleAddToCart = async () => {
    if (!isAuthorised) {
      return navigate("/login");
    }
    const object = {
      userId,
      productId,
      productName: product.productName,
      thumbnailUrl: product?.image?.[0]?.imageUrl,
      size,
      quantity,
      totalPrice: product.price * quantity,
    };
    await dispatch(fetchAddToCart(object));
    await dispatch(fetchGetCartById(userId));
    const noOfItemsInCart = useSelector((state) => state.cart.noOfItems);
    dispatch(setNoOfItems(noOfItemsInCart + 1));
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const newObject = { userId, userName, comment, rating };
    const response = await dispatch(
      fetchAddReview({ productId, review: newObject })
    );
    if (response?.meta?.requestStatus === "fulfilled") {
      setComment("");
      setRating("");
    }
    dispatch(fetchProductById(productId));
  };

  const handleToOrder = () => {
    const newObject = [
      {
        productId: product._id,
        productName: product.productName,
        thumbnailUrl: product?.image?.[0]?.imageUrl,
        size,
        quantity,
        itemTotal: product.price * quantity,
      },
    ];
    dispatch(setNewList(newObject));
    navigate("/order");
  };

  if (!product) {
    return (
      <div>
        <Beat />
      </div>
    );
  }

  return (
    <div className="min-h-dvh max-h-full bg-gradient-to-r from-[#f4edff] to-[#d6c8f4] p-10">
      {loading ? (
        <Beat />
      ) : (
        <div>
          <div className="flex flex-row">
            {/* Left: Images */}
            <div className="w-[50%]">
              <div className="flex flex-col gap-4">
                <div>
                  <img src={displayImage} alt="Product" className="w-[80%]" />
                </div>
                <div className="flex flex-row gap-1">
                  {product?.image?.map((each, index) => (
                    <img
                      key={index}
                      src={each.imageUrl}
                      className="w-[25%] cursor-pointer"
                      onClick={() => setDisplayImage(each.imageUrl)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-[50%]">
              <p className="text-[#333] text-[14px]">{product.category}</p>
              <h1 className="font-bold text-3xl text-purple-600">
                {product.productName}
              </h1>
              <p className="text-[16px] mt-1 mb-2 text-gray-600">
                {product.description}
              </p>
              <RatingStars
                ratings={product.ratings}
                noOfReviews={product.reviews?.length}
              />
              <h2 className="font-semibold text-1xl text-black mt-5">
                {priceFormat(product.price)}
              </h2>

              {/* Sizes */}
              <div className="mt-5">
                <p>Size</p>
                <div className="flex gap-2">
                  {Array.isArray(product?.size) && product.size.length > 0 ? (
                    product.size.map((each, index) => (
                      <button
                        type="button"
                        key={index}
                        className="px-3 py-1 border rounded-lg"
                      >
                        {each}
                      </button>
                    ))
                  ) : (
                    <p>No particular size</p>
                  )}
                </div>
                <p
                  className={`${
                    stockAvailability() === "Out of Stock"
                      ? "text-red-700"
                      : "text-green-600"
                  } font-semibold mt-2`}
                >
                  {stockAvailability()}
                </p>
              </div>

              {/* Quantity */}
              <div className="mt-5">
                <div className="flex flex-row items-center gap-8">
                  <button
                    type="button"
                    onClick={() => dispatch(decQuantity())}
                    className="bg-gray-300 h-8 w-8 flex justify-center items-center rounded-full font-semibold font-mono"
                  >
                    -
                  </button>
                  <p className="font-mono text-1xl">{quantity}</p>
                  <button
                    type="button"
                    onClick={() => dispatch(incQuantity())}
                    disabled={quantity >= product.stock}
                    className="bg-gray-300 h-8 w-8 flex justify-center items-center rounded-full font-semibold font-mono"
                  >
                    +
                  </button>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex flex-row gap-8 items-center">
                  <NavLink to={`/order?productId=${productId}`}>
                    <button
                      type="button"
                      disabled={product.stock === 0}
                      onClick={handleToOrder}
                      className="cursor-pointer w-35 border border-[#8f49ff] bg-[#8f49ff] text-white rounded-full p-2 px-5 hover:bg-[#5203a1] transition-colors duration-300 font-semibold"
                    >
                      Buy Now
                    </button>
                  </NavLink>
                  <button
                    type="button"
                    disabled={product.stock === 0}
                    onClick={handleAddToCart}
                    className="cursor-pointer w-35 text-[#8f49ff] border border-[#8f49ff] rounded-full p-2 px-5 hover:bg-[#993df5] hover:text-white hover:border-[#993df5] transition-colors duration-300 font-semibold"
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-5">
                <p className="flex items-center gap-4">
                  <span className="text-2xl text-amber-500">
                    <PiPackage />
                  </span>
                  Estimate Delivery: within {product.estimateDeliveryTime ?? 3}{" "}
                  days
                </p>
                <p className="flex items-center gap-4 mt-5">
                  <span className="text-2xl text-amber-500">
                    <BsCalendarDate />
                  </span>
                  Delivery Date: {dateFormat(product.estimateDeliveryTime)}
                </p>
              </div>
            </div>
          </div>
          {/* Related Products */}
          <div className="mt-10">
            <h2 className="font-bold text-[#333] text-3xl mt-10">
              More You May Like
            </h2>
            <div className="mt-5">
              <ProductSlide products={relatedProducts} />
            </div>
          </div>

          {/* Reviews */}
          <div className="flex flex-row gap-10 mt-10">
            <div>
              <h2 className="font-bold mt-10 text-2xl text-[#333]">
                Product Reviews ({product.reviews?.length})
              </h2>
              <ul className="p-3 mt-5 flex flex-col gap-4">
                {Array.isArray(product?.reviews) &&
                product.reviews.length > 0 ? (
                  product.reviews.map((each) => (
                    <li
                      key={each._id}
                      className="flex flex-col gap-2 border border-purple-300 rounded-2xl p-2 w-[300px] lg:w-[450px]"
                    >
                      <div className="flex flex-row justify-between gap-3">
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">{each.userName}</p>
                          <div className="flex flex-row gap-1">
                            <RatingStars ratings={each.rating} />
                            <p>{each.rating}</p>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#333]">
                          {timeDifferenceFormat(each.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p>{each.comment}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <div>No reviews</div>
                )}
              </ul>
            </div>

            {/* Review Form */}
            <div className="w-[40%]">
              <h2 className="font-bold mt-10 text-2xl text-[#333]">
                Add Your Review
              </h2>
              <form
                onSubmit={handleAddReview}
                className="flex flex-col gap-2 text-[#333] mt-5"
              >
                <label htmlFor="comment" className="font-semibold">
                  Comment
                </label>
                <textarea
                  id="comment"
                  type="text"
                  value={comment}
                  placeholder="Enter your thoughts about this product"
                  onChange={(e) => setComment(e.target.value)}
                  className="border p-2 rounded-md outline-0"
                />
                <label htmlFor="rating" className="font-semibold">
                  Rating
                </label>
                <select
                  id="rating"
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  className="border p-2 rounded-md outline-0 w-[20%]"
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div className="flex gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={comment === "" || rating === ""}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
                  >
                    Post review
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setComment("");
                      setRating("");
                    }}
                    className="border px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
