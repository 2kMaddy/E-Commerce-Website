import { NavLink } from "react-router-dom";
import priceFormat from "../../utlis/priceFormat";
import RatingStars from "../StarRepeater/RatingStars.jsx";

const ProductCart = (props) => {
  const { productName, image, price, ratings, _id, reviews } =
    props.productDetail;
  const { imageUrl } = image[0] || {};

  return (
    <NavLink to={`/product/${_id}`}>
      <div className="w-[230px] lg:w-[300px] flex flex-col gap-3 bg-white rounded-2xl shadow-md hover:text-[#993df5]">
        <div className="w-full overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={productName}
            className="w-full hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-2 lg:p-5 flex flex-row justify-between">
          <div className="gap-4 flex flex-col">
            <h3 className="font-semibold">{productName}</h3>
            <div>
              <RatingStars ratings={ratings} noOfReviews={reviews.length} />
            </div>
          </div>
          <div>
            <p className="font-semibold">{priceFormat(price)}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCart;
