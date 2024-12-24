import { z } from "zod";

export const enquiryFormSchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Must be a valid phone number"),
  emailId: z.string().email("Must be a valid email"),
  pinCode: z
    .string()
    .length(6, "Pin code must be 6 digits")
    .regex(/^\d+$/, "Must be a valid pin code"),
});

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

export const loginFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Must be a valid phone number"),
  opt: z.string().length(6),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
