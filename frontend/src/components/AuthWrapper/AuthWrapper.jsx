import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../features/Auth/authSlice";
import "../../styles/main.css";
import Beat from "../Loader/Beat";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(fetchUserInfo());
      setLoading(false);
    };
    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Beat />
      </div>
    );
  }

  return children;
};

export default AuthWrapper;
