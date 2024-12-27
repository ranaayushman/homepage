"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/app/lib/validations/register";
import { useToast } from "@/hooks/use-toast";
import { SelectField } from "@/app/sections/form/ui/SelectField";
import { Button } from "@/components/ui/button";
import { updateFormData, setStep } from "@/app/lib/store/features/formSlice";
import type { RootState } from "@/app/lib/store/store";

function AdmissionClass() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: formData,
  });

  const { toast } = useToast();

  const onSubmit = (data: RegisterFormValues) => {
    dispatch(updateFormData(data));

    // Check if all fields are filled to move to next step
    const allFieldsFilled = Object.values(data).every(Boolean);
    if (allFieldsFilled) {
      dispatch(setStep("basic"));
    }

    toast({
      title: "Form submitted successfully",
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-10">
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            name="admissionClass"
            placeholder="Select Admission Class"
            options={[
              { label: "Greenwood High", value: "greenwood_high" },
              {
                label: "Oakridge International",
                value: "oakridge_international",
              },
              { label: "DPS Bangalore", value: "dps_bangalore" },
              { label: "National Public School", value: "nps" },
            ]}
          />
          <SelectField
            name="schoolingMode"
            placeholder="Select Schooling Mode"
            options={[
              { label: "Greenwood High", value: "greenwood_high" },
              {
                label: "Oakridge International",
                value: "oakridge_international",
              },
              { label: "DPS Bangalore", value: "dps_bangalore" },
              { label: "National Public School", value: "nps" },
            ]}
          />
          <SelectField
            name="admissionSession"
            placeholder="Select Admission Session"
            options={[
              { label: "Greenwood High", value: "greenwood_high" },
              {
                label: "Oakridge International",
                value: "oakridge_international",
              },
              { label: "DPS Bangalore", value: "dps_bangalore" },
              { label: "National Public School", value: "nps" },
            ]}
          />
        </div>
        <Button
          type="submit"
          className="w-full text-base py-2 px-4 bg-[#98B14F] text-white rounded hover:bg-[#87a03f] transition-colors"
        >
          SUBMIT
        </Button>
      </form>
    </FormProvider>
  );
}

export default AdmissionClass;
