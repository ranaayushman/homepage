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

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const handleStudentApplication = async (
  formData: AdditionalFormData,
  parentId: string
) => {
  try {
    const schoolId = Cookies.get("schoolId") || "";
    const school = Cookies.get("school") || "";
    const schoolCode = getSchoolCode(school);
    const yearPrefix = new Date().getFullYear().toString();

    if (!parentId) throw new Error("Parent ID is missing");

    const data = {
      parentId,
      classId: formData.class.className,
      sessionId: formData.class.admissionSession,
      schoolId,
      modeOfSchooling: formData.class.modeOfSchooling,
      selectAdmissionSession: formData.class.admissionSession,
      name: formData.studentDetails.fullName,
      gender: formData.studentDetails.gender,
      dob: formData.studentDetails.dateOfBirth,
      category: formData.studentDetails.castCategory,
      age: calculateAge(formData.studentDetails.dateOfBirth),
    };
    const dataToSend = { schoolCode, yearPrefix, data };

    console.log("Sending to /add-student-application:", dataToSend);
    const response = await sendStudentApplicationJSON(dataToSend);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentApplication:", e);
    return {
      success: false,
      error: e.message || "Failed to create student application",
    };
  }
};

export const handleStudentApplicationFormDetails = async (
  studentAppId: string,
  formData: AdditionalFormData
) => {
  try {
    if (!studentAppId)
      return { success: false, error: "Missing student application ID" };

    const convertToBoolean = (value: string) => value === "true";
    const extractNumeric = (value: string | undefined) => {
      if (!value) return null;
      const matches = value.match(/^(\d+(\.\d+)?)/) || [];
      return matches[1] ? parseFloat(matches[1]) : null;
    };

    const data = {
      studentApplicationFormId: studentAppId,
      studentImage: formData.studentDetails.profilePic || null,
      religion: formData.studentOtherInfo.religion,
      bloodGroup: formData.studentOtherInfo.bloodGroup,
      motherTongue: formData.studentOtherInfo.motherTongue,
      onlyChild: convertToBoolean(formData.studentDetails.isSingleChild),
      onlyGirlChild: convertToBoolean(formData.studentDetails.isOnlyGirlChild),
      height: extractNumeric(formData.studentOtherInfo.height),
      weight: extractNumeric(formData.studentOtherInfo.weight),
      speciallyAbled: convertToBoolean(formData.studentDetails.speciallyAbled),
      fatherName: formData.parentsInfo.guardianName,
      fatherResidentalAddress: formData.parentsInfo.guardianResidentialAddress,
      motherName: formData.parentsInfo.motherName,
      motherResidentalAddress: formData.parentsInfo.motherResidentialAddress,
      fatherOccupation: formData.parentsInfo.guardianOccupation,
      motherOccupation: formData.parentsInfo.motherOccupation,
      phoneNo: formData.communicationDetails.phoneNumber1,
      secondaryNo: formData.communicationDetails.phoneNumber2,
      additionalNo: formData.communicationDetails.phoneNumber3,
      email: formData.communicationDetails.email,
      permanentAddress: formData.communicationDetails.permanentAddress,
      localAddress: formData.communicationDetails.localAddress,
      aadhaaCardNo: "", // Could be added to schema if needed
      secondLanguage: formData.previousSchool.secondLanguage,
      parentQualification: "", // Not in schema
      parentOccupation: formData.parentsInfo.guardianOccupation,
      parentIncome: formData.economicProfile.yearlyIncome,
      category: formData.studentDetails.castCategory,
      lastSchool: formData.previousSchool.lastSchool,
      lastClassAttended: formData.previousSchool.lastClassAttended,
      lastSchoolAffiliated: formData.previousSchool.lastSchoolAffiliated,
    };

    console.log("Sending to /add-student-form-details:", data);
    const response = await sendStudentApplicationFormDetails(data);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentApplicationFormDetails:", e);
    return {
      success: false,
      error: e.message || "Failed to submit form details",
    };
  }
};

export const handleStudentApplicationDocument = async (
  studentAppId: string,
  formData: AdditionalFormData
) => {
  try {
    if (!studentAppId)
      return { success: false, error: "Missing student application ID" };

    const data = {
      studentApplicationFormId: studentAppId,
      birthCertificate: formData.documents.birthCertificate,
      transferCertificate: formData.documents.transferCertificate,
      migrationCertificate: formData.documents.migrationCertificate,
      markSheet: formData.documents.markSheet,
      castCategory: null,
      aadhaarCard: formData.documents.aadhaarCard,
      specialAbledCertificate: null,
      parentDocs: formData.documents.residentialProof,
    };

    console.log("Sending to /add-student-application-form-document:", data);
    const response = await sendStudentApplicationDocument(data);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentApplicationDocument:", e);
    return { success: false, error: e.message || "Failed to submit documents" };
  }
};

export const handleStudentParentIncomeDetails = async (
  studentAppId: string,
  formData: AdditionalFormData
) => {
  try {
    if (!studentAppId)
      return { success: false, error: "Missing student application ID" };

    const data = {
      studentApplicationFormId: studentAppId,
      noOfDependentsOfGuardian:
        parseInt(formData.economicProfile.dependentOnGuardian) || 0,
      earningMembersInFamily:
        parseInt(formData.economicProfile.earningMembers) || 0,
      relationWithGuardian: formData.economicProfile.relationWithGuardian,
      annualIncome: formData.economicProfile.yearlyIncome,
      guardianDesignation: formData.economicProfile.designation,
    };

    console.log("Sending to /add-parent-income-details:", data);
    const response = await studentParentIncomeDetails(data);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentParentIncomeDetails:", e);
    return {
      success: false,
      error: e.message || "Failed to submit income details",
    };
  }
};

export const handleStudentApplicationAllId = async (
  allIds: any,
  formData: AdditionalFormData
) => {
  try {
    const school = Cookies.get("school") || "";
    const schoolCode = getSchoolCode(school);
    const yearPrefix = new Date().getFullYear().toString();

    const data = {
      schoolCode: allIds.studentApplication.fullResponse.schoolCode,
      year: allIds.studentApplication.fullResponse.yearPrefix,
      permanentNo: allIds.studentApplication.tempNo,
      studentApplicationFormId: allIds.studentApplication.id,
      studentApplicationFromDetailsId: allIds.studentApplicationFormDetails.id,
      studentApplicationFormDocumnetId: allIds.studentApplicationDocument.id,
      studentApplicationParentIncomeId: allIds.studentParentIncomeDetails.id,
    };
    const dataToSend = { schoolCode, yearPrefix, data };

    console.log("Sending to /student-application-data:", dataToSend);
    const response = await sendAllApplicationId(dataToSend);
    return {
      success: true,
      message: "All IDs processed successfully",
      data: response,
    };
  } catch (e: any) {
    console.error("Error in handleStudentApplicationAllId:", e);
    return { success: false, error: e.message || "Failed to process IDs" };
  }
};

export const handleSubmitStudentApplication = async (
  formData: AdditionalFormData,
  parentId: string // Added parentId parameter
) => {
  try {
    const allIds: any = {
      studentApplication: null,
      studentApplicationFormDetails: null,
      studentApplicationDocument: null,
      studentParentIncomeDetails: null,
    };

    // Step 1: Create student application
    const applicationResult = await handleStudentApplication(
      formData,
      parentId
    );
    if (
      !applicationResult ||
      !applicationResult.data ||
      !applicationResult.data._id
    ) {
      throw new Error("Failed to create student application");
    }
    allIds.studentApplication = {
      id: applicationResult.data._id,
      tempNo: applicationResult.data.tempNo,
      fullResponse: applicationResult.data,
    };
    const studentAppId = applicationResult.data._id;

    // Step 2: Submit form details
    const formDetailsResult = await handleStudentApplicationFormDetails(
      studentAppId,
      formData
    );
    if (!formDetailsResult || !formDetailsResult._id) {
      throw new Error("Failed to submit form details");
    }
    allIds.studentApplicationFormDetails = {
      id: formDetailsResult._id,
      fullResponse: formDetailsResult,
    };

    // Step 3: Submit documents
    const documentResult = await handleStudentApplicationDocument(
      studentAppId,
      formData
    );
    if (
      !documentResult ||
      !documentResult.document ||
      !documentResult.document._id
    ) {
      throw new Error("Failed to submit document information");
    }
    allIds.studentApplicationDocument = {
      id: documentResult.document._id,
      fullResponse: documentResult.document,
    };

    // Step 4: Submit parent income details
    const incomeResult = await handleStudentParentIncomeDetails(
      studentAppId,
      formData
    );
    if (
      !incomeResult ||
      !incomeResult.financialResource ||
      !incomeResult.financialResource._id
    ) {
      throw new Error("Failed to submit parent income details");
    }
    allIds.studentParentIncomeDetails = {
      id: incomeResult.financialResource._id,
      fullResponse: incomeResult.financialResource,
    };

    // Step 5: Save all IDs
    await handleStudentApplicationAllId(allIds, formData);

    return {
      success: true,
      message: "Form submitted successfully!",
      ids: allIds,
    };
  } catch (e: any) {
    console.error("Error in handleSubmitStudentApplication:", e);
    return {
      success: false,
      error: e.message || "An error occurred while submitting the form",
    };
  }
};

// Example usage in a component would be:
// const YourComponent = () => {
//   const router = useRouter();
//   const parentId = router.query.parentId || "67f67143917c79f04bcdbcf8";

//   const handleSubmit = async (formData: AdditionalFormData) => {
//     const result = await handleSubmitStudentApplication(formData, parentId);
//     // Handle result
//   };
// };
