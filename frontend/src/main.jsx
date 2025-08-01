import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store/index.js";
import App from "./App.jsx";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthWrapper>
          <App />
        </AuthWrapper>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
