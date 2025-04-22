"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
import { handleSubmitStudentApplication } from "@/app/utils/handlers/continueHandler";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Additional = ({
  userId,
  applicationId,
}: {
  userId: string;
  applicationId: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (applicationId) {
      fetchApplicationData();
    } else {
      setIsLoading(false);
    }
  }, [applicationId]);

  const fetchApplicationData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/get-student-application/${applicationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      if (response.data && response.data.data) {
        const appData = response.data.data;

        // Get current form values to preserve defaults for missing fields
        const currentValues = methods.getValues();

        // Safely parse the date to ensure it's valid
        let dateOfBirth;
        try {
          if (appData.dob) {
            const parsedDate = new Date(appData.dob);
            // Check if the date is valid
            if (!isNaN(parsedDate.getTime())) {
              dateOfBirth = parsedDate;
            } else {
              // Fallback to current date if invalid
              dateOfBirth = new Date();
              console.warn(
                "Invalid date from API, using current date as fallback"
              );
            }
          } else {
            // No date provided, use current date
            dateOfBirth = new Date();
          }
        } catch (error) {
          console.error("Error parsing date:", error);
          dateOfBirth = new Date();
        }

        // Prepare the form data with existing application data
        const formData: Partial<AdditionalFormData> = {
          class: {
            className: appData.classId || currentValues.class?.className || "",
            modeOfSchooling:
              appData.modeOfSchooling ||
              currentValues.class?.modeOfSchooling ||
              "",
            admissionSession:
              appData.selectAdmissionSession ||
              currentValues.class?.admissionSession ||
              "",
          },
          studentDetails: {
            ...currentValues.studentDetails,
            fullName: appData.name || "",
            gender: appData.gender || "Male",
            dateOfBirth: dateOfBirth,
            age: appData.age?.toString() || "",
          },
          previousSchool: {
            ...currentValues.previousSchool,
            lastSchoolAffiliated: appData.lastSchoolAffiliatedBoard || "CBSE",
            lastClassAttended: appData.lastClassAttended || "",
            lastSchool: appData.lastSchoolAttended || "",
          },
          // Keep existing values for sections without API data
          studentOtherInfo: currentValues.studentOtherInfo,
          parentsInfo: currentValues.parentsInfo,
          communicationDetails: currentValues.communicationDetails,
          economicProfile: currentValues.economicProfile,
          documents: currentValues.documents,
        };

        // Reset form with fetched data
        methods.reset(formData as any);

        toast({
          description: "Existing application data loaded",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error fetching application data:", error);
      toast({
        description: "Failed to load existing application data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // // Usage within a useEffect
  // useEffect(() => {
  //   if (applicationId) {
  //     fetchApplicationData();
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [applicationId]);

  const onSubmitFinal = async (data: AdditionalFormData) => {
    try {
      // Trigger validation for all fields first
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

      // Pass applicationId along with data and userId
      const result = await handleSubmitStudentApplication(
        data,
        userId,
        applicationId
      );

      toast({
        description: result?.success
          ? result.message || "Application submitted successfully!"
          : result?.message || "Failed to submit application",
        variant: result?.success ? "default" : "destructive",
      });
    } catch (error: any) {
      console.error("Unexpected error in onSubmitFinal:", error);
      toast({
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        Loading application data...
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          console.log("Form submit event triggered");
          e.preventDefault(); // Prevent default form submission
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
