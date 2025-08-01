import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm/AuthForm";
import { useEffect } from "react";

const Login = () => {
  const isAuthorised = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthorised) {
      navigate("/");
    }
  }, [isAuthorised, navigate]);

  return <AuthForm activeRoute="Login" />;
};

export default Login;
