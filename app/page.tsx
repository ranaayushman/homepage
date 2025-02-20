import React from "react";
import Home from "./Home";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import HomePage from "./sections/HomePage";

const page = () => {
  return (
    <div>
      <Navbar />
      {/* <Home /> */}
      <HomePage />
      <Footer />
    </div>
  );
};

export default page;
