// Form.tsx
"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/app/lib/validations/registerSchema";
import { paymentFormSchema } from "@/app/lib/validations/paymentSchema";
import { additionalFormSchema } from "@/app/lib/validations/additionalSchema";
import FormNavbar from "./ui/FormNavbar";
import Register from "./Register";
import Payment from "./ui/Payment";
import Additional from "./ui/Addittional";

const Form = () => {
  const [step, setStep] = React.useState(1);

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
    resolver: zodResolver(additionalFormSchema),
    mode: "onChange",
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));

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
          <Register onNext={handleNext} />
        </FormProvider>
      )}

      {step === 2 && (
        <FormProvider {...paymentMethods}>
          <Payment onNext={handleNext} />
        </FormProvider>
      )}

      {step === 3 && (
        <FormProvider {...additionalMethods}>
          <Additional />
        </FormProvider>
      )}
    </div>
  );
};

export default Form;
