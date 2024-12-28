import { z } from "zod";

export const registerFormSchema = z.object({
  admissionClass: z.string().min(1, "Please select admission class"),
  schoolingMode: z.string().min(1, "Please select schooling mode"),
  admissionSession: z.string().min(1, "Please select admission session"),
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.date(),
  age: z.string().min(1, "Age is required"),
  castCategory: z.enum(["General", "OBC", "SC", "ST", "Other"]),
  specaillyAbled: z.enum(["Yes", "No"]),
  lastSchoolAffiliated: z.enum(["CBSE", "ICSE", "IB", "State Board", "Other"]),
  lastClassAttended: z.string().min(1, "Last class attended is required"),
  lastSchoolName: z.string().min(1, "Last school name is required"), 
  guardianName: z.string().min(1, "Guardian name is required"),
  highestQualification: z.string(),
  occupation: z.string(),
  yearlyIncome: z.string(),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
