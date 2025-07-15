import { NavLink } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { VscPackage } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="nav-bar-container">
      <div className="logo-container">
        <img src="FYNL Logo.png" alt="logo" className="website-logo" />
      </div>
      <nav className="nav-items-container">
        <NavLink
          to="/product"
          className={({ isActive }) =>
            "nav-item" + (isActive ? " active-nav-item" : "")
          }
        >
          <span className="nav-item-icon">
            <FiShoppingBag />
          </span>
          Product
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            "nav-item" + (isActive ? " active-nav-item" : "")
          }
        >
          <span className="nav-item-icon">
            <HiOutlineUsers />
          </span>
          Customer
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            "nav-item" + (isActive ? " active-nav-item" : "")
          }
        >
          <span className="nav-item-icon">
            <VscPackage />
          </span>
          Order
        </NavLink>
      </nav>
      <div className="logout-btn-container">
        <button type="button" className="logout-btn" onClick={handleLogout}>
          <span className="logout-icon">
            <MdLogout />
          </span>{" "}
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
