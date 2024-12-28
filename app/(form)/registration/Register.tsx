"use client";
import React from "react";
import FormNavbar from "./ui/FormNavbar";
import AdmissionClass from "./ui/AdmissionClass";
import StudentDetails from "./ui/StudentDetails";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@/app/lib/store/features/formSlice";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/app/lib/validations/registerSchema";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/app/lib/store/store";
import { Button } from "@/components/ui/button";
import PreviousAcademic from "./ui/PreviousAcademic";
import Guardian from "./ui/Guardian";

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
      dateOfBirth: formData.dateOfBirth
        ? new Date(formData.dateOfBirth)
        : undefined,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
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
    <div className="bg-[#FFFFFF] p-10 rounded-md">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormNavbar currentStep={currentStep} progress={progress} />
          <AdmissionClass />
          <StudentDetails />
          <PreviousAcademic />
          <Guardian />
          <div className="p-10 flex justify-end">
            <Button type="submit" className="bg-[#789336] hover:bg-[#85a23c] h-10 w-2/3 md:w-1/4">Submit</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
