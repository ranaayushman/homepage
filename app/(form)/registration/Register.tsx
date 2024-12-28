"use client";
import React from "react";
import FormNavbar from "./ui/FormNavbar";
import AdmissionClass from "./ui/AdmissionClass";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, setStep } from "@/app/lib/store/features/formSlice";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/app/lib/validations/register";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/app/lib/store/store";
import { Button } from "@/components/ui/button";

const Register = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { currentStep, progress, formData } = useSelector(
    (state: RootState) => state.form
  );

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form data submitted:", data);
    dispatch(updateFormData(data));
    toast({
      title: "Success!",
      description: "Form data has been submitted successfully.",
    });
  };

  return (
    <div className="bg-[#FFFFFF]">
      <FormProvider {...methods}>
        <FormNavbar currentStep={currentStep} progress={progress} />
        <AdmissionClass onSubmit={methods.handleSubmit(onSubmit)} />
        <div className="p-10">
          <Button type="submit" onClick={methods.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default Register;
