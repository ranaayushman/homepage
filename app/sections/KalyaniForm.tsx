"use client";
import React, { useState } from "react";
import EnquiryForm from "./form/Enquiy";
import Login from "./form/Login";
import { Button } from "@/components/ui/button";

const KalyaniForm = () => {
  const [activeComponent, setActiveComponent] = useState<"enquiry" | "login">(
    "enquiry"
  );

  return (
    <div>
      <div className="w-full flex flex-col items-center mt-10 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-[#292B5F] mb-4">
            {activeComponent === "enquiry" ? "Enquiry" : "Login"}
          </h2>

          {/* Form Container */}
          {activeComponent === "enquiry" && <EnquiryForm />}
          {activeComponent === "login" && <Login />}
        </div>
        {/* Divider with Lines */}
        <div className="flex items-center w-full max-w-md my-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-3 text-gray-400">or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        {/* Toggle Button */}
        <Button
          className="w-1/2 py-2 text-black border border-[#2E2A5A] rounded-md bg-white hover:bg-[#353478] hover:text-white transition"
          onClick={() =>
            setActiveComponent(
              activeComponent === "enquiry" ? "login" : "enquiry"
            )
          }
        >
          {activeComponent === "enquiry" ? "Login" : "Register"}
        </Button>
      </div>
    </div>
  );
};

export default KalyaniForm;
