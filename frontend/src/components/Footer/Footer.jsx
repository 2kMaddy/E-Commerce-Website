import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo-container">
        <img src="FYNL Logo.png" alt="logo" className="footer-logo" />
      </div>
      <div className="social-media-container">
        <div className="social-media-logo-container">
          <FaInstagram />
        </div>
        <div className="social-media-logo-container">
          <AiOutlineYoutube />
        </div>
        <div className="social-media-logo-container">
          <BsTwitterX />
        </div>
      </div>
      <div className="copy-rigth-sec">
        &copy; {new Date().getFullYear()} FYNL Wear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
