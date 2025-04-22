"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Cookies from "js-cookie";
export type FormStep = "basic" | "payment" | "additional";

interface FormNavbarProps {
  currentStep: FormStep;
  progress: number;
}

const FormNavbar: React.FC<FormNavbarProps> = ({ currentStep, progress }) => {
  const [tempNo, setTempNo] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedForm = localStorage.getItem("registerFormData"); // change key if different
      if (storedForm) {
        try {
          const parsed = JSON.parse(storedForm);
          if (parsed.tempNo) {
            setTempNo(parsed.tempNo);
          }
        } catch (error) {
          console.error("Error parsing formData from localStorage:", error);
        }
      }
    }
  }, []);

  const STEPS: Record<FormStep, { title: string; icon: string }> = {
    basic: { title: "Basic Details", icon: "/svg/step1.svg" },
    payment: { title: "Payment", icon: "/svg/step2.svg" },
    additional: { title: "Additional Details", icon: "/svg/step3.svg" },
  };

  const getStepProgress = () => {
    const stepOrder = { basic: 1, payment: 2, additional: 3 };
    const maxStep = 3;
    const stepProgress = (stepOrder[currentStep] / maxStep) * 100;
    return Math.max(stepProgress, progress);
  };

  const isStepCompleted = (step: FormStep) => {
    const stepOrder = { basic: 1, payment: 2, additional: 3 };
    return stepOrder[currentStep] > stepOrder[step];
  };

  const isActiveStep = (step: FormStep) => currentStep === step;
  const school = Cookies.get("schoolName");

  return (
    <div className="w-full bg-white py-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto gap-y-5 sm:gap-y-0  px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-y-2 sm:gap-y-0 sm:w-2/3">
          {/* Conditionally render tempNo */}
          {tempNo && (
            <h2 className="font-semibold text-sm md:text-lg text-center sm:text-left">
              Form - {tempNo}
            </h2>
          )}
          <h2 className="font-semibold text-sm md:text-lg text-center sm:text-left">
            {school}, Registration Form
          </h2>
        </div>
        <div className="w-24 sm:w-auto" />
      </div>

      <div className="mx-auto mt-4 flex justify-evenly items-center">
        {(
          Object.entries(STEPS) as [FormStep, { title: string; icon: string }][]
        ).map(([step, { title, icon }]) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
              <Image
                alt={title}
                height={50}
                width={50}
                src={icon}
                className={`transition-opacity duration-300 ${
                  isStepCompleted(step) ? "opacity-50" : "opacity-100"
                }`}
              />
              {isStepCompleted(step) && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#789336] bg-opacity-20 rounded-full">
                  <svg
                    className="w-6 h-6 text-[#789336] text-xs sm:text-sm"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            <span
              className={`text-xs sm:text-sm font-medium ${
                isActiveStep(step)
                  ? "text-[#789336]"
                  : isStepCompleted(step)
                  ? "text-[#789336]"
                  : "text-gray-500"
              }`}
            >
              {title}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mt-2">
        <Progress value={getStepProgress()} className="h-1 bg-gray-200" />
      </div>
    </div>
  );
};

export default FormNavbar;
