import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/userService";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword({ token, password });
    setMessage(result.data?.message || "An error occurred. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
      <button type="button" onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </form>
  );
};

export default ResetPassword;
