import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer width-100">
      <div className="footer-container flex-column justify-center align-center">
        <div>
          <h2>FYNL Wear</h2>
        </div>
        <div className="social-media-container flex-row justify-between align-center">
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
      </div>
    </footer>
  );
};

export default Footer;
