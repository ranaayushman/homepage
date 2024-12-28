import { z } from "zod";

export const registerFormSchema = z.object({
  admissionClass: z.string().min(1, "Please select admission class"),
  schoolingMode: z.string().min(1, "Please select schooling mode"),
  admissionSession: z.string().min(1, "Please select admission session"),
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.date(), // Keep as date for form handling
  age: z.string().min(1, "Age is required"),
  castCategory: z.enum(["General", "OBC", "SC", "ST", "Other"]),
  specaillyAbled: z.enum(["Yes", "No"]),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
