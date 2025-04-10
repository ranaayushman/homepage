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
import { handleSubmitStudentApplication } from "@/app/utils/handlers/handlers";
import { toast } from "@/hooks/use-toast";

const Additional = ({ userId }: { userId: string }) => {
  const methods = useForm<AdditionalFormData>({
    resolver: zodResolver(additionalSchema),
    defaultValues: {
      class: {
        className: "",
        admissionSession: "",
        modeOfSchooling: "offline", 
      },
      studentDetails: {
        fullName: "",
        dateOfBirth: "",
        gender: "male", 
        isSingleChild: "false", // Default to match enum
        castCategory: "GEN", // Default to match enum
        speciallyAbled: "false", // Default to match enum
        profilePic: undefined,
        age: "",
        category: "",
      },
      previousSchool: {
        lastSchoolAffiliated: "CBSE", // Default to match enum
        lastClassAttended: "",
        lastSchool: "",
        secondLanguage: "Hindi", // Default to match enum
      },
      studentOtherInfo: {
        height: "",
        weight: "",
        motherTongue: "",
        religion: "",
        bloodGroup: "",
      },
      parentsInfo: {
        guardianName: "",
        guardianResidentialAddress: "",
        guardianOccupation: "",
        motherName: "",
        motherResidentialAddress: "",
        motherOccupation: "",
      },
      communicationDetails: {
        phoneNumber1: "",
        phoneNumber2: "",
        phoneNumber3: "",
        email: "",
        permanentAddress: "",
        localAddress: "",
      },
      economicProfile: {
        relationWithGuardian: "",
        yearlyIncome: "",
        designation: "",
        dependentOnGuardian: "",
        earningMembers: "",
      },
      documents: {
        birthCertificate: undefined,
        transferCertificate: undefined,
        migrationCertificate: undefined,
        markSheet: undefined,
        aadhaarCard: undefined,
        residentialProof: undefined,
      },
    },
    mode: "onBlur",
  });

  const onSubmitFinal = async (data: AdditionalFormData) => {
    console.log("onSubmitFinal called with data:", data);
    try {
      const errors = methods.formState.errors;
      console.log("Form errors:", errors);
      if (Object.keys(errors).length > 0) {
        console.log("Validation errors preventing submission:", errors);
        toast({
          description: "Please fix form errors",
          variant: "destructive",
        });
        return;
      }

      console.log("No validation errors, proceeding to handler");
      const result = await handleSubmitStudentApplication(data);
      console.log("Handler result:", result);

      toast({
        description: result.success
          ? result.message || "Application submitted successfully!"
          : result.error || "Failed to submit application",
        variant: result.success ? "default" : "destructive",
      });
    } catch (error: any) {
      console.error("Unexpected error in onSubmitFinal:", error);
      toast({
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          console.log("Form submit event triggered");
          methods.handleSubmit(onSubmitFinal)(e);
        }}
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
