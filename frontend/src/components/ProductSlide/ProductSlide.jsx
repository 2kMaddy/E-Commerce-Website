import { useRef } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

import ProductCard from "../ProductCard/ProductCard";

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
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 z-20 transform -translate-y-1/2 text-4xl text-white rounded-full p-2 cursor-pointer"
      >
        <FaCircleChevronLeft />
      </button>

      <div>
        {products.length > 0 ? (
          <ul
            className="flex flex-row gap-3 overflow-x-auto hide-scrollbar"
            ref={scrollRef}
          >
            {products.map((product) => (
              <li key={product._id} className="w-[230px] lg:w-[300px]">
                <ProductCard productDetail={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No latest products available.</p>
        )}
      </div>
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 z-20 transform -translate-y-1/2 text-4xl text-white rounded-full p-2 cursor-pointer"
      >
        <FaCircleChevronRight />
      </button>
    </div>
  );
};

export default ProductSlide;
