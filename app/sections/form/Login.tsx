"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/app/lib/validations/form";
import InputField from "./ui/InputField";
import { Button } from "@/components/ui/button";

export default function Login() {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const [isOtpVisible, setIsOtpVisible] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    // Handle form submission
  };

  const handleGetOtpClick = () => {
    setIsOtpVisible(true);
  };

  return (
    <div className="h-[50vh] flex flex-col">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between"
        >
          <div className="space-y-6">
            <InputField
              name="phoneNumber"
              placeholder="Phone Number"
              type="tel"
              className="rounded-none border-black border-t-0 border-x-0"
            />
            <button
              type="button"
              onClick={handleGetOtpClick}
              className="w-full text-base py-2 px-4 bg-[#292B5F] text-white rounded hover:bg-[#353478]  transition-colors mt-4"
            >
              Get OTP
            </button>

            {isOtpVisible && (
              <InputField
                name="otp"
                placeholder="Enter OTP here"
                className="rounded-none border-black border-t-0 border-x-0"
              />
            )}
          </div>

          <Button
            type="submit"
            className="w-full text-base py-2 px-4 bg-[#292B5F] text-white rounded hover:bg-[#353478]  transition-colors mt-4"
          >
            SUBMIT
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
