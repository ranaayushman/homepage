import React from "react";
import Home from "./Home";
import Navbar from "./sections/Navbar";
import PrincipalDesk from "./sections/PrincipalDesk";
import AssociateSchools from "./sections/AssociateSchools";
import Perks from "./sections/Perks";
import Footer from "./sections/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <PrincipalDesk />
      <AssociateSchools />
      <Perks />
      <Footer />
    </div>
  );
};

export default page;
