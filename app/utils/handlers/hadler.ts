"use client";

import {
  sendAllApplicationId,
  sendStudentApplicationDocument,
  sendStudentApplicationFormDetails,
  sendStudentApplicationJSON,
  studentParentIncomeDetails,
} from "@/app/utils/studentForm/studentPost";
import { AdditionalFormData } from "@/app/lib/validations/additionalSchema";
import Cookies from "js-cookie";

const getSchoolCode = (schoolName: string): number => {
  const decodedSchoolName = decodeURIComponent(schoolName);
  const schoolCodeMap: Record<string, number> = {
    "Kalyani Public School, Barasat": 4,
    "Kalyani Public School, Saltlake": 2,
    "Central Model School, Kalyani": 3,
    "Kalyani Central Model School, Kalyani": 1,
    "Mother International School, Konnagar": 5,
    "ABC School": 81,
  };
  return schoolCodeMap[decodedSchoolName] || 2;
};

export const handleStudentApplicationFromZod = async (formData: AdditionalFormData) => {
  try {
    const schoolId = Cookies.get("schoolId") || "";
    const school = Cookies.get("school") || "";
    const schoolCode = getSchoolCode(school);
    const session = Cookies.get("session") || "";
    const yearPrefix = new Date().getFullYear().toString();
    const parentId = Cookies.get("applicationId");
    if (!parentId) throw new Error("Parent ID is missing");

    const data = {
      parentId,
      classId: formData.class.className,
      sessionId: session,
      schoolId,
      modeOfSchooling: "Regular",
      selectAdmissionSession: session,
      name: `${formData.studentDetails.firstName} ${formData.studentDetails.lastName}`,
      gender: formData.studentDetails.gender,
      dob: formData.studentDetails.dateOfBirth,
      category: formData.studentDetails.category,
      age: calculateAge(formData.studentDetails.dateOfBirth),
    };

    const dataToSend = { schoolCode, yearPrefix, data };
    console.log("Sending to /add-student-application:", dataToSend);
    const response = await sendStudentApplicationJSON(dataToSend);
    console.log("Response from /add-student-application:", response);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentApplication:", e);
    return { success: false, error: e.message || "Failed to create student application" };
  }
};

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const handleStudentApplicationFormDetailsFromZod = async (
  studentAppId: string,
  formData: AdditionalFormData
) => {
  try {
    if (!studentAppId) return { success: false, error: "Missing student application ID" };

    const height = parseFloat(formData.studentOtherInfo.height) || null;
    const weight = parseFloat(formData.studentOtherInfo.weight) || null;

    const data = {
      studentApplicationFormId: studentAppId,
      studentImage: null,
      religion: formData.studentDetails.religion,
      bloodGroup: formData.studentDetails.bloodGroup,
      motherTongue: "",
      onlyChild: false,
      onlyGirlChild: false,
      height,
      weight,
      speciallyAbled: !!formData.studentOtherInfo.disabilities,
      fatherName: formData.parentsInfo.fatherName,
      fatherResidentalAddress: formData.communicationDetails.address,
      motherName: formData.parentsInfo.motherName,
      motherResidentalAddress: formData.communicationDetails.address,
      fatherOccupation: formData.parentsInfo.fatherOccupation,
      motherOccupation: formData.parentsInfo.motherOccupation,
      phoneNo: formData.communicationDetails.phone,
      secondaryNo: formData.communicationDetails.alternatePhone || "",
      additionalNo: "",
      email: formData.communicationDetails.email,
      permanentAddress: formData.communicationDetails.address,
      localAddress: formData.communicationDetails.address,
      aadhaaCardNo: formData.economicProfile.aadhaarNumber,
      secondLanguage: "",
      parentQualification: formData.parentsInfo.guardianRelation || "",
      parentOccupation: formData.parentsInfo.fatherOccupation,
      parentIncome: formData.economicProfile.annualIncome,
      category: formData.studentDetails.category,
    };

    console.log("Sending to /add-student-form-details:", data);
    const response = await sendStudentApplicationFormDetails(data);
    console.log("Response from /add-student-form-details:", response);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentApplicationFormDetails:", e);
    return { success: false, error: e.message || "Failed to submit form details" };
  }
};

export const handleStudentApplicationDocumentFromZod = async (
  studentAppId: string,
  formData: AdditionalFormData
) => {
  try {
    if (!studentAppId) return { success: false, error: "Missing student application ID" };

    const data = {
      studentApplicationFormId: studentAppId,
      birthCertificate: formData.documents.birthCertificate,
      transferCertificate: formData.documents.transferCertificate,
      migrationCertificate: null,
      markSheet: formData.documents.marksheet,
      castCategory: null,
      aadhaarCard: null,
      specialAbledCertificate: null,
      parentDocs: formData.economicProfile.incomeProof,
    };

    console.log("Sending to /add-student-application-form-document:", data);
    const response = await sendStudentApplicationDocument(data);
    console.log("Response from /add-student-application-form-document:", response);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentApplicationDocument:", e);
    return { success: false, error: e.message || "Failed to submit documents" };
  }
};

export const handleStudentParentIncomeDetailsFromZod = async (
  studentAppId: string,
  formData: AdditionalFormData
) => {
  try {
    if (!studentAppId) return { success: false, error: "Missing student application ID" };

    const data = {
      studentApplicationFormId: studentAppId,
      noOfDependentsOfGuardian: 0,
      earningMembersInFamily: 0,
      relationWithGuardian: formData.parentsInfo.guardianRelation || "",
      annualIncome: formData.economicProfile.annualIncome,
      guardianDesignation: formData.parentsInfo.guardianOccupation || "",
    };

    console.log("Sending to /add-parent-income-details:", data);
    const response = await studentParentIncomeDetails(data);
    console.log("Response from /add-parent-income-details:", response);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentParentIncomeDetails:", e);
    return { success: false, error: e.message || "Failed to submit income details" };
  }
};

export const handleSubmitStudentApplicationFromZod = async (formData: AdditionalFormData) => {
  try {
    console.log("Starting submission with formData:", formData);
    const yearPrefix = new Date().getFullYear().toString();

    // Step 1: Create student application
    const applicationResult = await handleStudentApplicationFromZod(formData);
    if (!applicationResult || !applicationResult.data || !applicationResult.data._id) {
      throw new Error("Failed to create student application");
    }
    const studentAppId = applicationResult.data._id;

    // Step 2: Submit form details
    const formDetailsResult = await handleStudentApplicationFormDetailsFromZod(studentAppId, formData);
    if (!formDetailsResult || !formDetailsResult._id) {
      throw new Error("Failed to submit form details");
    }

    // Step 3: Submit documents
    const documentResult = await handleStudentApplicationDocumentFromZod(studentAppId, formData);
    if (!documentResult || !documentResult.document || !documentResult.document._id) {
      throw new Error("Failed to submit document information");
    }

    // Step 4: Submit parent income details
    const incomeResult = await handleStudentParentIncomeDetailsFromZod(studentAppId, formData);
    if (!incomeResult || !incomeResult.financialResource || !incomeResult.financialResource._id) {
      throw new Error("Failed to submit parent income details");
    }

    // Step 5: Save all IDs
    const school = Cookies.get("school") || "";
    const schoolCode = getSchoolCode(school);
    const data = {
      schoolCode: applicationResult.data.schoolCode,
      year: yearPrefix,
      permanentNo: applicationResult.data.tempNo || "TEMP-" + studentAppId,
      studentApplicationFormId: studentAppId,
      studentApplicationFromDetailsId: formDetailsResult._id,
      studentApplicationFormDocumnetId: documentResult.document._id,
      studentApplicationParentIncomeId: incomeResult.financialResource._id,
    };
    const dataToSend = { schoolCode, yearPrefix, data };
    console.log("Sending to /student-application-data:", dataToSend);
    const finalResult = await sendAllApplicationId(dataToSend);
    console.log("Response from /student-application-data:", finalResult);

    return {
      success: true,
      message: "Form submitted successfully!",
      ids: {
        studentAppId,
        formDetailsId: formDetailsResult._id,
        documentId: documentResult.document._id,
        incomeId: incomeResult.financialResource._id,
      },
    };
  } catch (e: any) {
    console.error("Error in handleSubmitStudentApplication:", e);
    return {
      success: false,
      error: e.message || "An error occurred while submitting the form",
    };
  }
};