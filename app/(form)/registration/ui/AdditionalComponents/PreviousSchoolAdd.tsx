"use client";

import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import { useFormOptions } from "@/app/utils/customHooks/useFormOptions";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const PreviousSchool = () => {
  const { classOptions } = useFormOptions();
  const { watch, setValue } = useFormContext();

  // Watch the lastSchoolAffiliated field
  const lastSchoolAffiliated = watch("previousSchool.lastSchoolAffiliated");

  // Clear otherAffiliation when lastSchoolAffiliated is not Other
  useEffect(() => {
    if (lastSchoolAffiliated !== "Other") {
      setValue("previousSchool.otherAffiliation", "");
    }
  }, [lastSchoolAffiliated, setValue]);

  return (
    <div className="grid gap-y-6">
      <h2>Previous Academic Information</h2>
      <div className="flex gap-x-4">
        <RadioField
          name="previousSchool.lastSchoolAffiliated"
          label="Last School affiliated is:"
          options={[
            { value: "CBSE", label: "CBSE" },
            { value: "ICSE", label: "ICSE" },
            { value: "State Board", label: "State Board" },
            { value: "Other", label: "Other (please specify)" },
          ]}
        />
        <div className="border-black border-l h-full"></div>
        <RadioField
          name="previousSchool.secondLanguage"
          label="Second Language"
          options={[
            { value: "Bengali", label: "Bengali" },
            { value: "Hindi", label: "Hindi" },
          ]}
        />
      </div>
      {/* Conditionally render InputField for Other affiliation */}
      {lastSchoolAffiliated === "Other" && (
        <div className="w-1/2">
          <InputField
            name="previousSchool.otherAffiliation"
            label="Specify Affiliation:"
            placeholder="Enter Affiliation Details"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
        <SelectField
          name="previousSchool.lastClassAttended"
          label="Last Class Attended:"
          placeholder="Last Class Attended"
          options={classOptions}
        />
        <div className="col-span-2">
          <InputField
            name="previousSchool.lastSchool"
            label="Last School Attended:"
            placeholder="Enter School’s Name"
          />
        </div>
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default PreviousSchool;