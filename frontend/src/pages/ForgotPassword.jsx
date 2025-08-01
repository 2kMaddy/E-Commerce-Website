import { useState } from "react";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { forgotPassword } from "../services/userService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const result = await forgotPassword({ email });
      setMessage(
        result.data?.message ||
          "If an account with that email exists, a reset link has been sent."
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container padding-20 flex-column justify-center align-center">
      <form
        onSubmit={handleSubmit}
        className="flex-column justify-center align-center padding-20 login-card"
      >
        <h2>Forgot Password</h2>
        <div className="login-input-container">
          <label htmlFor="email">Email</label>
          <div className="input-container">
            <div className="input-logo">
              <MdAlternateEmail />
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="background-btn login-btn"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">*{error}</p>}
        <Link to="/login" className="width-100">
          <button type="button" className="outline-btn login-btn">
            Back to Login
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
