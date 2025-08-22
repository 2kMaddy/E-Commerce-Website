import { NavLink } from "react-router-dom";
import React, { useEffect, useRef } from "react";

import categoriesConstants from "../../utlis/constants";

const CategoryList = (props) => {
  const { onClose } = props;
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="w-full flex justify-center items-center" ref={popupRef}>
      <ul className="absolute top-23 bg-white shadow-lg rounded-lg p-5 w-[30%] z-0 gap-4 flex flex-col">
        <h3 className="font-semibold">Categories</h3>
        {categoriesConstants.map((each) => (
          <NavLink
            onClick={onClose}
            to={`/product?category=${each.value}`}
            key={each.id}
            className="hover:text-[#993df5] text-black text-[16px]"
          >
            <li>{each.categoryName}</li>
          </NavLink>
        ))}
        <div
          className="absolute top-2 right-4 text-2xl cursor-pointer"
          onClick={onClose}
        >
          x
        </div>
      </ul>
    </div>
  );
};

export default CategoryList;
