import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import { DateField } from "@/app/sections/form/ui/DateField";

const StudentDetails = () => {
  useFormContext();

  return (
    <div className="grid gap-y-4">
      <h2 className="text-xl my-4">Student&apos;s Details</h2>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
        <InputField name="name" placeholder="Enter Full Name" label="Name:" />
        {/* <div className="border border-l h-full "></div> */}
        <RadioField
          label="Gender"
          name="gender"
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
        <DateField
          name="dateOfBirth"
          placeholder="Date of Birth"
          label="Date Of Birth:"
        />
        <InputField name="age" placeholder="Age" label="Age:" />
      </div>
      <div className="grid grid-cols-1 gap-y-4 md:flex md:gap-x-5">
        <RadioField
          name="castCategory"
          label="Cast Category"
          options={[
            { value: "General", label: "General" },
            { value: "OBC", label: "OBC" },
            { value: "SC", label: "SC" },
            { value: "ST", label: "ST" },
            { value: "EWS", label: "EWS" },
          ]}
        />
        <div className="border border-l hidden md:block"></div>
        <RadioField
          name="specaillyAbled"
          label="Specially Abled:"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />
      </div>
      <hr className="mt-5 mb-2" />
    </div>
  );
};

export default StudentDetails;
