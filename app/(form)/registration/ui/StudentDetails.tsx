import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import { DateField } from "@/app/sections/form/ui/DateField";

const StudentDetails = () => {
  const { watch, setValue } = useFormContext();

  // Watch for changes in the date of birth field
  const dateOfBirth = watch("dateOfBirth");

  // Calculate age whenever date of birth changes
  useEffect(() => {
    if (dateOfBirth) {
      const calculateAge = (dob) => {
        // Ensure we're working with a Date object
        const birthDate = dob instanceof Date ? dob : new Date(dob);
        const today = new Date();
        
        // Check if the birth date is in the future
        if (birthDate > today) {
          return 0; // Return 0 for future dates
        }
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Adjust age if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        return age;
      };
      
      try {
        const age = calculateAge(dateOfBirth);
        
        // Only update if the age is valid
        if (!isNaN(age)) {
          setValue("age", age.toString());
        }
      } catch (error) {
        console.error("Error calculating age:", error);
      }
    }
  }, [dateOfBirth, setValue]);

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
        <InputField 
          name="age" 
          placeholder="Age" 
          label="Age:" 
          readOnly={true} 
        />
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