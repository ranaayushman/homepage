import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import { useFormOptions } from "@/app/utils/customHooks/useFormOptions";
import React from "react";

const PreviousSchool = () => {
  const {classOptions} = useFormOptions();
  return (
    <div className="grid gap-y-6">
      <h2>Previous Academic Information</h2>
      <div className="flex gap-x-4">
        <RadioField
          name="lastSchoolAffiliated"
          label="Last School affiliated is:"
          options={[
            { value: "CBSE", label: "CBSE" },
            { value: "ICSE", label: "ICSE" },
            { value: "State Board", label: "State Board" },
            { value: "Other", label: "Other (please specify)" },
          ]}
        />
        <div className="border-black border-l h-full "></div>
        <RadioField
          name="secondLanguage"
          label="Second Language"
          options={[
            { value: "Bengali", label: "Bengali" },
            { value: "Hindi", label: "Hindi" },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
        <SelectField
          name="lastClassAttended"
          label="Last Class Attended:"
          placeholder="Last Class Attended"
          options={classOptions}
        />
        <div className="col-span-2">
          <InputField
            name="lastSchool"
            label="Last School Attended:"
            placeholder="Enter School’s Name"
          />
        </div>
      </div>
      <hr className="my-5 border-black"/>
    </div>
  );
};

export default PreviousSchool;
