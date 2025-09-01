import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const isLoading = useSelector((state) => state.auth.loading);

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
    <div className="flex justify-center items-center p-5 bg-gradient-to-r from-[#f4edff] to-[#d6c8f4] min-h-screen max-h-full bg-cover">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 flex justify-center items-center flex-col gap-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-2 w-full"
        >
          <img
            src="https://res.cloudinary.com/dhavsxxnd/image/upload/v1755936903/Logo_Black-removebg-preview_dbskal.png"
            alt="logo"
            className="w-[250px]"
          />
          <h2 className="text-2xl font-bold">
            {activeRoute === "Signup" ? "Signup" : "Login"}
          </h2>
          {activeRoute === "Signup" ? (
            <div className="w-full">
              <label htmlFor="name">Name</label>
              <div className="flex flex-row items-center border border-gray-500 rounded-md p-2">
                <div>
                  <MdOutlineDriveFileRenameOutline className="text-xl" />
                </div>
                <input
                  id="name"
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="outline-0 w-full ml-2"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="w-full">
            <label htmlFor="username">Username</label>
            <div className="flex flex-row items-center border border-gray-500 rounded-md p-2">
              <div>
                <CiUser className="text-xl" />
              </div>
              <input
                id="username"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-0 w-full ml-2"
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="password">Password</label>
            <div className="flex flex-row items-center border border-gray-500 rounded-md p-2">
              <div>
                <CiKeyboard className="text-xl" />
              </div>
              <input
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-0 w-full ml-2"
              />
              <button
                className="text-xl outline-0"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>
          {error && (
            <div className="text-red-500 w-full font-bold text-xs">
              *{error}
            </div>
          )}
          {isLoading ? (
            <div className="w-full flex justify-center items-center bg-gray-300 p-2 rounded-md">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-[#993df5] text-white p-2 rounded-md hover:bg-[#7a2ac6] transition-colors duration-300"
            >
              {activeRoute === "Signup" ? "Signup" : "Login"}
            </button>
          )}

          <div className="flex flex-col items-start w-full gap-1 md:flex-row justify-between">
            <div className="flex flex-row">
              {activeRoute === "Signup" ? (
                <>
                  <p>Already have an account?</p>
                  <a
                    href="/login"
                    className="text-blue-500  hover:underline transition-colors duration-300 ml-0.5"
                  >
                    Login
                  </a>{" "}
                </>
              ) : (
                <>
                  <p>Don't have an account?</p>
                  <a
                    href="/signup"
                    className="text-blue-500  hover:underline transition-colors duration-300 ml-0.5"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
            {activeRoute === "Signup" ? (
              ""
            ) : (
              <a
                href="/forgot-password"
                className="text-blue-500  hover:underline transition-colors duration-300 ml-0.5"
              >
                Forgot Password?
              </a>
            )}
          </div>
        </form>
        <div className="flex flex-row items-center w-full gap-1">
          <hr className="w-full" />
          <span>OR</span>
          <hr className="w-full" />
        </div>
        <div className="w-full">
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
