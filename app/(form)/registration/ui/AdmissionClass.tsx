import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import { useFormOptions } from "@/app/utils/customHooks/useFormOptions";

function AdmissionClass() {
  const { classOptions, sessionOptions, error,schoolOptions } = useFormOptions();
  useFormContext();
  const schoolingModeOptions = [
    { key: "Day School", label: "Day School", value: "Day School" },
    {
      key: "Day Boarding School",
      label: "Day Boarding School",
      value: "Day Boarding School",
    },
  ];
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <SelectField
          label="Admission for Class:"
          name="admissionClass"
          placeholder="Select Admission Class"
          options={classOptions}
        />
        <SelectField
          label="Mode of Schooling:"
          name="schoolingMode"
          placeholder="Select Schooling Mode"
          options={schoolingModeOptions}
        />
        <SelectField
          label="Select The Admission Session You Would Like To Apply For:"
          name="admissionSession"
          placeholder="Select Admission Session"
          options={sessionOptions}
        />
        <SelectField 
        label="School"
        name="admissionSchool"
        placeholder="Select School"
        options={schoolOptions}
        />
      </div>
      <hr className="my-4" />
    </div>
  );
}

export default AdmissionClass;
