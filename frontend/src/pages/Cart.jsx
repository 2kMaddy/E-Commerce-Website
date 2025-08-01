import {
  fetchGetCartById,
  fetchDeleteCartItem,
  fetchUpdateQuantity,
} from "../features/Cart/CartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItemCard from "../components/CartItemCard/CartItemCard";

const Cart = () => {
  const cartList = useSelector((state) => state.cart.existingCartList);
  // const loading = useSelector((state) => state.cart.loading);
  const userId = useSelector((state) => state.auth.user?._id);
  const dispatch = useDispatch();

  const handleFetchCart = async () => {
    const response = await dispatch(fetchGetCartById(userId));
    console.log(response);
  };

  useEffect(() => {
    if (userId) {
      handleFetchCart();
    }
  }, []);

  // const totalCartCost = () => {
  //   const totalCost = cartList.reduce(
  //     (acc, total) => acc + total.totalPrice,
  //     0
  //   );
  //   console.log(totalCost);
  //   return totalCost;
  // };

  const handleDeleteCartItem = async (cartId) => {
    const response = await dispatch(fetchDeleteCartItem(cartId));
    handleFetchCart();
    console.log(response);
  };

  const handleUpdateCart = async (cartId, quantity) => {
    const response = await dispatch(fetchUpdateQuantity({ cartId, quantity }));
    handleFetchCart();
    console.log(response);
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h2>Your Cart</h2>
        <div>
          <ul className="cart-list-item-container">
            {Array.isArray(cartList) && cartList.length > 0 ? (
              cartList.map((each) => (
                <CartItemCard
                  cartItem={each}
                  key={each._id}
                  onClickDeleteItem={handleDeleteCartItem}
                  onClickUpdateItem={handleUpdateCart}
                />
              ))
            ) : (
              <div>
                <h2>Your cart is empty</h2>
                <p>Add some items to the cart.</p>
              </div>
            )}
          </ul>
        </div>
        <div>
          <NavLink to="/order">
            <button type="button">Buy</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
