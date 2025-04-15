import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import { useFormOptions } from "@/app/utils/customHooks/useFormOptions";

const ClassOpt = () => {
  const { control } = useFormContext();
  const { classOptions, sessionOptions } = useFormOptions();
  const schoolingModeOptions = [
    { key: "Day School", label: "Day School", value: "Day School" },
    {
      key: "Day Boarding School",
      label: "Day Boarding School",
      value: "Day Boarding School",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <SelectField
          label="Admission for CLASS :"
          name="class.className"
          placeholder="Select Class"
          control={control}
          options={classOptions}
        />
        <SelectField
          label="Mode of Schooling:"
          name="class.modeOfSchooling"
          placeholder="Select Schooling"
          control={control}
          options={schoolingModeOptions}
        />
        <SelectField
          label="Select The Admission Session:"
          name="class.admissionSession"
          placeholder="Select Session"
          control={control}
          options={sessionOptions}
        />
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default ClassOpt;
