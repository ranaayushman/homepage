import React from "react";
import Hero from "./sections/Hero";
import PrincipalDesk from "./sections/PrincipalDesk";
import AssociateSchools from "./sections/AssociateSchools";
import Perks from "./sections/Perks";

const Home = () => {
  return (
    <div>
      <Hero />
      <PrincipalDesk />
      <AssociateSchools />
      <Perks />
    </div>
  );
};

export default Home;
