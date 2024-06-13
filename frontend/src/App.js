import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Register from "./Componets/AuthPages/Register";
import Login from "./Componets/AuthPages/Login";
import AdminDashboard from "./Componets/DashBoard/adminDashboard";
import CreateCategory from "./Componets/Admin/createCategory";
import AdminRoute from "./Routes/AdminRoute";
import CreateProduct from "./Componets/Admin/createProduct";
import Products from "./Componets/Admin/products";
import UpdateProduct from "./Componets/Admin/updateProduct";
import PrivateRoute from "./Routes/PrivateRoute";
import UserDashboard from "./Componets/DashBoard/userDashboard";
import Profile from "./Componets/User/Profile";
import ProductDetails from "./Home/ProductDetails";
import Cloths from "./Home/cloths";
import Gadgets from "./Home/Gadgets";
import CartPage from "./Home/CartPage";
import Payment from "./Home/payment";
import { SearchProvider } from "./Contexts/SearchContext";
import Search from "./Home/Search";
import Wishlist from "./Home/Wishlist";
import Shoes from "./Home/Shoes";
import Orders from "./Componets/User/Orders";
import AdminOrders from "./Componets/Admin/AdminOrders";
import Spin from "./Home/Spin";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/product/:slug" element={<ProductDetails/>}/>
        <Route path="/cloths" element={<Cloths/>}/>
        <Route path="/gadgets" element={<Gadgets/>}/>
        <Route path="/shoes" element={<Shoes/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/spin" element={<Spin/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/all-orders" element={<AdminOrders/>}/>
          <Route path="admin/product" element={<Products/>}/>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        </Route>
        <Route path="/dashboard" element={<PrivateRoute/>}>
         <Route path="user" element={<UserDashboard/>}/>
         <Route path="user/profile" element={<Profile/>}/>
         <Route path="user/order" element={<Orders/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
