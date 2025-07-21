import { NavLink } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { BackgroundBtn, OutlineBtn } from "../Button/Button";

const Navbar = () => {
  return (
    <nav className="nav-bar-container">
      <div className="lg-nav-bar">
        <a href="/">Home</a>
        <p>Category</p>
        <a href="/">Orders</a>
        <a href="/">Contact</a>
      </div>
      <div className="sm-nav-bar">
        <VscMenu />
      </div>
      <div className="nav-bar-logo-container">
        <img src="FYNL Logo.png" alt="logo" className="nav-bar-logo" />
      </div>
      <div className="nav-bar-btn-container">
        <BackgroundBtn value="Login" />
        <OutlineBtn value="Signup" />
      </div>
    </nav>
  );
};

export default Navbar;
