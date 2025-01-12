import { SelectField } from "@/app/sections/form/ui/SelectField";
import React from "react";

const ClassOpt = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <SelectField
          label="Admission for CLASS :"
          name="admissionClass"
          placeholder="Select Class"
          options={[]}
        />
        <SelectField
          label="Mode of Schooling:"
          name="modeOfSchooling"
          placeholder="Select Schooling"
          options={[]}
        />
        <SelectField
          label="Select The Admission Session You Would Like To Apply For:"
          name="admissionSession"
          placeholder="Select Session"
          options={[]}
        />
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default ClassOpt;
