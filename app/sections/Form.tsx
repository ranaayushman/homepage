"use client";
import React, { useState } from "react";
import EnquiryForm from "./form/Enquiy";
import Login from "./form/Login";

const Form = () => {
  const [activeComponent, setActiveComponent] = useState<"enquiry" | "login">(
    "enquiry"
  );

  return (
    <div className="w-full md:w-1/2 bg flex flex-col text-black items-center mt-4 md:mt-10 px-4 md:px-0">
      {/* Wrapper div to ensure proper form width and alignment */}
      <div className="w-full max-w-md">
        {/* Buttons div - styled to match design */}
        <div className="flex w-full">
          <button
            className={`flex-1 px-4 md:px-8 py-2 text-base md:text-lg rounded-tl-lg transition-colors ${
              activeComponent === "enquiry"
                ? "bg-[#98B14F] text-white"
                : "bg-[#FFFFFF] text-[#BBBBBB]"
            }`}
            onClick={() => setActiveComponent("enquiry")}
          >
            Enquiry
          </button>
          <button
            className={`flex-1 px-4 md:px-8 py-2 text-base md:text-lg rounded-tr-lg transition-colors ${
              activeComponent === "login"
                ? "bg-[#98B14F] text-white"
                : "bg-[#FFFFFF] text-[#BBBBBB]"
            }`}
            onClick={() => setActiveComponent("login")}
          >
            Login
          </button>
        </div>

        {/* Form container with white background and rounded corners */}
        <div className="bg-white rounded-lg rounded-tl-none p-4 md:p-6 drop-shadow-2xl z-10">
          {activeComponent === "enquiry" && <EnquiryForm />}
          {activeComponent === "login" && <Login />}
        </div>
      </div>
    </div>
  );
};

export default Form;
