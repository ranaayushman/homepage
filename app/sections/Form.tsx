"use client";
import React, { useState } from "react";
import EnquiryForm from "./form/Enquiy";
import Login from "./form/Login";

const Form = () => {
  const [activeComponent, setActiveComponent] = useState<"enquiry" | "login">(
    "enquiry"
  );

  return (
    <div className=" w-full bg flex flex-col text-black">
      {/* Buttons div */}
      <div className="flex justify-center mt-6 w-3/4">
        <button
          className={`px-6 py-2 text-lg ${
            activeComponent === "enquiry"
              ? "bg-[#98B14F] text-white"
              : "bg-gray-300"
          } rounded-l-md`}
          onClick={() => setActiveComponent("enquiry")}
        >
          Enquiry
        </button>
        <button
          className={`px-6 py-2 text-lg ${
            activeComponent === "login"
              ? "bg-[#98B14F] text-white"
              : "bg-gray-300"
          } rounded-r-md`}
          onClick={() => setActiveComponent("login")}
        >
          Login
        </button>
      </div>

      {/* Form div */}
      <div className="flex justify-center items-end pb-10 ">
        <div className="w-full max-w-md">
          {activeComponent === "enquiry" && <EnquiryForm />}
          {activeComponent === "login" && <Login />}
        </div>
      </div>
    </div>
  );
};

export default Form;
