"use client";
import React, { useState } from "react";
import FormNavbar, { FormStep } from "./ui/FormNavbar";

const Register = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("basic");
  return (
    <div className="bg-[#FFFFFF]">
      <div>
        <FormNavbar currentStep={currentStep} />
      </div>
    </div>
  );
};

export default Register;
