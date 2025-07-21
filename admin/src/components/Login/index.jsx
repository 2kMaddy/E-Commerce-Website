import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { adminLoginSubmit } from "../../utils/apiCommunicator";
import { BeatLoader } from "react-spinners";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    adminLoginSubmit(email, password)
      .then((response) => {
        if (response.success) {
          navigate("/product");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={handleLogin}>
        <h2 className="login-title">Admin Login</h2>
        <div className="login-input-container">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input-container">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? <BeatLoader size={8} color="#fff" /> : "Login"}
        </button>
        <div className="other-option-container">
          <Link>Forgot password?</Link>
          <Link>Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
