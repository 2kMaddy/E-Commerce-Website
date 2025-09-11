import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Order from "../pages/Order";
import Cart from "../pages/Cart";
import MyOrders from "../pages/MyOrders";
import ProtectedRoute from "../components/ProtectedRoute";
import UserLayout from "../layout/UserLayout";
import "../styles/main.css";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsandConditions from "../pages/TermsandConditions";
import RefundPolicy from "../pages/RefundPolicy";
import ShippingPolicy from "../pages/ShippingPolicy";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "product", element: <ProductList /> },
      { path: "product/:productId", element: <ProductDetail /> },
      { path: "product-by-category/:category", element: <ProductList /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <TermsandConditions /> },
      { path: "refund-policy", element: <RefundPolicy /> },
      { path: "shipping-policy", element: <ShippingPolicy /> },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
]);

export default AppRoutes;
