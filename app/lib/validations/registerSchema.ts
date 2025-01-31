import { z } from "zod";

export const registerFormSchema = z.object({
  admissionClass: z.string().min(1, "Please select admission class"),
  schoolingMode: z.string().min(1, "Please select schooling mode"),
  admissionSession: z.string().min(1, "Please select admission session"),
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.date().transform((date) => date.toISOString()),
  age: z.string().min(1, "Age is required"),
  castCategory: z.enum(["General", "OBC", "SC", "ST", "EWS"]),
  specaillyAbled: z.enum(["Yes", "No"]),
  lastSchoolAffiliated: z.enum(["CBSE", "ICSE", "IB", "State Board", "Other"]),
  lastClassAttended: z.string().min(1, "Last class attended is required"),
  lastSchoolName: z.string().min(1, "Last school name is required"),
  // guardianName: z.string().min(1, "Guardian name is required"),

  // highestQualification: z
  //   .string()
  //   .nullish()
  //   .transform((val) => val?.trim() || null),

  // occupation: z
  //   .string()
  //   .nullish()
  //   .transform((val) => val?.trim() || null),

  // yearlyIncome: z
  //   .string()
  //   .nullish()
  //   .transform((val) => val?.trim() || null),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
