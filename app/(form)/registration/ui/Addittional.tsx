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
import Cookies from "js-cookie";

const Additional = ({ userId }: { userId: string }) => {
  const methods = useForm<AdditionalFormData>({
    resolver: zodResolver(additionalSchema),
    defaultValues: {
      studentDetails: {
        gender: "Male",
        isSingleChild: "false",
        isOnlyGirlChild: "false",
        castCategory: "GEN",
        speciallyAbled: "false",
      },
      previousSchool: {
        lastSchoolAffiliated: "CBSE",
        secondLanguage: "Bengali",
        lastClassAttended: "",
        lastSchool: "",
      },
    },
    mode: "onBlur",
  });

  const onSubmitFinal = async (data: AdditionalFormData) => {
    console.log("onSubmitFinal called with data:", data);
    console.log(methods.formState.errors);
    try {
      const isValid = await methods.trigger();

      if (!isValid) {
        const errors = methods.formState.errors;
        console.log("Form errors:", errors);
        toast({
          description: "Please fix all errors before submitting",
          variant: "destructive",
        });
        return;
      }

      console.log("No validation errors, proceeding to handler");
      const result = await handleSubmitStudentApplication(data, userId);
      console.log("Handler result:", result);

      if (result.success) {
        // ✅ Clear all cookies except authToken
        Object.keys(Cookies.get()).forEach((cookieName) => {
          if (cookieName !== "authToken") {
            Cookies.remove(cookieName);
          }
        });
      }

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
          e.preventDefault(); 
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
