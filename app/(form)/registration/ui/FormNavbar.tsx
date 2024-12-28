import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export type FormStep = "basic" | "payment" | "additional";

interface FormNavbarProps {
  currentStep: FormStep;
  progress: number;
}

const FormNavbar: React.FC<FormNavbarProps> = ({ currentStep, progress }) => {
  // Step configuration for better maintainability
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

  // Helper function to determine if a step should be marked as completed
  const isStepCompleted = (step: FormStep) => {
    const stepOrder = { basic: 1, payment: 2, additional: 3 };
    return stepOrder[currentStep] > stepOrder[step];
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
                    className="w-6 h-6 text-[#789336]"
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
              className={`text-sm font-medium ${
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
