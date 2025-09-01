import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { setSelectedItems, setNewList } from "../../features/Order/orderSlice";
import priceFormat from "../../utlis/priceFormat";
import { NavLink } from "react-router-dom";

const CartItemCard = (props) => {
  const {
    _id,
    thumbnailUrl,
    productId,
    productName,
    totalPrice,
    quantity,
    size,
  } = props.cartItem;
  const { onClickDeleteItem, onClickUpdateCartItem } = props;
  const dispatch = useDispatch();

  const existingList = useSelector((state) => state.order.selectedItems);
  const exists = existingList.some((item) => item._id === _id);
  const [cartQuantity, setcartQuantity] = useState(quantity);
  const [isItemSelected, setIsItemSelected] = useState(exists);

  useEffect(() => {
    setcartQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    if (isItemSelected && cartQuantity !== quantity) {
      handleSelectItem(isItemSelected);
    }
  }, [isItemSelected, cartQuantity]);

  let price = totalPrice / quantity;

  const handleSelectItem = (checked) => {
    setIsItemSelected(checked);
    console.log(checked);
    if (checked) {
      const newObject = {
        _id,
        productId,
        productName,
        thumbnailUrl,
        size,
        quantity: cartQuantity,
        itemTotal: price * cartQuantity,
      };

      const exists = existingList.some((item) => item._id === _id);

      if (!exists) {
        // Add new item
        dispatch(setSelectedItems(newObject));
      } else {
        // Update existing item
        const newList = existingList.map((each) =>
          each._id === _id ? { ...each, ...newObject } : each
        );
        dispatch(setNewList(newList));
      }
    } else {
      // Remove item if unchecked
      const newList = existingList.filter((each) => each._id !== _id);
      dispatch(setNewList(newList));
    }
  };

  const updatecartQuantity = (action) => {
    setcartQuantity((prev) => {
      let newQty = prev;
      if (action === "inc") newQty = prev + 1;
      else if (action === "dec" && prev > 1) newQty = prev - 1;
      if (newQty !== prev) {
        onClickUpdateCartItem(_id, newQty, price);
      }
      return newQty;
    });
  };

  return (
    <li
      key={_id}
      className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 rounded-md p-4 gap-4 md:gap-0"
    >
      <div className="flex flex-row items-start md:items-center gap-4">
        <input
          type="checkbox"
          checked={isItemSelected}
          onChange={(e) => handleSelectItem(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <NavLink to={`/product/${productId}`}>
          <div className="flex flex-row gap-3">
            <img src={thumbnailUrl} className="w-30 h-30" alt="thumbnail" />
            <div>
              <div className="flex flex-col gap-2">
                <p className="text-[14px] md:text-xl text-[#333] font-semibold">
                  {productName}
                </p>
                <p className="text-[14px]">
                  {priceFormat(price * cartQuantity)}
                </p>
                <p className="font-semibold text-[14px] text-[#333]">
                  Size: <span className="font-normal">{size}</span>
                </p>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
      <div className="flex flex-col items-start md:items-center gap-1 h-20">
        <h2 className="font-semibold text-[#333]">Selected Quantity</h2>
        <div className="flex flex-row items-center gap-4 border-purple-700 border rounded-xl p-1">
          <button
            type="button"
            onClick={() => updatecartQuantity("dec")}
            className="font-bold font-mono cursor-pointer pr-2 pl-2"
            disabled={quantity === 1}
          >
            -
          </button>
          <p className="font-mono text-1xl">{cartQuantity}</p>
          <button
            type="button"
            onClick={() => updatecartQuantity("inc")}
            className="font-bold font-mono cursor-pointer pr-2 pl-2"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
        <button
          type="button"
          onClick={() => onClickDeleteItem(_id)}
          className="cursor-pointer text-[16px] text-[#8f49ff] border border-[#8f49ff] rounded-2xl p-2 hover:bg-[#993df5] hover:text-white hover:border-[#993df5] transition-colors duration-300"
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default CartItemCard;
