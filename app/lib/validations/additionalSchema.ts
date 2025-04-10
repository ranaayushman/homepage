import { z } from "zod";

const validateFileSize = (file: File | undefined) => {
  const maxSize = 5 * 1024 * 1024;
  return !file || file.size <= maxSize; 
};

const classOptSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  admissionSession: z.string().min(1, "Admission session is required"),
  modeOfSchooling: z.enum(["offline", "online"], {
    required_error: "Please select a mode of schooling",
  }),
});

const studentDetailsSchema = z.object({
  fullName: z.string().min(1, "First name is required"),
  dateOfBirth: z.date().transform((date) => date.toISOString()),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  isSingleChild: z.enum(["true", "false"], {
    required_error: "Please select if the student is a single child",
  }),
  castCategory: z.enum(["SC", "ST", "OBC", "GEN"], {
    required_error: "Please select a caste category",
  }),
  speciallyAbled: z.enum(["true", "false"], {
    required_error: "Please select if the student is specially abled",
  }),
  profilePic: z
    .custom<File>()
    .optional()
    .refine(validateFileSize, "File size should be less than 5MB"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid age",
  }),
  category: z.string().min(1, "Category is required"),
});

const previousSchoolSchema = z.object({
  lastSchoolAffiliated: z.enum(["CBSE", "ICSE", "State Board"], {
    required_error: "Please select the last school affiliated",
  }),
  lastClassAttended: z.string().min(1, "Last class attended is required"),
  lastSchool: z.string().min(1, "Last school attended is required"),
  secondLanguage: z.enum(["Bengali", "Hindi"], {
    required_error: "Please select a second language",
  }),
});

const studentOtherInfoSchema = z.object({
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  motherTongue: z.string().min(1, "Mother tongue is required"),
  religion: z.string().min(1, "Religion is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
});

const parentsGuardianSchema = z.object({
  guardianName: z.string().min(1, "Guardian name is required"),
  guardianResidentialAddress: z
    .string()
    .min(1, "Guardian residential address is required"),
  guardianOccupation: z.string().min(1, "Guardian occupation is required"),
  motherName: z.string().min(1, "Mother name is required"),
  motherResidentialAddress: z
    .string()
    .min(1, "Mother residential address is required"),
  motherOccupation: z.string().min(1, "Mother occupation is required"),
});

const communicationDetailsSchema = z.object({
  phoneNumber1: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Must be a valid phone number"),
  phoneNumber2: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Must be a valid phone number"),
  phoneNumber3: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Must be a valid phone number"),
  email: z.string().email("Invalid email address"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  localAddress: z.string().min(1, "Local address is required"),
});

const economicProfileSchema = z.object({
  relationWithGuardian: z.string().min(1, "Relation with guardian is required"),
  yearlyIncome: z.string().min(1, "Yearly income is required"),
  designation: z.string().min(1, "Designation is required"),
  dependentOnGuardian: z.string().min(1, "Dependent on guardian is required"),
  earningMembers: z.string().min(1, "Earning members is required"),
});

const documentsSchema = z.object({
  birthCertificate: z
    .custom<File>()
    .optional()
    .refine(validateFileSize, "File size should be less than 5MB"),
  transferCertificate: z
    .custom<File>()
    .optional()
    .refine(validateFileSize, "File size should be less than 5MB"),
  migrationCertificate: z
    .custom<File>()
    .optional()
    .refine(validateFileSize, "File size should be less than 5MB"),
  markSheet: z
    .custom<File>()
    .optional()
    .refine(validateFileSize, "File size should be less than 5MB"),
  aadhaarCard: z
    .custom<File>()
    .optional()
    .refine(validateFileSize, "File size should be less than 5MB"),
  residentialProof: z
    .custom<File>()
    .optional()
    .refine(validateFileSize, "File size should be less than 5MB"),
});

export const additionalSchema = z.object({
  class: classOptSchema,
  studentDetails: studentDetailsSchema,
  previousSchool: previousSchoolSchema,
  studentOtherInfo: studentOtherInfoSchema,
  parentsInfo: parentsGuardianSchema,
  communicationDetails: communicationDetailsSchema,
  economicProfile: economicProfileSchema,
  documents: documentsSchema,
});

export type AdditionalFormData = z.infer<typeof additionalSchema>;
