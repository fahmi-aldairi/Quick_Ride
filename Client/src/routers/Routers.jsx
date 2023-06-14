/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Layout from "../components/Dashboard/Layout/Layout";
import Providers from "../pages/Dashboard/Providers";
import Settings from "../pages/Dashboard/Settings";
import Costumers from "../pages/Dashboard/Costumers";
import Cars from "../pages/Dashboard/Cars";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admins from "../pages/Dashboard/Admins";
import RentedCars from "../pages/Dashboard/RentedCars";
import ProfilePage from "../pages/userProfile";
import Checkout from "../pages/Checkout";
import Edit from "../components/UI/ProfileProvider";
import ProviderUplodedCar from "../pages/PoviderUplodedCar";
import ProviderAddCar from "../pages/providerAddCar";
import ThankY from "../components/UI/ThankY";
import Header from "./../components/Header/Header";
import Footer from "./../components/Footer/Footer";
import { useEffect, useState } from "react";

const Routers = () => {
  const [isLog, updateIsLog] = useState(localStorage.getItem("token") ? true : false);

  return (
    <>
      <Header isLog={isLog} updateIsLog={updateIsLog} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:slug" element={<CarDetails />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signIn" element={<SignIn updateIsLog={updateIsLog} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/providerAddCar" element={<ProviderAddCar />} />
        <Route path="/ProviderUplodedCar" element={<ProviderUplodedCar />} />
        <Route path="/userProfile" element={<ProfilePage />} />
        <Route path="/Checkout/:slug" element={<Checkout />} />
        <Route path="/ThankY" element={<ThankY />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="Dashboard" index element={<Dashboard />} />
          <Route path="Cars" element={<Cars />} />
          <Route path="Costumers" element={<Costumers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="Providers" element={<Providers />} />
          <Route path="Admins" element={<Admins />} />
          <Route path="RentedCars" element={<RentedCars />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Routers;
