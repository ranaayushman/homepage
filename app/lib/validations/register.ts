import { z } from "zod";

export const registerFormSchema = z.object({
  admissionClass: z
    .string({
      required_error: "Please select a class",
      invalid_type_error: "Please select a valid class",
    })
    .min(1, "Class selection is required"),
  schoolingMode: z
    .string({ required_error: "Please select a schooling mode" })
    .min(1, "Schooling mode selection is required"),
  admissionSession: z
    .string({
      required_error: "Please select an admission session",
    })
    .min(1, "Admission session selection is required"),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
