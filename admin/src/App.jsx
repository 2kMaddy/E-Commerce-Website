import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./components/Dashboard";
import Login from './components/Login'
import Product from './components/Product'
import AddProduct from './components/AddProduct'
import Customer from './components/Customer'
import OrdersTable from './components/Orders';
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/admin-login" element = {<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product" element={<Product />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/orders" element={<OrdersTable />} />
    </Routes>
  );
}

export default App;
