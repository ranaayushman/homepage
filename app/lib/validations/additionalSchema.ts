import { z } from "zod";

// Helper function for file validation
const validateFileSize = (file: File) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
};

// Class Selection Schema
const classOptSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  section: z.string().min(1, "Section is required"),
});

// Student Details Schema
const studentDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  bloodGroup: z.string().min(1, "Blood group is required"),
  nationality: z.string().min(1, "Nationality is required"),
  religion: z.string().min(1, "Religion is required"),
  category: z.string().min(1, "Category is required"),
});

// Previous School Schema
const previousSchoolSchema = z.object({
  schoolName: z.string().min(1, "Previous school name is required"),
  board: z.string().min(1, "Board is required"),
  class: z.string().min(1, "Class is required"),
  academicYear: z.string().min(1, "Academic year is required"),
  percentage: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) <= 100, {
      message: "Please enter a valid percentage (0-100)",
    }),
});

// Student Other Information Schema
const studentOtherInfoSchema = z.object({
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  identificationMark: z.string().min(1, "Identification mark is required"),
  medicalCondition: z.string().optional(),
  disabilities: z.string().optional(),
});

// Parents/Guardian Schema
const parentsGuardianSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherEducation: z.string().min(1, "Father's education is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherEducation: z.string().min(1, "Mother's education is required"),
  guardianName: z.string().optional(),
  guardianOccupation: z.string().optional(),
  guardianEducation: z.string().optional(),
  guardianRelation: z.string().optional(),
});

// Communication Details Schema
const communicationDetailsSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  alternatePhone: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .optional(),
  email: z.string().email("Enter a valid email address"),
});

// Economic Profile Schema
const economicProfileSchema = z.object({
  annualIncome: z.string().min(1, "Annual income is required"),
  incomeProof: z
    .custom<File>()
    .refine((file) => file instanceof File, "Income proof is required")
    .refine(validateFileSize, "File size should be less than 5MB"),
  aadhaarNumber: z
    .string()
    .regex(/^\d{12}$/, "Enter a valid 12-digit Aadhaar number"),
});

// Documents Schema
const documentsSchema = z.object({
  birthCertificate: z
    .custom<File>()
    .refine((file) => file instanceof File, "Birth certificate is required")
    .refine(validateFileSize, "File size should be less than 5MB"),
  transferCertificate: z
    .custom<File>()
    .refine((file) => file instanceof File, "Transfer certificate is required")
    .refine(validateFileSize, "File size should be less than 5MB"),
  characterCertificate: z
    .custom<File>()
    .refine((file) => file instanceof File, "Character certificate is required")
    .refine(validateFileSize, "File size should be less than 5MB"),
  marksheet: z
    .custom<File>()
    .refine((file) => file instanceof File, "Previous marksheet is required")
    .refine(validateFileSize, "File size should be less than 5MB"),
});

// Complete Form Schema
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

// Export type for TypeScript usage
export type AdditionalFormData = z.infer<typeof additionalSchema>;
