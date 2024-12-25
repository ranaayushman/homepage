import React from "react";
import Form from "./Form";
// import { SelectField } from "./form/ui/SelectField";..

const Hero = () => {
  return (
    <div className="bg-hero bg-contain bg-no-repeat h-full grid grid-cols-2">
      <div></div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default Hero;
