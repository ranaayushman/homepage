"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectField } from "@/app/sections/form/ui/SelectField";

interface AdmissionClassProps {
  onSubmit: () => void;
}

function AdmissionClass({ onSubmit }: AdmissionClassProps) {
  const methods = useFormContext();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="p-10">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
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
          name="schoolingMode"
          placeholder="Select Schooling Mode"
          options={[
            { label: "Online", value: "online" },
            { label: "Offline", value: "offline" },
          ]}
        />
        <SelectField
          name="admissionSession"
          placeholder="Select Admission Session"
          options={[
            { label: "2023-2024", value: "2023-2024" },
            { label: "2024-2025", value: "2024-2025" },
          ]}
        />
      </div>
      <hr className="my-4" />
    </form>
  );
}

export default AdmissionClass;
