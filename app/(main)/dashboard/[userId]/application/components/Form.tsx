// Form.tsx
"use client";
import React, { useEffect, useState } from "react";
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

interface PaymentTransaction {
  studentName: string;
  className: string;
  schoolName: string;
  tempNo: string;
  permanentNo: string;
  formStatus: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
}

interface ApplicationData {
  _id: string;
  tempNo: string;
  classId: string;
  schoolId: string;
  name: string;
  formStatus: string;
  // Add other fields as needed
}

const Form = ({ userId, applicationId }: FormProps) => {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(applicationId ? true : false);
  const [error, setError] = React.useState<string | null>(null);
  const [paymentData, setPaymentData] = React.useState<PaymentTransaction[]>(
    []
  );

  // Store application data from step 1
  const [applicationData, setApplicationData] =
    useState<ApplicationData | null>(null);

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
        setLoading(true);

        const applicationResponse = await axios.get(
          `${API_URL}/get-student-application/${applicationId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );

        const appData = applicationResponse.data.data;

        if (appData) {
          setApplicationData({
            _id: appData._id,
            tempNo: appData.tempNo,
            classId: appData.classId,
            schoolId: appData.schoolId,
            name: appData.name,
            formStatus: appData.formStatus,
          });

          // Map API response to form data
          const registerData = {
            admissionClass: appData.classId || "",
            schoolingMode: appData.modeOfSchooling || "",
            admissionSession: appData.selectAdmissionSession || "",
            name: appData.name || "",
            gender: appData.gender || "",
            dateOfBirth: appData.dob ? new Date(appData.dob) : undefined,
            age: appData.age?.toString() || "",
            castCategory: appData.castCategory || "General",
            specaillyAbled: appData.specaillyAbled || "No",
            lastSchoolAffiliated: appData.lastSchoolAffiliatedBoard || "",
            lastClassAttended: appData.lastClassAttended || "",
            lastSchoolName: appData.lastSchoolAttended || "",
            admissionSchool: appData.schoolId || "",
          };

          registerMethods.reset(registerData);

          // Check only required fields for step 1 completion
          const requiredFields = [
            "admissionClass",
            "schoolingMode",
            "admissionSession",
            "name",
            "gender",
            "dateOfBirth",
            "admissionSchool",
          ];

          const isStep1Complete = requiredFields.every(
            (field) =>
              registerData[field] !== undefined &&
              registerData[field] !== null &&
              registerData[field] !== ""
          );

          let hasSuccessfulPayment = false;

          try {
            const paymentResponse = await axios.get(
              `${API_URL}/applications-transactions-by-student/${applicationId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("authToken")}`,
                },
                validateStatus: (status) => status < 500,
              }
            );

            if (
              paymentResponse.status === 200 &&
              paymentResponse.data.success
            ) {
              const payments = paymentResponse.data.payments || [];
              setPaymentData(payments);
              hasSuccessfulPayment = payments.some(
                (payment) => payment.paymentStatus === "success"
              );
            }
          } catch (paymentError) {
            console.log("Payment transaction check skipped");
          }

          // Now properly determine the step
          if (hasSuccessfulPayment) {
            setStep(3);
          } else if (isStep1Complete) {
            setStep(2);
          }
          // Otherwise stay at step 1 (default)
        }
      } catch (e) {
        console.error("Error fetching application:", e);
        setError("Failed to load application details");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [applicationId, registerMethods, paymentMethods]);

  // Handle completion of step 1 (Register)
  const handleRegisterComplete = (data: ApplicationData) => {
    // Store application data for payment step
    setApplicationData(data);
    handleNext();
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));

  // Pass applicationId and payment data to child components
  const childProps = {
    onNext: handleNext,
    applicationId: applicationId || applicationData?._id || "",
    paymentData: paymentData,
  };

  if (loading) {
    return (
      <div className="bg-white p-10 rounded-md flex justify-center">
        Loading application data...
      </div>
    );
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
          <Payment
            userId={userID}
            classId={applicationData?.classId || ""}
            tempNo={applicationData?.tempNo || ""}
            {...childProps}
          />
        </FormProvider>
      )}

      {step === 3 && (
        <FormProvider {...additionalMethods}>
          <Additional
            userId={userID}
            applicationId={applicationId || applicationData?._id || ""}
          />
        </FormProvider>
      )}
    </div>
  );
};

export default Form;
