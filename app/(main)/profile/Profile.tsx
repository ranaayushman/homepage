"use client";

import InputField from "@/app/sections/form/ui/InputField";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

interface ProfileProps {
  userId: string;
}
const Profile = ({userId}: ProfileProps) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      pincode: "",
    },
  });

  const onSubmit = (data: {
    name: string;
    email: string;
    mobile: string;
    pincode: string;
  }) => {
    console.log(data);
  };

  return (
    <div className="bg-white w-full rounded-md p-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Name:" placeholder="Name" name="name" />
            <InputField label="Email:" placeholder="Email" name="email" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Mobile Number:"
              placeholder="Mobile"
              name="mobile"
            />
            <InputField label="Pin Code:" placeholder="pin code" name="pincode" />
          </div>
          <div className="flex justify-center mt-5">
            <Button className="bg-[#789336] text-[#FFFFFF] w-48">
              Save & Continue
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Profile;
