import InputField from "@/app/sections/form/ui/InputField";
import React from "react";
import { useFormContext } from "react-hook-form";

const Guardian = () => {
  useFormContext();
  return (
    <div className="grid gap-y-4">
      <h2>Parent/Guardian&apos;s Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <InputField
          name="guardianName"
          placeholder="Parent/Guardian's Name"
          label="Parent/Guardian's Name"
        />
      </div>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
        <InputField
          label="Highest Qualification:"
          name="highestQualification" 
          placeholder="Highest Qualification"
        />
        <InputField
          name="occupation"
          placeholder="Occupation"
          label="Occupation:"
        />
        <InputField
          name="yearlyIncome"
          placeholder="Enter Yearly Income"
          label="Yearly Income:"
        />
      </div>
    </div>
  );
};

export default Guardian;
