import { z } from "zod";

const validateFileSize = (file: File | undefined) => {
  const maxSize = 5 * 1024 * 1024;
  return !file || file.size <= maxSize;
};

//Class Opt
const classOptSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  modeOfSchooling: z.string().min(1, "Mode of schooling is required"),
  admissionSession: z.string().min(1, "Admission session is required"),
});

//StudentDetailsAdd
const studentDetailsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  profilePic: z
    .custom<File>()
    .optional()
    .refine(validateFileSize, "File size should be less than 5MB"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.date().transform((date) => date.toISOString()),
  age: z.string().min(1, "Age is required"),
  isSingleChild: z.enum(["true", "false"], {
    errorMap: () => ({ message: "Is single child is required" }),
  }),
  castCategory: z.enum(["SC", "ST", "OBC", "GEN"], {
    errorMap: () => ({ message: "Cast category is required" }),
  }),
  speciallyAbled: z.enum(["true", "false"], {
    errorMap: () => ({ message: "Specially abled is required" }),
  }),
});

//PreviousSchool
const previousSchoolSchema = z.object({
  lastSchoolAffiliated:z.enum(["CBSE", "ICSE", "State Board", "Other"], {
    errorMap: () => ({ message: "Last school affiliated is required" }),
  }),
  secondLanguage:z.enum(["Bengali", "Hindi"], {
    errorMap: () => ({ message: "Second language is required" })
  }),
  lastClassAttended:z.string().min(1, "Last class attended is required"),
  lastSchool:z.string().min(1, "Last school is required"),
});

//StudentOtherInformation
const studentOtherInfoSchema = z.object({
  height:z.string().min(1, "Height is required"),
  weight:z.string().min(1, "Weight is required"),
  // bloodGroup:z.enum(["A+", "B+", "O+", "AB+"], {
  //   errorMap: () => ({ message: "Blood group is required" }),
  // }),
  bloodGroup:z.string().min(1, "Blood group is required"),
  motherTongue:z.string().min(1, "Mother tongue is required"),
  religion:z.string().min(1, "Religion is required"),
});
//ParentsOrGuardian
const parentsGuardianSchema = z.object({
  guardianName:z.string().min(1, "Guardian name is required"),
  guardianResidentialAddress:z.string().min(1, "Guardian residential address is required"),
  guardianOccupation:z.string().min(1, "Guardian occupation is required"),
  motherName:z.string().min(1, "Mother name is required"),
  motherResidentialAddress:z.string().min(1, "Mother residential address is required"),
  motherOccupation:z.string().min(1, "Mother occupation is required"),
});

//Communication Details
const communicationDetailsSchema = z.object({
  phoneNumber1:z.string().min(10, "Phone number 1 is required"),
  phoneNumber2:z.string().min(10,"required"),
  phoneNumber3:z.string().min(10,'required'),
  permanentAddress:z.string().min(1, "Permanent address is required"),
  localAddress:z.string().min(1, "Local address is required"),
});

//EconomicProfile
const economicProfileSchema = z.object({
  relationWithGuardian:z.string(),
  yearlyIncome:z.string(),
  designation:z.string(),
  dependentOnGuardian:z.string(),
  earningMembers:z.string(),
});

//Documents
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
