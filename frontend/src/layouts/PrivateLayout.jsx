import React from "react";
import NavBar from "./NavBar";

const PrivateLayout = ({ children }) => {
  return <div>
      <NavBar />
      <div>{children}</div>
    </div>
  

};

export default PrivateLayout;
