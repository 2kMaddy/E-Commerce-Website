import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiKeyboard } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPassword } from "../services/userService";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword({ token, password });
    setMessage(result.data?.message || "An error occurred. Please try again.");
  };

  return (
    <div className="page-container flex-column justify-center align-center padding-20">
      <form
        onSubmit={handleSubmit}
        className="login-card flex-column justify-center align-center padding-20"
      >
        <h2>Reset Password</h2>

        <div className="login-input-container flex-column">
          <label htmlFor="password">New Password</label>
          <div className="input-container flex-row align-center">
            <div className="input-logo">
              <CiKeyboard />
            </div>
            <input
              id="password"
              placeholder="New Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </div>
        <button type="submit" className="background-btn login-btn">
          Reset Password
        </button>
        {message && <p className="error-message">*{message}</p>}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="login-btn outline-btn"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
