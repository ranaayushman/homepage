// Form.tsx
"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/app/lib/validations/registerSchema";
import { paymentFormSchema } from "@/app/lib/validations/paymentSchema";
import { additionalSchema } from "@/app/lib/validations/additionalSchema";
import FormNavbar from "./ui/FormNavbar";
import Register from "./Register";
import Payment from "./ui/Payment";
import Additional from "./ui/Addittional";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FormProps {
  userId: string;
  applicationId?: string; // Optional applicationId for continue application flow
}

const Form = ({ userId, applicationId }: FormProps) => {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(applicationId ? true : false);
  const [error, setError] = React.useState<string | null>(null);

  const userID = userId;

  // Separate form methods for each step
  const registerMethods = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  const paymentMethods = useForm({
    resolver: zodResolver(paymentFormSchema),
    mode: "onChange",
  });

  const additionalMethods = useForm({
    resolver: zodResolver(additionalSchema),
    mode: "onChange",
  });

  // Fetch application data if applicationId is provided
  useEffect(() => {
    if (!applicationId) return;

    const fetchApplicationData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/get-application/${applicationId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );

        const appData = response.data.data;
        
        if (appData) {
          // Populate Register form
          registerMethods.reset({
            name: appData.name || "",
            gender: appData.gender || "",
            dob: appData.dob ? new Date(appData.dob) : undefined,
            modeOfSchooling: appData.modeOfSchooling || "",
            // Add other fields from registerFormSchema
          });

          // Populate Payment form (if you have payment data in your application)
          if (appData.paymentDetails) {
            paymentMethods.reset({
              // Map payment fields here
            });
          }

          // Populate Additional form
          additionalMethods.reset({
            lastSchoolAttended: appData.lastSchoolAttended || "",
            lastClassAttended: appData.lastClassAttended || "",
            lastSchoolAffiliatedBoard: appData.lastSchoolAffiliatedBoard || "",
            // Add other fields from additionalSchema
          });

          // Determine which step to show based on form completion
          if (appData.formStatus === "Pending") {
            // Logic to determine which step to start at based on what's already filled
            // This is just an example - adjust based on your specific completion indicators
            if (appData.lastSchoolAttended) {
              setStep(3); // Additional info filled - start at final step
            } else if (appData.paymentDetails) {
              setStep(2); // Payment done - start at additional info
            } else {
              setStep(1); // Start at beginning
            }
          }
        }
      } catch (e) {
        console.error("Error fetching application:", e);
        setError("Failed to load application details");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [applicationId, registerMethods, paymentMethods, additionalMethods]);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));

  // Pass applicationId to child components
  const childProps = {
    onNext: handleNext,
    applicationId: applicationId,
  };

  if (loading) {
    return <div className="bg-white p-10 rounded-md flex justify-center">Loading application data...</div>;
  }

  if (error) {
    return <div className="bg-white p-10 rounded-md text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-10 rounded-md">
      <FormNavbar
        currentStep={
          step === 1 ? "basic" : step === 2 ? "payment" : "additional"
        }
        progress={(step / 3) * 100}
      />

      {step === 1 && (
        <FormProvider {...registerMethods}>
          <Register {...childProps} />
        </FormProvider>
      )}

      {step === 2 && (
        <FormProvider {...paymentMethods}>
          <Payment {...childProps} />
        </FormProvider>
      )}

      {step === 3 && (
        <FormProvider {...additionalMethods}>
          <Additional userId={userID} applicationId={applicationId || ''} />
        </FormProvider>
      )}
    </div>
  );
};

export default Form;