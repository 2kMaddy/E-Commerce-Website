import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { VscPackage } from "react-icons/vsc";

import "./index.css";

const Navbar = () => {
  return (
    <div className="nav-bar-container">
      <div className="logo-container">
        <img src="" alt="logo" className="website-logo" />
      </div>
      <nav className="nav-items-container">
        <li className="nav-item">
          <span className="nav-item-icon">
            <FiShoppingBag />
          </span>
          Product
        </li>
        <li className="nav-item">
          <span className="nav-item-icon">
            <HiOutlineUsers />
          </span>
          Customer
        </li>
        <li className="nav-item">
          <span className="nav-item-icon">
            <VscPackage />
          </span>
          Order
        </li>
      </nav>
    </div>
  );
};

export default Navbar;
