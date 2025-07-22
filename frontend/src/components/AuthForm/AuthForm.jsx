import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginUser,
  googleLoginUser,
  signUpUser,
} from "../../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { CiUser, CiKeyboard } from "react-icons/ci";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AuthForm = (props) => {
  const { activeRoute } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let result = "";
    if (activeRoute === "Signup") {
      result = await dispatch(signUpUser({ name, email, password }));
    } else {
      result = await dispatch(loginUser({ email, password }));
    }

    if (result?.meta?.requestStatus === "fulfilled") {
      localStorage.setItem("userDetail", JSON.stringify(result?.data?.user));
      navigate("/");
    } else {
      setError(result.payload || "Login failed. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError(null);
    const result = await dispatch(
      googleLoginUser({ token: credentialResponse.credential })
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    } else {
      setError(result.payload || "Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    console.error("Google Login Failed");
  };

  return (
    <div className="page-container flex-column justify-center align-center">
      <div className="login-card">
        <form
          className="flex-column justify-center align-center"
          onSubmit={handleSubmit}
        >
          <div className="login-logo-container">
            <img
              src="src\assets\FYNL Logo.png"
              alt="logo"
              className="login-logo"
            />
          </div>
          <h2>{activeRoute === "Signup" ? "Signup" : "Login"}</h2>
          {activeRoute === "Signup" ? (
            <div className="login-input-container flex-column">
              <label htmlFor="name">Name</label>
              <div className="input-container flex-row align-center">
                <div className="input-logo">
                  <MdOutlineDriveFileRenameOutline />
                </div>
                <input
                  id="name"
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="login-input-container flex-column">
            <label htmlFor="username">Username</label>
            <div className="input-container flex-row align-center">
              <div className="input-logo">
                <CiUser />
              </div>
              <input
                id="username"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="login-input-container flex-column">
            <label htmlFor="password">Password</label>
            <div className="input-container flex-row align-center">
              <div className="input-logo">
                <CiKeyboard />
              </div>
              <input
                id="password"
                placeholder="Password"
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
          {error && <div className="error-message">*{error}</div>}
          <button type="submit" className="background-btn login-btn">
            {activeRoute === "Signup" ? "Signup" : "Login"}
          </button>
          <div className="login-footer space-between">
            <div className="flex-row align-center top-margin-12">
              {activeRoute === "Signup" ? (
                <>
                  <p>Already have an account?</p>
                  <a href="/login">Login</a>{" "}
                </>
              ) : (
                <>
                  <p>Don't have an account?</p>
                  <a href="/signup">Sign Up</a>
                </>
              )}
            </div>
            {activeRoute === "Signup" ? (
              ""
            ) : (
              <a href="/forgot-password" className="top-margin-12">
                Forgot Password?
              </a>
            )}
          </div>
        </form>
        <div className="hr-with-text">
          <span>OR</span>
        </div>
        <div className="google-login-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
