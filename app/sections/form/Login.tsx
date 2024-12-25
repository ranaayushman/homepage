"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/app/lib/validations/form";
import InputField from "./ui/InputField";
import { DateField } from "./ui/DateField";

export default function Login() {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="m-6 mt-0 p-6 bg-white rounded-lg w-full h-[60vh]  drop-shadow-md">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="phoneNumber"
            placeholder="Phone Number"
            type="tel"
          />
          <InputField name="otp" placeholder="Enter OTP here" />
          {/* <DateField placeholder="date" name="date" /> */}
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
