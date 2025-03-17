"use client";

import React, { useEffect, useState } from "react";
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
import {
  fetchSchoolOptions,
  fetchSessionOptions,
} from "@/app/utils/formGetApi/allGetApi";
import { sendEnquiryData } from "@/app/utils/formPostApi/enquiry";

export default function EnquiryForm() {
  const methods = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      parentName: "",
      phoneNumber: "",
      school: "",
      emailId: "",
      pinCode: "",
    }, // Default values to clear form
  });

  const { toast } = useToast();
  const [schools, setSchools] = useState<
    { key: string; label: string; value: string }[]
  >([]);
  const [latestSessionId, setLatestSessionId] = useState<string>("");

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("enquiryFormData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }

    const fetchData = async () => {
      try {
        const schools = await fetchSchoolOptions();
        const schoolOptions = schools.map((s) => ({
          key: s._id.toString(),
          label: s.schoolName,
          value: s._id.toString(),
        }));
        setSchools(schoolOptions);
      } catch (e: unknown) {
        console.error(e);
      }
    };

    const fetchSession = async () => {
      try {
        const sessionData = await fetchSessionOptions();
        // Assuming sessions are sorted by date in the API response
        // If not sorted, we need to find the latest session
        if (sessionData && sessionData.length > 0) {
          // Get the first session which should be the latest (2025-2026)
          const latestSession = sessionData[1];
          setLatestSessionId(latestSession._id);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    fetchSession();
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
        sessionId: latestSessionId,
      };
      await sendEnquiryData(formData);
      console.log("Form submitted successfully:", data);

      // Clear form on success
      methods.reset({
        parentName: "",
        phoneNumber: "",
        school: "",
        emailId: "",
        pinCode: "",
      });
      localStorage.removeItem("enquiryFormData"); // Clear localStorage
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
            options={schools}
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
            className="w-full text-base py-2 px-4 bg-[#292B5F] text-white rounded hover:bg-[#353478]  transition-colors"
          >
            SUBMIT
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
