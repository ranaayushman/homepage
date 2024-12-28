import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectField } from "@/app/sections/form/ui/SelectField";

function AdmissionClass() {
  useFormContext();

  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <SelectField
          label="Admission for Class:"
          name="admissionClass"
          placeholder="Select Admission Class"
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
          name="schoolingMode"
          placeholder="Select Schooling Mode"
          options={[
            { label: "Online", value: "online" },
            { label: "Offline", value: "offline" },
          ]}
        />
        <SelectField
          label="Select The Admission Session You Would Like To Apply For:"
          name="admissionSession"
          placeholder="Select Admission Session"
          options={[
            { label: "2023-2024", value: "2023-2024" },
            { label: "2024-2025", value: "2024-2025" },
          ]}
        />
      </div>
      <hr className="my-4" />
    </div>
  );
}

export default AdmissionClass;
