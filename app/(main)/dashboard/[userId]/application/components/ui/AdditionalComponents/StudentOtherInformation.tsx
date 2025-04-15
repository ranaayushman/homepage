import InputField from "@/app/sections/form/ui/InputField";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import React from "react";

const StudentOtherInformation = () => {
  const bloodGroupOptions = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];
  const religionOptions = [
    { label: "Hindu", value: "Hindu" },
    { label: "Muslim", value: "Muslim" },
    { label: "Christian", value: "Christian" },
    { label: "Sikh", value: "Sikh" },
    { label: "Buddhist", value: "Buddhist" },
    { label: "Jain", value: "Jain" },
    { label: "Parsi", value: "Parsi" },
    { label: "Jewish", value: "Jewish" },
    { label: "Other", value: "Other" },
    { label: "Prefer not to say", value: "Prefer not to say" },
  ];
  const motherTongueOptions = [
    { label: "Hindi", value: "Hindi" },
    { label: "Bengali", value: "Bengali" },
    { label: "Marathi", value: "Marathi" },
    { label: "Telugu", value: "Telugu" },
    { label: "Tamil", value: "Tamil" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "Malayalam", value: "Malayalam" },
    { label: "Kannada", value: "Kannada" },
    { label: "Urdu", value: "Urdu" },
  ];
  return (
    <div>
      <h2>Student&apos;s Additional Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          name="studentOtherInfo.height"
          label="Height:"
          placeholder="Height"
          // options={[{ label: "Height", value: "height" }]}
        />
        <InputField
          name="studentOtherInfo.weight"
          label="Weight :"
          placeholder="Weight"
          // options={[{ label: "Weight", value: "weight" }]}
        />
        <SelectField
          name="studentOtherInfo.bloodGroup"
          label="Blood Group:"
          placeholder="Blood Group"
          options={bloodGroupOptions}
        />
        <SelectField
          name="studentOtherInfo.motherTongue"
          label="Mother Tongue:"
          placeholder="Mother Tongue"
          options={motherTongueOptions}
        />
        <SelectField
          name="studentOtherInfo.religion"
          label="Religion:"
          placeholder="Religion"
          options={religionOptions}
        />
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default StudentOtherInformation;
