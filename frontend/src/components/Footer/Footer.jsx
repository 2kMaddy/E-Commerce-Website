import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#a178fa] to-[#5e34fa]">
      <div className="flex  flex-col justify-center items-center w-full lg:flex-row lg:justify-between p-10">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start w-full lg:w-[40%]">
          <img
            src="https://res.cloudinary.com/dhavsxxnd/image/upload/v1755936903/Logo_White_gd2ygh.png"
            alt="logo"
            className="w-50"
          />
          <p className="text-white ml-3 mt-1">
            FYNL offers a curated collection of T-shirts for men, blending
            modern style with timeless comfort. Each piece is designed to help
            you make a personal statement without compromising on quality. Find
            your perfect fit and express your individuality through our unique
            designs.
          </p>
        </div>
        <div className="flex flex-col text-3xl text-white items-center w-full lg:w-[60%] mt-2.5">
          <h2 className="text-white text-2xl mb-7">Contact Us On</h2>
          <div className="flex flex-row gap-8">
            <div className="cursor-pointer hover:text-[#333] transition-colors duration-300">
              <FaInstagram />
            </div>
            <div className="cursor-pointer hover:text-[#333] transition-colors duration-300">
              <AiOutlineYoutube />
            </div>
            <div className="cursor-pointer hover:text-[#333] transition-colors duration-300">
              <BsTwitterX />
            </div>
          </div>
          <div className="mt-8 text-white flex flex-col gap-5 md:flex-row md:gap-10 justify-center items-center lg:gap-5 text-[16px]">
            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            <NavLink to="/terms-and-conditions">Terms & Conditions</NavLink>
            <NavLink to="/refund-policy">Refund Policy</NavLink>
            <NavLink to="/shipping-policy">Shipping Policy</NavLink>
          </div>
        </div>
      </div>
      <div className="w-full text-white text-center p-2">
        &copy; {new Date().getFullYear()} FYNL Wear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
