import { z } from "zod";

export const studentDetailsFormSchema = z.object({
  name: z
    .string({ required_error: "Please enter your name" })
    .min(1, "Name is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender",
  }),
  dateOfBirth: z.date({ required_error: "Please enter your date of birth" }),
  age: z
    .string({ required_error: "Please enter your age" })
    .min(1, "Age is required"),
  castCategory: z.enum(["General", "OBC", "SC", "ST", "Other"], {
    required_error: "Please select your cast category",
  }),
  speciallyAbled: z.enum(["Yes", "No"], {}),
});

export type StudentDetailsFormValues = z.infer<typeof studentDetailsFormSchema>;
