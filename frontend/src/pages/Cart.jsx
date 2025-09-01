import {
  fetchGetCartById,
  fetchDeleteCartItem,
  fetchUpdateQuantity,
} from "../features/Cart/CartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItemCard from "../components/CartItemCard/CartItemCard";
import priceFormat from "../utlis/priceFormat";
import { setExistingCartList } from "../features/Order/orderSlice";
import Beat from "../components/Loader/Beat";

const Cart = () => {
  const cartList = useSelector((state) => state.cart.existingCartList);
  const loading = useSelector((state) => state.cart.loading);
  const userId = useSelector((state) => state.auth.user?._id);
  const selectedCartItem = useSelector((state) => state.order.selectedItems);
  const dispatch = useDispatch();

  const handleFetchCart = async () => {
    await dispatch(fetchGetCartById(userId));
  };

  useEffect(() => {
    if (userId) {
      handleFetchCart();
    }
  }, []);

  let totalCartPrice = 0;
  const totalCartCost = () => {
    const totalCost = selectedCartItem.reduce(
      (acc, total) => acc + total.itemTotal,
      0
    );
    totalCartPrice = priceFormat(totalCost);
    return totalCartPrice;
  };
  totalCartCost();

  const updateSelectedList = (cartId, quantity, price) => {
    const updatedList = selectedCartItem.map((each) =>
      each._id === cartId
        ? { ...each, quantity: quantity, itemTotal: price * quantity }
        : each
    );
    dispatch(setExistingCartList(updatedList));
  };

  const handleDeleteCartItem = async (cartId) => {
    await dispatch(fetchDeleteCartItem(cartId));
    handleFetchCart();
    updateSelectedList(cartId, 0, 0);
  };

  const handleCartItemQty = async (cartId, quantity) => {
    const result = await dispatch(fetchUpdateQuantity({ cartId, quantity }));
    const { data } = result.payload;
    console.log(data);
    // updateSelectedList(data._id, data.quantity, data.price);
  };

  return (
    <div className="p-4 md:p-10 min-h-[80vh] bg-[#f5f5f5]">
      <div className="flex flex-col h-full">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold text-[#333]">Your Cart</h2>
        </div>
        {loading ? (
          <Beat />
        ) : (
          <div className="h-full flex flex-col">
            {Array.isArray(cartList) && cartList.length > 0 ? (
              <ul className="flex flex-col gap-4 mt-4 min-h-[50vh]">
                {cartList.map((each) => (
                  <CartItemCard
                    cartItem={each}
                    key={each._id}
                    onClickDeleteItem={handleDeleteCartItem}
                    onClickUpdateCartItem={handleCartItemQty}
                  />
                ))}
              </ul>
            ) : (
              <div className="flex flex-col justify-center items-center h-[50vh] gap-2 text-[#333]">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p>Add some items to the cart.</p>
                <NavLink to="/product?page=1">
                  <button
                    type="button"
                    className="cursor-pointer font-semibold  border border-[#8f49ff] bg-[#8f49ff] text-white rounded-2xl p-2 pl-3 pr-3 hover:bg-[#5203a1] transition-colors duration-300 mt-4"
                  >
                    Add Products
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        )}
        <div
          className={`self-center md:self-end flex flex-col items-center md:flex-row gap-6 mt-4 ${
            cartList.length > 0 ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-[#333] text-right">
              Total Price: {totalCartPrice}
            </h2>
            <p className="italic text-right text-[14px] text-gray-500">
              *select your item to see the total price
            </p>
          </div>
          <NavLink to="/order" className="w-full md:w-fit">
            <button
              type="button"
              className="cursor-pointer font-semibold w-full md:w-fit  border border-[#8f49ff] bg-[#8f49ff] text-white rounded-2xl p-2 pl-3 pr-3 hover:bg-[#5203a1] transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-200"
              disabled={selectedCartItem.length === 0}
            >
              Place Order
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
