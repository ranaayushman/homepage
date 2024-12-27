import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export type FormStep = "basic" | "payment" | "additional";

interface FormNavbarProps {
  currentStep: FormStep;
}

const FormNavbar: React.FC<FormNavbarProps> = ({ currentStep }) => {
  const getProgress = () => {
    const stepOrder = { basic: 1, payment: 2, additional: 3 };
    const maxStep = 3;
    return (stepOrder[currentStep] / maxStep) * 100;
  };

  // Helper function to determine if a step is active
  const isActiveStep = (step: FormStep) => currentStep === step;

  return (
    <div className="w-full bg-white py-6 shadow-sm">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-4">
        <h2 className="font-semibold text-lg">Form- 2468</h2>
        <h2 className="font-semibold text-lg text-center">
          Kalyani Public School, Barasat Registration Form
        </h2>
        <div className="w-24" />
      </div>

      <div className="mx-auto mt-4 flex justify-evenly items-center">
        {/* Basic Details */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
            <Image
              alt="Basic Details"
              height={50}
              width={50}
              src="/svg/step1.svg"
              className="transition-opacity duration-300"
            />
          </div>
          <span
            className={`text-sm font-medium ${
              isActiveStep("basic") ? "text-[#789336]" : "text-gray-500"
            }`}
          >
            Basic Details
          </span>
        </div>

        {/* Payment */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
            <Image
              alt="Payment"
              height={50}
              width={50}
              src="/svg/step2.svg"
              className="transition-opacity duration-300"
            />
          </div>
          <span
            className={`text-sm font-medium ${
              isActiveStep("payment") ? "text-[#789336]" : "text-gray-500"
            }`}
          >
            Payment
          </span>
        </div>

        {/* Additional Details */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
            <Image
              alt="Additional Details"
              height={50}
              width={50}
              src="/svg/step3.svg"
              className="transition-opacity duration-300"
            />
          </div>
          <span
            className={`text-sm font-medium ${
              isActiveStep("additional") ? "text-[#789336]" : "text-gray-500"
            }`}
          >
            Additional Details
          </span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mt-2">
        <Progress value={getProgress()} className="h-1 bg-gray-200" />
      </div>
    </div>
  );
};

export default FormNavbar;
