import React from "react";
import Home from "./Home";
import Navbar from "./sections/Navbar";
import PrincipalDesk from "./sections/PrincipalDesk";
import AssociateSchools from "./sections/AssociateSchools";

const page = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <PrincipalDesk />
      <AssociateSchools />
    </div>
  );
};

export default page;
