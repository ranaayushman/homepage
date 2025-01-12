import { SelectField } from "@/app/sections/form/ui/SelectField";
import React from "react";

const StudentOtherInformation = () => {
  return (
    <div>
      <h2>Student&apos;s Additional Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField
          name="height"
          label="Height:"
          placeholder="Height"
          options={[{ label: "Height", value: "height" }]}
        />
        <SelectField
          name="weight"
          label="Weight :"
          placeholder="Weight"
          options={[{ label: "Weight", value: "weight" }]}
        />
        <SelectField
          name="bloodGroup"
          label="Blood Group:"
          placeholder="Blood Group"
          options={[{ label: "bloodGroup", value: "bloodGroup" }]}
        />
        <SelectField
          name="motherTongue"
          label="Mother Tongue:"
          placeholder="Mother Tongue"
          options={[{ label: "Hindi", value: "hindi" }]}
        />
        <SelectField
          name="religion"
          label="Religion:"
          placeholder="Religion"
          options={[{ label: "Hindu", value: "hindu" }]}
        />
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default StudentOtherInformation;
