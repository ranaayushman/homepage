"use client";

import React from "react";
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

export default function EnquiryForm() {
  const methods = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
  });

  const { toast } = useToast();

  const onSubmit = (data: EnquiryFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="parentName"
            placeholder="Parent’s Name"
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
            options={[
              { label: "Greenwood High", value: "greenwood_high" },
              {
                label: "Oakridge International",
                value: "oakridge_international",
              },
              { label: "DPS Bangalore", value: "dps_bangalore" },
              { label: "National Public School", value: "nps" },
            ]}
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
            onClick={() =>
              toast({
                title: "Form submitted successfully",
              })
            }
            type="submit"
            className="w-full text-base py-2 px-4 bg-[#789336] text-white rounded hover:bg-[#809c3a] transition-colors"
          >
            SUBMIT
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
