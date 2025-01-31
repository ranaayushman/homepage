"use client";
// import { SelectField } from "@/app/sections/form/ui/SelectField";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
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

// interface AdditionalProps {
//   onNext: () => void;
// }
const Additional = () => {
  const methods = useForm<AdditionalFormData>({
    resolver: zodResolver(additionalSchema),
  });
  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmitFinal = (data: AdditionalFormData) => {
    console.log("Validated data:", data);
  };
  return (
    <form onSubmit={methods.handleSubmit(onSubmitFinal)} className="space-y-4 ">
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
        <Button type="submit" className="" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Complete Registration"}
        </Button>
      </div>
    </form>
  );
};

export default Additional;
