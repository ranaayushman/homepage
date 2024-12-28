import InputField from "@/app/sections/form/ui/InputField";
import React from "react";
import { useFormContext } from "react-hook-form";

const Guardian = () => {
  const { register } = useFormContext();
  return (
    <div className="grid gap-y-4">
      <h2>Parent/Guardian's Details</h2>
      <div className="grid grid-cols-2 gap-x-4">
        <InputField name="guardianName" placeholder="Parent/Guardian's Name" label="Parent/Guardian's Name" />
      </div>
      <div className="grid grid-cols-3 gap-x-4">
        <InputField
          name="highestQualification"
          placeholder="Highest Qualification"
        />
        <InputField name="occupation" placeholder="Occupation" />
        <InputField name="yearlyIncome" placeholder="Enter Yearly Income" />
      </div>
    </div>
  );
};

export default Guardian;
