import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Toaster></Toaster>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
