"use client";
import React from "react";
import FormNavbar from "./ui/FormNavbar";
import AdmissionClass from "./ui/AdmissionClass";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";

const Register = () => {
  const { currentStep, progress } = useSelector(
    (state: RootState) => state.form
  );

  return (
    <div className="bg-[#FFFFFF]">
      <div>
        <FormNavbar currentStep={currentStep} progress={progress} />
        <AdmissionClass />
      </div>
    </div>
  );
};

export default Register;
