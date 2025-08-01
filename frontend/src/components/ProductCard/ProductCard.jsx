import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import priceFormat from "../../utlis/priceFormat";

const ProductCart = (props) => {
  const { productName, image, price, ratings, _id } = props.productDetail;
  const { imageUrl } = image[0] || {};

  return (
    <NavLink to={`/product/${_id}`} className="text-decoration-none width-100">
      <div className="product-card-content width-100">
        <div className="card-image-container width-100">
          <img
            src={imageUrl}
            alt={productName}
            className="product-card-image width-100"
          />
        </div>
        <div className="product-card-detail flex-column padding-20">
          <h3 className="product-card-title">{productName}</h3>
          <div className="flex-row align-center justify-between">
            <p className="product-card-price">{priceFormat(price)}</p>
            <p className="product-card-price">
              <span>
                <FaStar className="star-icon" />
              </span>
              {ratings}
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCart;
