import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import priceFormat from "../../utlis/priceFormat";

const ProductCart = (props) => {
  const { productName, image, price, ratings, _id, reviews } =
    props.productDetail;
  const { imageUrl } = image[0] || {};
  const ratingStars = Array(Math.round(ratings))
    .fill(null)
    .map((_, index) => <FaStar key={index} />);

  return (
    <NavLink to={`/product/${_id}`}>
      <div className="w-[400px] flex flex-col gap-3 bg-white rounded-2xl shadow-md hover:text-[#993df5]">
        <div className="w-[400px] overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={productName}
            className="w-[400px] hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 flex flex-row justify-between">
          <div className="gap-4 flex flex-col">
            <h3 className="font-semibold">{productName}</h3>
            <p className="flex flex-row items-center gap-1">
              <span className="flex flex-row gap-1 text-yellow-400">
                {ratingStars}
              </span>
              ({reviews.length})
            </p>
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
