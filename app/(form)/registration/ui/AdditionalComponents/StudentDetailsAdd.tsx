import { DateField } from "@/app/sections/form/ui/DateField";
import { FileUploadField } from "@/app/sections/form/ui/FileUploadField";
import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import React from "react";

const StudentDetailsAdd = () => {
  return (
    <div className="grid gap-y-4">
      <h2 className="mb-5">Student&apos;s Details</h2>
      <div className="w-1/2 grid gap-y-4">
        <InputField name="name" placeholder="Enter Full Name" label="Name:" />
        <FileUploadField name="profilePic" placeholder="Profile Picture" />
        <RadioField
          name="studentGender"
          label={"Gender"}
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />
      </div>
      <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <DateField
          name="dateOfBirth"
          label="Date Of Birth:"
          placeholder="DOB"
        />
        <InputField name="age" placeholder="Age" label="Age:" />
      </div>
      <div className="flex gap-x-4">
        <RadioField
          name="isSingleChild"
          label="Only Child"
          options={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
        />
        <div className="border-black border-l h-full "></div>
        <RadioField
          name="castCategory"
          label="Cast Category"
          options={[
            { value: "SC", label: "SC" },
            { value: "ST", label: "ST" },
            { value: "OBC", label: "OBC" },
            { value: "GEN", label: "GEN" },
          ]}
        />
        <div className="border-black border-l h-full "></div>
        <RadioField
          name="speciallyAbled"
          label="Specially Abled"
          options={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
        />
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default StudentDetailsAdd;
