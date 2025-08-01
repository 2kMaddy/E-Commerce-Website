import { useRef } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

import ProductCart from "../ProductCard/ProductCard";

const ProductSlide = ({ products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;

    const scrollAmount = 800; // Customize as needed
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="latest-product-list">
      <button onClick={() => scroll("left")} className="arrow-btn">
        <FaCircleChevronLeft />
      </button>

      <div ref={scrollRef} className="latest-product-slides overflow-x-auto">
        {products.length > 0 ? (
          <div className="flex-row align-center width-100">
            {products.map((product) => (
              <div className="margin-12 latest-product-items" key={product._id}>
                <ProductCart productDetail={product} />
              </div>
            ))}
          </div>
        ) : (
          <p>No latest products available.</p>
        )}
      </div>
      <button onClick={() => scroll("right")} className="arrow-btn right">
        <FaCircleChevronRight />
      </button>
    </div>
  );
};

export default ProductSlide;
