"use client";
import React from "react";
import FormNavbar from "./ui/FormNavbar";
import AdmissionClass from "./ui/AdmissionClass";
import StudentDetails from "./ui/StudentDetails";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, setStep } from "@/app/lib/store/features/formSlice";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/app/lib/validations/registerSchema";
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
    defaultValues: {
      ...formData,
      // Convert stored string back to Date if it exists
      dateOfBirth: formData.dateOfBirth
        ? new Date(formData.dateOfBirth)
        : undefined,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // Create a new object with the date converted to ISO string
    const serializedData = {
      ...data,
      dateOfBirth:
        data.dateOfBirth instanceof Date
          ? data.dateOfBirth.toISOString()
          : data.dateOfBirth,
    };

    console.log("Form data submitted:", serializedData);
    dispatch(updateFormData(serializedData));
    toast({
      title: "Success!",
      description: "Form data has been submitted successfully.",
    });
  };

  return (
    <div className="bg-[#FFFFFF]">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormNavbar currentStep={currentStep} progress={progress} />
          <AdmissionClass />
          <StudentDetails />
          <div className="p-10">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
