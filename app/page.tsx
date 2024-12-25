import React from "react";
import Home from "./Home";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default page;
