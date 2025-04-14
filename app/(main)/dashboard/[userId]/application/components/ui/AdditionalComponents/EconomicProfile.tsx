import InputField from "@/app/sections/form/ui/InputField";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import React from "react";
import { useFormContext } from "react-hook-form";

const EconomicProfile = () => {
  const { control } = useFormContext();

  return (
    <div className="grid gap-y-4">
      <h2>Economic Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputField
          name="economicProfile.relationWithGuardian"
          placeholder="Relation"
          label="Relation With Guardian:"
        />
        <InputField
          name="economicProfile.yearlyIncome"
          placeholder="Income in Rupees"
          label="Yearly Income:"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputField
          name="economicProfile.designation"
          placeholder="Designation"
          label="Designation:"
        />
        <SelectField
          control={control}
          name="economicProfile.dependentOnGuardian"
          placeholder="Select Number"
          label="No. of Dependents on the Guardians:"
          options={[
            { label: "0", value: "0" },
            { label: "1", value: "1" },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SelectField
          control={control}
          name="economicProfile.earningMembers"
          placeholder="Select Number"
          label="No. of Earning Members in the Family:"
          options={[
            { label: "0", value: "0" },
            { label: "1", value: "1" },
          ]}
        />
      </div>
      <hr className="my-4 border-black" />
    </div>
  );
};

export default EconomicProfile;
