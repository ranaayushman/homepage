"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import ClassOpt from "./AdditionalComponents/ClassOpt";
import StudentDetailsAdd from "./AdditionalComponents/StudentDetailsAdd";
import PreviousSchool from "./AdditionalComponents/PreviousSchoolAdd";
import StudentOtherInformation from "./AdditionalComponents/StudentOtherInformation";
import ParentsOrGuardian from "./AdditionalComponents/ParentsOrGuardian";
import CommunicationDetail from "./AdditionalComponents/CommunicationDetail";
import EconomicProfile from "./AdditionalComponents/EconomicProfile";
import DocumentsPart from "./AdditionalComponents/DocumentsPart";
import {
  AdditionalFormData,
  additionalSchema,
} from "@/app/lib/validations/additionalSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const Additional = ({ userId }: { userId: string }) => {
  const methods = useForm<AdditionalFormData>({
    resolver: zodResolver(additionalSchema),
    defaultValues: {
      // Add your default values here matching your schema
      // For example:
      // className: "",
      // section: "",
      // studentDetails: {
      //   firstName: "",
      //   lastName: "",
      //   // ... other fields
      // },
    },
    mode: "onBlur", // Validate on blur
  });
  console.log(userId)

  const onSubmitFinal = async (data: AdditionalFormData) => {
    try {
      console.log("Form submitted with data:", data);
      // Add your submission logic here
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmitFinal)}
        className="space-y-4"
      >
        <div className="p-10">
          <ClassOpt />
          <StudentDetailsAdd />
          <PreviousSchool />
          <StudentOtherInformation />
          <ParentsOrGuardian />
          <CommunicationDetail />
          <EconomicProfile />
          <DocumentsPart />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="bg-[#789336]"
          >
            {methods.formState.isSubmitting
              ? "Submitting..."
              : "Complete Registration"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Additional;
