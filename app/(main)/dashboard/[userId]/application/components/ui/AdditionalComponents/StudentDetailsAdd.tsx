"use client";

import { DateField } from "@/app/sections/form/ui/DateField";
import { FileUploadField } from "@/app/sections/form/ui/FileUploadField";
import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const StudentDetailsAdd = () => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  // Watch the date of birth field
  const dateOfBirth = watch("studentDetails.dateOfBirth");

  // Calculate age whenever date of birth changes
  useEffect(() => {
    if (dateOfBirth) {
      const calculateAge = (dob) => {
        // Make sure we're working with a Date object
        const birthDate = dob instanceof Date ? dob : new Date(dob);
        const today = new Date();

        // Check if the birth date is in the future
        if (birthDate > today) {
          console.log("Birth date is in the future");
          return 0; // Return 0 for future dates
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust age if birthday hasn't occurred yet this year
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return age;
      };

      try {
        // Log the date for debugging
        console.log("Date of birth:", dateOfBirth);

        const age = calculateAge(dateOfBirth);
        console.log("Calculated age:", age);

        // Only update if the age is valid
        if (!isNaN(age)) {
          setValue("studentDetails.age", age.toString());
        }
      } catch (error) {
        console.error("Error calculating age:", error);
      }
    }
  }, [dateOfBirth, setValue]);

  return (
    <div className="grid gap-y-4">
      <h2 className="mb-5">Student&apos;s Details</h2>
      <div className="w-1/2 grid gap-y-4">
        <InputField
          name="studentDetails.fullName"
          placeholder="Enter Full Name"
          label="Name:"
        />
        <FileUploadField
          name="studentDetails.profilePic"
          placeholder="Profile Picture"
        />
        <RadioField
          name="studentDetails.gender"
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
          name="studentDetails.dateOfBirth"
          label="Date Of Birth:"
          placeholder="DOB"
        />
        <InputField
          name="studentDetails.age"
          placeholder="Age"
          label="Age:"
          readOnly={true}
        />
      </div>
      <div className="flex gap-x-4">
        <RadioField
          name="studentDetails.isSingleChild"
          label="Only Child"
          options={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
        />
        <div className="border-black border-l h-full "></div>

        <RadioField
          name="studentDetails.isOnlyGirlChild"
          label="Only Girl Child"
          options={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
        />
        <div className="border-black border-l h-full "></div>
        <RadioField
          name="studentDetails.castCategory"
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
          name="studentDetails.speciallyAbled"
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
