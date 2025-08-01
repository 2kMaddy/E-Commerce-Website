import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { PiPackage } from "react-icons/pi";
import { BsCalendarDate } from "react-icons/bs";
import {
  fetchProductById,
  fetchAddReview,
} from "../features/Products/productSlice";
import {
  incQuantity,
  decQuantity,
  fetchAddToCart,
} from "../features/Cart/CartSlice";
import { setNewList } from "../features/Order/orderSlice";
import priceFormat from "../utlis/priceFormat";
import dateFormat from "../utlis/dateFormat";
import timeDifferenceFormat from "../utlis/timeDifferenceFormat";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const product = useSelector((state) => state.products.productDetail);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId, product]);

  const isAuthorised = useSelector((state) => state.auth.isAuthenticated);
  const quantity = useSelector((state) => state.cart.quantity);
  const userId = useSelector((state) => state.auth.user?._id);
  const userName = useSelector((state) => state.auth.user?.name);
  const size = useSelector((state) => state.cart.size);

  const stockAvailability = () => {
    let stockText;
    if (product.stock === 0) {
      stockText = "Out of Stock";
    } else if (product.stock < 15) {
      stockText = `Only ${product.stock} left`;
    } else {
      stockText = "In Stock";
    }
    return stockText;
  };

  const handleAddToCart = async () => {
    if (!isAuthorised) {
      return navigate("/login");
    }
    const object = {
      userId,
      productId,
      productName: product.productName,
      thumbnailUrl: product.image[0].imageUrl,
      size,
      quantity,
      totalPrice: product.price * quantity,
    };
    const response = await dispatch(fetchAddToCart(object));
    console.log(response);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const newObject = {
      userId,
      userName,
      comment,
      rating,
    };
    const response = await dispatch(
      fetchAddReview({ productId, review: newObject })
    );
    if (response?.meta?.requestStatus === "fulfilled") {
      setComment("");
      setRating("");
    }
  };

  const handleToOrder = () => {
    const newObject = [
      {
        productId: product._id,
        productName: product.productName,
        thumbnailUrl: product.image[0].imageUrl,
        size: size,
        quantity: quantity,
        itemTotal: product.price * quantity,
      },
    ];
    dispatch(setNewList(newObject));
    navigate("/order");
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="top-container">
          <div className="product-detail-img-container">
            <div className="product-detail-img-thumbnail-container">
              {Array.isArray(product?.image) && product.image.length > 0 ? (
                product.image.map((each, index) => (
                  <img
                    key={index}
                    src={each.imageUrl}
                    alt={`Product ${index + 1}`}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
          <div className="product-detail-container">
            <p>{product.category}</p>
            <h1>{product.productName}</h1>
            <h2>{priceFormat(product.price)}</h2>
            <h3></h3>
            <p>{stockAvailability()}</p>
            <div className="size-availability-container">
              <p>Size</p>
              <div className="available-size">
                {Array.isArray(product?.size) && product.size.length > 0 ? (
                  product.size.map((each, index) => {
                    <button type="button" key={index}>
                      {each}
                    </button>;
                  })
                ) : (
                  <p>No particular size</p>
                )}
              </div>
            </div>
            <div className="qty-addtocart-btn-container">
              <div className="qty-btn-container">
                <button
                  type="button"
                  className="inc-dec-btn"
                  onClick={() => dispatch(decQuantity())}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  type="button"
                  className="inc-dec-btn"
                  onClick={() => dispatch(incQuantity())}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-to-cart-btn"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <NavLink to={`/order?productId=${productId}`}>
                <button
                  type="button"
                  className="buy-now-btn"
                  disabled={product.stock === 0}
                  onClick={handleToOrder}
                >
                  Buy Now
                </button>
              </NavLink>
            </div>
            <div>
              <p>
                <span>
                  <PiPackage />
                </span>
                Estimate Delivery: within {product.estimateDeliveryTime ?? 3}{" "}
                days
              </p>
              <p>
                <span>
                  <BsCalendarDate />
                </span>
                Delivery Date: {dateFormat(product.estimateDeliveryTime)}
              </p>
            </div>
            <div>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
        <div className="review-container">
          <ul className="review-list-item-container">
            {Array.isArray(product?.reviews) && product.reviews.length > 0 ? (
              product.reviews.map((each) => {
                return (
                  <li key={each._id}>
                    <div>
                      <p>{each.userName}</p>
                      <p>{each.rating}</p>
                      <p>{timeDifferenceFormat(each.createdAt)}</p>
                    </div>
                    <div>
                      <p>{each.comment}</p>
                    </div>
                  </li>
                );
              })
            ) : (
              <div>No reviews</div>
            )}
          </ul>
          <div className="add-review-container">
            <form className="review-form" onSubmit={handleAddReview}>
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                type="text"
                value={comment}
                placeholder="Enter your thoughts about this product"
                onChange={(e) => setComment(e.target.value)}
              />
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
              >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div>
                <button
                  type="submit"
                  disabled={comment === "" || rating === ""}
                >
                  Post review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setComment("");
                    setRating("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
