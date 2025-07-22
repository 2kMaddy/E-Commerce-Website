import { useState } from "react";
import { forgotPassword } from "../services/userService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgotPassword({ email });
    setMessage(result.data?.message || "An error occurred. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      {message}
    </form>
  );
};

export default ForgotPassword;
