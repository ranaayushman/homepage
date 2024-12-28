import { z } from "zod";

export const registerFormSchema = z.object({
  // AdmissionClass fields
  admissionClass: z.string().min(1, "Please select admission class"),
  schoolingMode: z.string().min(1, "Please select schooling mode"),
  admissionSession: z.string().min(1, "Please select admission session"),

  // StudentDetails fields
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z
    .union([z.date(), z.string().transform((str) => new Date(str))])
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  age: z.string().min(1, "Age is required"),
  castCategory: z.enum(["General", "OBC", "SC", "ST", "Other"]),
  specaillyAbled: z.enum(["Yes", "No"]),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
