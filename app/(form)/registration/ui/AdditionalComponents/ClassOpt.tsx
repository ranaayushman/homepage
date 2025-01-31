import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectField } from "@/app/sections/form/ui/SelectField";

const ClassOpt = () => {
  const { control } = useFormContext();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <SelectField
          label="Admission for CLASS :"
          name="admissionClass"
          placeholder="Select Class"
          control={control}
          options={[
            { label: "Greenwood High", value: "greenwood_high" },
            {
              label: "Oakridge International",
              value: "oakridge_international",
            },
            { label: "DPS Bangalore", value: "dps_bangalore" },
            { label: "National Public School", value: "nps" },
          ]}
        />
        <SelectField
          label="Mode of Schooling:"
          name="modeOfSchooling"
          placeholder="Select Schooling"
          control={control}
          options={[
            { label: "Greenwood High", value: "greenwood_high" },
            {
              label: "Oakridge International",
              value: "oakridge_international",
            },
            { label: "DPS Bangalore", value: "dps_bangalore" },
            { label: "National Public School", value: "nps" },
          ]}
        />
        <SelectField
          label="Select The Admission Session:"
          name="admissionSession"
          placeholder="Select Session"
          control={control}
          options={[
            { label: "Greenwood High", value: "greenwood_high" },
            {
              label: "Oakridge International",
              value: "oakridge_international",
            },
            { label: "DPS Bangalore", value: "dps_bangalore" },
            { label: "National Public School", value: "nps" },
          ]}
        />
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default ClassOpt;
