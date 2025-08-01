import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../features/Auth/authSlice";

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
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthWrapper;
