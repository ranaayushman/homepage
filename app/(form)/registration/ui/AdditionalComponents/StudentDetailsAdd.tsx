"use client";

import { DateField } from "@/app/sections/form/ui/DateField";
import { FileUploadField } from "@/app/sections/form/ui/FileUploadField";
import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import { SelectField } from "@/app/sections/form/ui/SelectField"; 
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const StudentDetailsAdd = () => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  // Watch the date of birth, cast category, and specially abled fields
  const dateOfBirth = watch("studentDetails.dateOfBirth");
  const castCategory = watch("studentDetails.castCategory");
  const speciallyAbled = watch("studentDetails.speciallyAbled");

  // Calculate age whenever date of birth changes
  useEffect(() => {
    if (dateOfBirth) {
      const calculateAge = (dob) => {
        const birthDate = dob instanceof Date ? dob : new Date(dob);
        const today = new Date();

        if (birthDate > today) {
          console.log("Birth date is in the future");
          return 0;
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return age;
      };

      try {
        console.log("Date of birth:", dateOfBirth);
        const age = calculateAge(dateOfBirth);
        console.log("Calculated age:", age);

        if (!isNaN(age)) {
          setValue("studentDetails.age", age.toString());
        }
      } catch (error) {
        console.error("Error calculating age:", error);
      }
    }
  }, [dateOfBirth, setValue]);

  // Clear categoryProof when castCategory is GEN
  useEffect(() => {
    if (castCategory === "GEN") {
      setValue("studentDetails.categoryProof", null);
    }
  }, [castCategory, setValue]);

  // Clear speciallyAbledType and speciallyAbledProof when speciallyAbled is No
  useEffect(() => {
    if (speciallyAbled === "false") {
      setValue("studentDetails.speciallyAbledType", "");
      setValue("studentDetails.speciallyAbledProof", null);
    }
  }, [speciallyAbled, setValue]);

  return (
    <div className="grid gap-y-4">
      <h2 className="mb-5">Student's Details</h2>
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
          label="Gender"
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
        <div className="border-black border-l h-full"></div>
        <RadioField
          name="studentDetails.isOnlyGirlChild"
          label="Only Girl Child"
          options={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
        />
        <div className="border-black border-l h-full"></div>
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
        <div className="border-black border-l h-full"></div>
        <RadioField
          name="studentDetails.speciallyAbled"
          label="Specially Abled"
          options={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
        />
      </div>
      {/* Conditionally render fields for specially abled */}
      {speciallyAbled === "true" && (
        <div className="w-1/2 grid gap-y-4">
          <SelectField
            name="studentDetails.speciallyAbledType"
            label="Type of Disability:"
            placeholder="Select Disability Type"
            options={[
              { value: "physical", label: "Physical" },
              { value: "visual", label: "Visual" },
              { value: "hearing", label: "Hearing" },
              { value: "speech", label: "Speech" },
              { value: "learning", label: "Learning" },
              { value: "other", label: "Other" },
            ]}
          />
          <FileUploadField
            name="studentDetails.speciallyAbledProof"
            placeholder="Upload Disability Proof"
            label="Disability Proof:"
          />
        </div>
      )}
      {/* Conditionally render FileUploadField for category proof */}
      {castCategory && castCategory !== "GEN" && (
        <div className="w-1/2">
          <FileUploadField
            name="studentDetails.categoryProof"
            placeholder="Upload Category Proof"
            label="Category Proof:"
          />
        </div>
      )}
      <hr className="my-5 border-black" />
    </div>
  );
};

export default StudentDetailsAdd;
