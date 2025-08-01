import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import CategoryList from "../CategoryList/CategoryList";

const Navbar = () => {
  const isAuthorised = useSelector((state) => state.auth.isAuthenticated);
  const [openCategories, setOpenCategories] = useState(false);

  const closePopup = () => {
    setOpenCategories(false);
  };

  return (
    <>
      <nav className="nav-bar width-100">
        <div className="nav-bar-container flex-row justify-between align-center">
          <div className="nav-left flex-row align-center">
            <VscMenu className="nav-menu-icon" />
            <div className="lg-nav-options flex-row justify-between align-center">
              <NavLink to="/" className="lg-nav-options-item">
                Home
              </NavLink>
              <button
                type="button"
                onClick={() => setOpenCategories((prev) => !prev)}
                className="lg-nav-options-item"
              >
                Category
              </button>
              <NavLink to="/order" className="lg-nav-options-item">
                Orders
              </NavLink>
              <NavLink to="/contact" className="lg-nav-options-item">
                Contact
              </NavLink>
            </div>
          </div>
          <div className="nav-center">
            <NavLink to="/">
              <img
                src="src\assets\Logo Black.png"
                alt="logo"
                className="nav-bar-logo"
              />
            </NavLink>
          </div>
          {isAuthorised ? (
            <div className="nav-right flex-row align-center">
              <NavLink to="/cart">
                <button type="button" className="background-btn nav-bar-btn">
                  <FiShoppingCart />
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button type="button" className="outline-btn nav-bar-btn">
                  <FiUser />
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="nav-right flex-row align-center">
              <NavLink to="/login">
                <button type="button" className="background-btn nav-bar-btn">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button type="button" className="outline-btn nav-bar-btn">
                  Signup
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
      {openCategories && <CategoryList onClose={closePopup} />}
    </>
  );
};

export default Navbar;
