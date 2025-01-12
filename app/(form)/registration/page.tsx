"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Additional from "./ui/Addittional";

const Page = () => {
  const methods = useForm({
    defaultValues: {
      admissionClass: "",
      // add other default values here
    },
  });

  return (
    <div className=" md:p-5">
      <FormProvider {...methods}>
        <Additional />
      </FormProvider>
    </div>
  );
};

export default Page;
