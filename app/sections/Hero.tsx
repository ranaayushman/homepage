import React from "react";
import Form from "./Form";

const Hero = () => {
  return (
    <div className="bg-hero bg-cover bg-center m-0 bg-no-repeat h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="hidden md:block md:col-span-2"></div>
        <div className="w-full px-4 pt-10">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Hero;
