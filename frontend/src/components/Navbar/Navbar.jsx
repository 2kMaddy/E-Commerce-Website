import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { logout } from "../../features/Auth/authSlice";
import { fetchGetCartById } from "../../features/Cart/cartSlice";
import { CategoryList, NavList } from "../Popup/Popup";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [noOfItemsInCart, setNoOfItemsInCart] = useState(0);

  const user = useSelector((state) => state.auth.user);
  const isAuthorised = useSelector((state) => state.auth.isAuthenticated);
  const cartItemsList = useSelector((state) => state.cart.existingCartList);
  const cartLength = useSelector((state) => state.cart.noOfItems);

  useEffect(() => {
    if (isAuthorised) {
      dispatch(fetchGetCartById(user._id));
      setNoOfItemsInCart(cartLength);
    }
  }, [cartLength, dispatch, isAuthorised, user]);

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("authToken");
    localStorage.removeItem("userProfileDetails");
    navigate("/");
  };

  return (
    <>
      <nav className="w-full flex flex-row font-semibold">
        <div className="flex flex-row justify-between items-center w-full p-4 bg-white shadow-md">
          <div>
            <NavLink to="/">
              <img
                src="https://res.cloudinary.com/dhavsxxnd/image/upload/v1755936903/Logo_Black-removebg-preview_dbskal.png"
                alt="logo"
                className="w-40 hidden lg:block"
              />
            </NavLink>
          </div>
          <div className="flex flex-row w-full lg:w-auto justify-between">
            <div className="block md:hidden">
              <NavList />
            </div>
            <div className="hidden md:flex flex-row gap-8">
              <NavLink
                to="/"
                className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5]"
              >
                Home
              </NavLink>
              <NavLink
                to="/product?page=1"
                className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5]"
              >
                Products
              </NavLink>
              <div>
                <CategoryList />
              </div>
              <NavLink
                to="/my-orders"
                className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5]"
              >
                Orders
              </NavLink>
              <NavLink
                to="/contact"
                className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5]"
              >
                Contact
              </NavLink>
            </div>
          </div>

          {isAuthorised ? (
            <div className="flex flex-row gap-5">
              <NavLink to="/cart">
                <button
                  type="button"
                  className="cursor-pointer text-[18px] p-2 hover:text-[#993df5]  transition-colors duration-300 flex items-center gap-2"
                >
                  <div className="relative">
                    <FiShoppingCart />
                    {cartItemsList.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        {noOfItemsInCart}
                      </span>
                    )}
                  </div>
                  <span className="text-[16px] hidden lg:block">Cart</span>
                </button>
              </NavLink>

              <button
                type="button"
                className="cursor-pointer text-[18px] p-2  hover:text-[#993df5]  transition-colors duration-300 flex items-center gap-2"
              >
                <FiUser />
                <span className="text-[16px] hidden lg:block">Account</span>
              </button>

              <div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer text-[18px] p-2   hover:text-[#993df5]  transition-colors duration-300 flex items-center gap-2"
                >
                  <IoMdLogOut />
                  <span className="text-[16px] hidden lg:block">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <NavLink to="/login">
                <button
                  type="button"
                  className="cursor-pointer w-24 border border-[#8f49ff] bg-[#8f49ff] text-white rounded-2xl p-2 pl-3 pr-3 hover:bg-[#5203a1] transition-colors duration-300"
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button
                  type="button"
                  className="cursor-pointer w-24 text-[#8f49ff] border border-[#8f49ff] rounded-2xl p-2 pl-3 pr-3 hover:bg-[#993df5] hover:text-white hover:border-[#993df5] transition-colors duration-300"
                >
                  Signup
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
