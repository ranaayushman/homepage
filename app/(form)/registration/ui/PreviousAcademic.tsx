import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import React from "react";
import { useFormContext } from "react-hook-form";

const PreviousAcademic = () => {
  useFormContext();
  return (
    <div>
      <h2 className="text-xl my-5">Previous Academic Information</h2>
      <div className="my-5">
        <RadioField
          label="Last School affiliated is:"
          name="lastSchoolAffiliated"
          options={[
            { value: "CBSE", label: "CBSE" },
            { value: "ICSE", label: "ICSE" },
            { value: "State Board", label: "State Board" },
            { value: "Other", label: "Other (please specify)" },
          ]}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        <SelectField
          label="Last Class Attended:"
          name="lastClassAttended"
          placeholder="Last Class Attended"
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
        <div className="col-span-2">
          <InputField
            name="lastSchoolName"
            label="Last School Attended:"
            placeholder="Last School Name"
          />
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default PreviousAcademic;
