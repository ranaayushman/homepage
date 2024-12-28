import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentDetailsFormSchema,
  type StudentDetailsFormValues,
} from "@/app/lib/validations/studentDetails";
import InputField from "@/app/sections/form/ui/InputField";
import RadioField from "@/app/sections/form/ui/RadioField";
import { Button } from "@/components/ui/button";

const StudentDetails = () => {
  const methods = useForm<StudentDetailsFormValues>({
    resolver: zodResolver(studentDetailsFormSchema),
  });

  const onSubmit = (data: StudentDetailsFormValues) => {
    console.log("Form data submitted:", data);
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h2>Student’s Details</h2>
          <div className="grid grid-cols-2 gap-x-4">
            <InputField name="name" placeholder="Enter Full Name" />
            <RadioField
              name="gender"
              label="Gender:"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default StudentDetails;
