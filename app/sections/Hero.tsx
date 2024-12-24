"use client";
import React, { useState } from "react";
import EnquiryForm from "./form/Enquiy";
import Login from "./form/Login";

const Hero = () => {
  const [activeComponent, setActiveComponent] = useState<"enquiry" | "login">(
    "enquiry"
  );

  return (
    <section className="h-screen w-full bg-hero flex flex-col justify-between text-black">
      {/* Buttons Section */}
      <div className="flex justify-center mt-6">
        <button
          className={`px-6 py-2 mr-4 ${
            activeComponent === "enquiry"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          } rounded-md`}
          onClick={() => setActiveComponent("enquiry")}
        >
          Enquiry
        </button>
        <button
          className={`px-6 py-2 ${
            activeComponent === "login"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          } rounded-md`}
          onClick={() => setActiveComponent("login")}
        >
          Login
        </button>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-end pb-10">
        <div className="w-full max-w-md">
          {activeComponent === "enquiry" && <EnquiryForm />}
          {activeComponent === "login" && <Login />}
        </div>
      </div>
    </section>
  );
};

export default Hero;
