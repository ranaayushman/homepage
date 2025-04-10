"use client";

import Cookies from "js-cookie";
import {
  sendAllApplicationId,
  sendStudentApplicationDocument,
  sendStudentApplicationFormDetails,
  sendStudentApplicationJSON,
  studentParentIncomeDetails,
} from "@/app/utils/studentForm/studentPost";
import { AdditionalFormData } from "@/app/lib/validations/additionalSchema";

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
  formData: AdditionalFormData
) => {
  try {
    const schoolId = Cookies.get("schoolId") || "";
    const school = Cookies.get("school") || "";
    const schoolCode = getSchoolCode(school);
    const yearPrefix = new Date().getFullYear().toString();
    const parentId = Cookies.get("applicationId");
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
      onlyGirlChild: false, // Not in schema, kept for compatibility
      height: extractNumeric(formData.studentOtherInfo.height),
      weight: extractNumeric(formData.studentOtherInfo.weight),
      speciallyAbled: convertToBoolean(formData.studentDetails.speciallyAbled),
      fatherName: formData.parentsInfo.guardianName, // Assuming guardian is father
      fatherResidentalAddress: formData.parentsInfo.guardianResidentialAddress,
      motherName: formData.parentsInfo.motherName,
      motherResidentalAddress: formData.parentsInfo.motherResidentialAddress,
      fatherOccupation: formData.parentsInfo.guardianOccupation,
      motherOccupation: formData.parentsInfo.motherOccupation,
      phoneNo: formData.communicationDetails.phoneNumber1,
      secondaryNo: formData.communicationDetails.phoneNumber2 || "",
      additionalNo: formData.communicationDetails.phoneNumber3 || "",
      email: formData.communicationDetails.email,
      permanentAddress: formData.communicationDetails.permanentAddress,
      localAddress: formData.communicationDetails.localAddress,
      aadhaaCardNo: "", // Not directly in schema, could use aadhaarCard file if needed
      secondLanguage: formData.previousSchool.secondLanguage,
      parentQualification: "", // Not in schema, adjust if needed
      parentOccupation: formData.parentsInfo.guardianOccupation,
      parentIncome: formData.economicProfile.yearlyIncome,
      category: formData.studentDetails.category,
    };

    console.log("Sending to /add-student-form-details:", data);
    const response = await sendStudentApplicationFormDetails(data);
    console.log("Response from /add-student-form-details:", response);
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
      castCategory: null, // Could map to a file if added to schema
      aadhaarCard: formData.documents.aadhaarCard,
      specialAbledCertificate: null, // Could add to schema if needed
      parentDocs: formData.documents.residentialProof,
    };

    console.log("Sending to /add-student-application-form-document:", data);
    const response = await sendStudentApplicationDocument(data);
    console.log(
      "Response from /add-student-application-form-document:",
      response
    );
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
    console.log("Response from /add-parent-income-details:", response);
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
    console.log("Response from /student-application-data:", response);
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
  formData: AdditionalFormData
) => {
  try {
    console.log(
      "handleSubmitStudentApplication called with formData:",
      formData
    );

    const allIds: any = {
      studentApplication: null,
      studentApplicationFormDetails: null,
      studentApplicationDocument: null,
      studentParentIncomeDetails: null,
    };

    // Step 1: Create student application
    console.log("Step 1: Calling handleStudentApplication");
    const applicationResult = await handleStudentApplication(formData);
    console.log("Step 1 result:", applicationResult);
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
    console.log("Step 2: Calling handleStudentApplicationFormDetails");
    const formDetailsResult = await handleStudentApplicationFormDetails(
      studentAppId,
      formData
    );
    console.log("Step 2 result:", formDetailsResult);
    if (!formDetailsResult || !formDetailsResult._id) {
      throw new Error("Failed to submit form details");
    }
    allIds.studentApplicationFormDetails = {
      id: formDetailsResult._id,
      fullResponse: formDetailsResult,
    };

    // Step 3: Submit documents
    console.log("Step 3: Calling handleStudentApplicationDocument");
    const documentResult = await handleStudentApplicationDocument(
      studentAppId,
      formData
    );
    console.log("Step 3 result:", documentResult);
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
    console.log("Step 4: Calling handleStudentParentIncomeDetails");
    const incomeResult = await handleStudentParentIncomeDetails(
      studentAppId,
      formData
    );
    console.log("Step 4 result:", incomeResult);
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
    console.log("Step 5: Calling handleStudentApplicationAllId");
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
