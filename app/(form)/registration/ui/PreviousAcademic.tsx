import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import { useFormOptions } from "@/app/utils/customHooks/useFormOptions";
import React from "react";
import { useFormContext } from "react-hook-form";

const PreviousAcademic = () => {
  const { classOptions, error } = useFormOptions();
  const { watch } = useFormContext();

  // Watch the lastSchoolAffiliated field to check if "Other" is selected
  const lastSchoolAffiliated = watch("lastSchoolAffiliated");

  // Check if "Other" is selected
  const showOtherBoardInput = lastSchoolAffiliated === "Other";

  if (error) return <div>Error: {error}</div>;

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

        {/* Conditional input field for other board name */}
        {showOtherBoardInput && (
          <div className="mt-2 w-1/2">
            <InputField
              name="otherBoardName"
              label="Specify Board Name:"
              placeholder="Enter board name"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-x-4 ">
        <SelectField
          label="Last Class Attended:"
          name="lastClassAttended"
          placeholder="Last Class Attended"
          options={classOptions}
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
