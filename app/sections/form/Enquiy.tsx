"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enquiryFormSchema,
  type EnquiryFormValues,
} from "@/app/lib/validations/form";
import InputField from "./ui/InputField";

export default function EnquiryForm() {
  const methods = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
  });

  const onSubmit = (data: EnquiryFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="m-6 mt-0 p-6 bg-white rounded-lg w-full h-[70vh]  drop-shadow-md">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <InputField name="studentName" placeholder="Student Name" />
          <InputField
            name="phoneNumber"
            placeholder="Phone Number"
            type="tel"
          />
          <InputField name="emailId" placeholder="Email ID" type="email" />
          <InputField name="pinCode" placeholder="Pin code" />

          <button
            type="submit"
            className="w-full text-base py-2 px-4 bg-[#98B14F] text-white rounded hover:bg-[#87a03f] transition-colors"
          >
            SUBMIT
          </button>
        </form>
      </FormProvider>
    </div>
  );
}