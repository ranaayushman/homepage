import CheckboxField from "@/app/sections/form/ui/CheckBoxField";
import InputField from "@/app/sections/form/ui/InputField";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Check } from "lucide-react";
import React from "react";

const ParentsOrGuardian = () => {
  return (
    <div className="grid gap-y-4">
      <h2 className="text-md font-medium mb-[10px]">
        Parents/Guardian Information
      </h2>
      <div className="w-1/2 grid grid-cols-1 gap-4">
        <InputField
          name="guardianName"
          placeholder="Parents/Guardian Name"
          label="Parents/Guardian Name:"
        />
        <InputField
          name="guardianResidentialAddress"
          placeholder="Father/Guardian’s Residential Address"
          label="Father/Guardian’s Residential Address:"
        />
        <InputField
          name="guardianOccupation"
          placeholder="Father/Guardian’s Occupation"
          label="Father/Guardian’s Occupation:"
        />
        <InputField
          name="motherName"
          placeholder="Mother’s Name"
          label="Mother’s Name:"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-end">
        <InputField
          name="motherResidentialName"
          placeholder="Enter Mother’s Residential Address"
          label="Mother’s Residential Address:"
        />
        <CheckboxField name="sameAddress" label="Same Address" />
        <InputField
          name="motherResidentialAddress"
          placeholder="Enter Mother’s Residential Address"
          label="Mother’s Residential Address:"
        />
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default ParentsOrGuardian;
