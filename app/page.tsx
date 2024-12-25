import React from "react";
import Home from "./Home";
import Navbar from "./sections/Navbar";
import PrincipalDesk from "./sections/PrincipalDesk";
import AssociateSchools from "./sections/AssociateSchools";
import Perks from "./sections/Perks";

const page = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <PrincipalDesk />
      <AssociateSchools />
      <Perks />
    </div>
  );
};

export default page;
