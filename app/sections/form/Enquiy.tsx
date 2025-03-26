"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enquiryFormSchema,
  type EnquiryFormValues,
} from "@/app/lib/validations/kalyaniForm";
import InputField from "./ui/InputField";
import { SelectField } from "./ui/SelectField";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFormOptions } from "@/app/utils/customHooks/useFormOptions";
import { sendEnquiryData } from "@/app/utils/formPostApi/enquiry";

export default function EnquiryForm() {
  const { sessionOptions, schoolOptions, error } = useFormOptions();
  const methods = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      parentName: "",
      phoneNumber: "",
      school: "",
      session: "",
      emailId: "",
      pinCode: "",
    },
  });

  const { toast } = useToast();

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("enquiryFormData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, [methods]);

  // Save form data to localStorage on change
  const { watch } = methods;
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("enquiryFormData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: EnquiryFormValues) => {
    try {
      const formData = {
        name: data.parentName,
        phoneNumber: data.phoneNumber,
        schoolId: data.school,
        email: data.emailId,
        pincode: data.pinCode,
        roleId: "677254969fa73b28bf5de8d6",
        sessionId: data.session, 
      };
      await sendEnquiryData(formData);
      console.log("Form submitted successfully:", data);

      // Clear form on success
      methods.reset({
        parentName: "",
        phoneNumber: "",
        school: "",
        session: "",
        emailId: "",
        pinCode: "",
      });
      localStorage.removeItem("enquiryFormData");
      toast({
        title: "Form submitted successfully",
      });
    } catch (e: unknown) {
      console.error("Error submitting form:", e);
      toast({
        title: "Error submitting form",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="parentName"
            placeholder="Parent's Name"
            className="rounded-none border-black border-t-0 border-x-0"
          />
          <InputField
            name="phoneNumber"
            placeholder="Phone Number"
            type="tel"
            className="rounded-none border-black border-t-0 border-x-0"
          />
          <SelectField
            name="school"
            placeholder="School Applying for"
            options={schoolOptions}
            className={{
              trigger: "bg-white border-x-0 border-t-0 border-b-2 rounded-none",
              content: "bg-gray-50",
              item: "hover:bg-blue-100",
              formItem: "mb-4",
            }}
          />
          <SelectField
            name="session"
            placeholder="Session"
            options={sessionOptions}
            className={{
              trigger: "bg-white border-x-0 border-t-0 border-b-2 rounded-none",
              content: "bg-gray-50",
              item: "hover:bg-blue-100",
              formItem: "mb-4",
            }}
          />
          <InputField
            name="emailId"
            placeholder="Email"
            type="email"
            className="rounded-none border-black border-t-0 border-x-0"
          />
          <InputField
            name="pinCode"
            placeholder="Pin code"
            className="rounded-none border-black border-t-0 border-x-0"
          />

          <Button
            type="submit"
            className="w-full text-base py-2 px-4 bg-[#292B5F] text-white rounded hover:bg-[#353478] transition-colors"
          >
            SUBMIT
          </Button>
        </form>
      </FormProvider>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
