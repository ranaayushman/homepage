"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/app/lib/validations/form";
import InputField from "./ui/InputField";
import { Button } from "@/components/ui/button";
import { sendLoginOTPData, verifyOTP } from "@/app/utils/formPostApi/login";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phoneNumber: "",
      otp: "",
    },
  });

  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter(); 

  useEffect(() => {
    const savedData = localStorage.getItem("loginFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      methods.reset(parsedData);
      if (parsedData.requestId) {
        setRequestId(parsedData.requestId);
        setIsOtpVisible(true);
      }
    }
  }, [methods]);

  const { watch } = methods;
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(
        "loginFormData",
        JSON.stringify({ ...value, requestId })
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, requestId]);

  const handleGetOtpClick = async () => {
    try {
      setIsLoading(true);
      const phoneNumber = methods.getValues("phoneNumber");
      const phoneFieldState = methods.getFieldState("phoneNumber");
      if (phoneFieldState.invalid) {
        methods.trigger("phoneNumber");
        toast({
          variant: "destructive",
          title: "Invalid phone number",
          description: "Please enter a valid phone number",
        });
        return;
      }

      const formData = {
        phoneNumber: "+91" + phoneNumber,
      };

      const response = await sendLoginOTPData(formData);

      if (response.success) {
        setRequestId(response.requestId as unknown as string);
        setIsOtpVisible(true);
        const currentData = methods.getValues();
        localStorage.setItem(
          "loginFormData",
          JSON.stringify({ ...currentData, requestId: response.requestId })
        );
        toast({
          variant: "default",
          title: "Success",
          description: response.message || "OTP sent successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to send OTP",
          description: response.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);

      if (!requestId) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please get OTP first",
        });
        return;
      }

      const submissionData = {
        phoneNumber: data.phoneNumber,
        otp: Number(data.otp),
        requestId: requestId,
      };

      const verifyResponse = await verifyOTP(submissionData);

      if (verifyResponse.success) {
        Cookies.set("authToken", String(verifyResponse.token), {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        localStorage.removeItem("loginFormData");
        methods.reset({
          phoneNumber: "",
          otp: "",
        });
        setIsOtpVisible(false);
        setRequestId(null);
        toast({
          variant: "default",
          title: "Success",
          description: "Login successful",
        });

        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description:
            verifyResponse.message || "Invalid OTP. Please try again.",
        });
      }

      console.log("Submission data:", submissionData);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
            <Button
              type="button"
              onClick={handleGetOtpClick}
              className="w-full text-base py-2 px-4 bg-[#292B5F] text-white rounded hover:bg-[#353478] transition-colors mt-4"
              disabled={isLoading}
            >
              {isLoading && !isOtpVisible ? "Sending..." : "Get OTP"}
            </Button>

            {isOtpVisible && (
              <>
                <InputField
                  name="otp"
                  placeholder="Enter OTP here"
                  className="rounded-none border-black border-t-0 border-x-0"
                />
                <Button
                  type="button"
                  onClick={handleGetOtpClick}
                  className="w-full text-sm py-1 px-2 bg-transparent text-[#292B5F] underline hover:text-[#353478] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading && isOtpVisible ? "Resending..." : "Resend OTP"}
                </Button>
              </>
            )}
          </div>

          <Button
            type="submit"
            className="w-full text-base py-2 px-4 bg-[#292B5F] text-white rounded hover:bg-[#353478] transition-colors mt-4"
            disabled={isLoading || !isOtpVisible}
          >
            {isLoading ? "SUBMITTING..." : "SUBMIT"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
