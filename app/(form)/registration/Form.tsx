// Form.tsx
"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/app/lib/validations/registerSchema";

import FormNavbar from "./ui/FormNavbar";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { updateFormData } from "@/app/lib/store/features/formSlice";
import { useToast } from "@/hooks/use-toast";
import Register from "./Register";
import Payment from "./ui/Payment";
// import Addittional from "./ui/Addittional";
import Additional from "./ui/Addittional";

const Form = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormValues) => {
    const serializedData = {
      ...data,
      dateOfBirth:
        data.dateOfBirth instanceof Date
          ? data.dateOfBirth.toISOString()
          : data.dateOfBirth,
    };

    if (step === 3) {
      console.log("Final form submission:", serializedData);
      dispatch(updateFormData(serializedData));
      toast({
        title: "Success!",
        description: "Form submitted successfully.",
      });
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const calculateProgress = () => {
    return (step / 3) * 100;
  };

  return (
    <div className="bg-[#FFFFFF] p-10 pb-0 rounded-md">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormNavbar
            currentStep={
              step === 1 ? "basic" : step === 2 ? "payment" : "additional"
            }
            progress={calculateProgress()}
          />

          {step === 1 && <Register />}
          {step === 2 && <Payment />}
          {step === 3 && <Additional />}

          <div className="p-10 flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 hover:bg-gray-600 h-10 w-1/4"
              >
                Previous
              </Button>
            )}
            <Button
              type="submit"
              className="bg-[#789336] hover:bg-[#85a23c] h-10 w-1/4 ml-auto"
            >
              {step === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
