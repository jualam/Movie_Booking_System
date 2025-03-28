import React from "react";
import { Outlet } from "react-router-dom";

const Client = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Client;
