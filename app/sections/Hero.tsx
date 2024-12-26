import React from "react";
import Form from "./Form";

const Hero = () => {
  return (
    <div className="bg-hero bg-cover bg-center m-0 bg-no-repeat h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block"></div>
        <div className="w-full">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Hero;
