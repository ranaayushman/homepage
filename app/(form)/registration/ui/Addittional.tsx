"use client";
// import { SelectField } from "@/app/sections/form/ui/SelectField";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormContext } from "react-hook-form";
import ClassOpt from "./AdditionalComponents/ClassOpt";
import StudentDetailsAdd from "./AdditionalComponents/StudentDetailsAdd";
import PreviousSchool from "./AdditionalComponents/PreviousSchoolAdd";
import StudentOtherInformation from "./AdditionalComponents/StudentOtherInformation";
import ParentsOrGuardian from "./AdditionalComponents/ParentsOrGuardian";
import CommunicationDetail from "./AdditionalComponents/CommunicationDetail";
import EconomicProfile from "./AdditionalComponents/EconomicProfile";
import DocumentsPart from "./AdditionalComponents/DocumentsPart";

// interface AdditionalProps {
//   onNext: () => void;
// }
const Additional = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  const onSubmitFinal = (data: any) => {
    console.log("Final data:", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitFinal)} className="space-y-4 ">
      <div>
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
