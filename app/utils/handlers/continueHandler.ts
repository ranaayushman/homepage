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
import { updateStudentApplication } from "../studentForm/studentUpdateAPi";

interface StudentApplicationPayload {
  parentId: string;
  classId: string;
  sessionId: string;
  schoolId: string;
  modeOfSchooling: string;
  selectAdmissionSession: string;
  name: string;
  gender: string;
  dob: string;
  category: string;
  age: number;
}

interface StudentFormDetailsPayload {
  studentApplicationFormId: string;
  studentImage: any;
  religion: string;
  bloodGroup: string;
  motherTongue: string;
  onlyChild: boolean;
  onlyGirlChild: boolean;
  height: number | null;
  weight: number | null;
  speciallyAbled: boolean;
  fatherName: string;
  fatherResidentalAddress: string;
  motherName: string;
  motherResidentalAddress: string;
  fatherOccupation: string;
  motherOccupation: string;
  phoneNo: string;
  secondaryNo: string;
  additionalNo: string;
  email: string;
  permanentAddress: string;
  localAddress: string;
  aadhaaCardNo: string;
  secondLanguage: string;
  parentQualification: string;
  parentOccupation: string;
  parentIncome: string;
  category: string;
  lastSchool: string;
  lastClassAttended: string;
  lastSchoolAffiliated: string;
}

interface DocumentData {
  studentApplicationFormId: string;
  birthCertificate: File;
  transferCertificate: File;
  migrationCertificate: File;
  markSheet: File;
  castCategory: File | null;
  aadhaarCard: File;
  specialAbledCertificate: File | null;
  parentDocs: File;
}

interface ParentIncomePayload {
  studentApplicationFormId: string;
  noOfDependentsOfGuardian: number;
  earningMembersInFamily: number;
  relationWithGuardian: string;
  annualIncome: string;
  guardianDesignation: string;
}

interface AllIds {
  studentApplication: {
    id: string;
    tempNo: string;
    fullResponse: { schoolCode: number; yearPrefix: string };
  };
  studentApplicationFormDetails: {
    id: string;
    fullResponse: any;
  };
  studentApplicationDocument: {
    id: string;
    fullResponse: any;
  };
  studentParentIncomeDetails: {
    id: string;
    fullResponse: any;
  };
}

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
  parentId: string,
  applicationId: string
): Promise<any> => {
  try {
    const schoolId = Cookies.get("schoolId") || "";
    const school = Cookies.get("school") || "";
    const schoolCode = getSchoolCode(school);
    const yearPrefix = new Date().getFullYear().toString();

    if (!parentId) throw new Error("Parent ID is missing");
    if (!applicationId) throw new Error("Application ID is missing");

    const data: StudentApplicationPayload = {
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

    console.log(
      "Updating /add-student-application with ID:",
      applicationId,
      dataToSend
    );
    return await updateStudentApplication(applicationId, dataToSend);
  } catch (e: any) {
    console.error("Error in handleStudentApplication:", e);
    return {
      success: false,
      error: e.message || "Failed to update student application",
    };
  }
};

export const handleStudentApplicationFormDetails = async (
  applicationId: string,
  formData: AdditionalFormData
): Promise<any> => {
  try {
    if (!applicationId)
      return { success: false, error: "Missing application ID" };

    const convertToBoolean = (value: string) => value === "true";
    const extractNumeric = (value: string | undefined | null) => {
      if (!value || value === "null") return null;
      const matches = value.match(/^(\d+(\.\d+)?)/) || [];
      return matches[1] ? parseFloat(matches[1]) : null;
    };

    const data: StudentFormDetailsPayload = {
      studentApplicationFormId: applicationId,
      studentImage: formData.studentDetails.profilePic || null,
      religion: formData.studentOtherInfo.religion,
      bloodGroup: formData.studentOtherInfo.bloodGroup,
      motherTongue: formData.studentOtherInfo.motherTongue,
      onlyChild: convertToBoolean(
        formData.studentDetails.isSingleChild?.toString() || ""
      ),
      onlyGirlChild: convertToBoolean(formData.studentDetails.isOnlyGirlChild),
      height: extractNumeric(formData.studentOtherInfo.height?.toString()),
      weight: extractNumeric(formData.studentOtherInfo.weight?.toString()),
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
      aadhaaCardNo: "",
      secondLanguage: formData.previousSchool.secondLanguage,
      parentQualification: "",
      parentOccupation: formData.parentsInfo.guardianOccupation,
      parentIncome: formData.economicProfile.yearlyIncome,
      category: formData.studentDetails.castCategory,
      lastSchool: formData.previousSchool.lastSchool,
      lastClassAttended: formData.previousSchool.lastClassAttended,
      lastSchoolAffiliated: formData.previousSchool.lastSchoolAffiliated,
    };

    console.log("Sending to /add-student-form-details:", data);
    return await sendStudentApplicationFormDetails(data);
  } catch (e: any) {
    console.error("Error in handleStudentApplicationFormDetails:", e);
    return {
      success: false,
      error: e.message || "Failed to submit form details",
    };
  }
};

export const handleStudentApplicationDocument = async (
  applicationId: string,
  formData: AdditionalFormData
): Promise<any> => {
  try {
    if (!applicationId)
      return { success: false, error: "Missing application ID" };

    const data: DocumentData = {
      studentApplicationFormId: applicationId,
      birthCertificate: formData.documents.birthCertificate || new File([], ""),
      transferCertificate:
        formData.documents.transferCertificate || new File([], ""),
      migrationCertificate:
        formData.documents.migrationCertificate || new File([], ""),
      markSheet: formData.documents.markSheet || new File([], ""),
      castCategory: null,
      aadhaarCard: formData.documents.aadhaarCard || new File([], ""),
      specialAbledCertificate: null,
      parentDocs: formData.documents.residentialProof || new File([], ""),
    };

    console.log("Sending to /add-student-application-form-document:", data);
    const response = await sendStudentApplicationDocument(data);
    return response;
  } catch (e: any) {
    console.error("Error in handleStudentApplicationDocument:", e);
    return {
      success: false,
      error: e.message || "Failed to submit documents",
    };
  }
};

export const handleStudentParentIncomeDetails = async (
  applicationId: string,
  formData: AdditionalFormData
): Promise<any> => {
  try {
    if (!applicationId)
      return { success: false, error: "Missing application ID" };

    const data: ParentIncomePayload = {
      studentApplicationFormId: applicationId,
      noOfDependentsOfGuardian:
        parseInt(formData.economicProfile.dependentOnGuardian) || 0,
      earningMembersInFamily:
        parseInt(formData.economicProfile.earningMembers) || 0,
      relationWithGuardian: formData.economicProfile.relationWithGuardian,
      annualIncome: formData.economicProfile.yearlyIncome,
      guardianDesignation: formData.economicProfile.designation,
    };

    console.log("Sending to /add-parent-income-details:", data);
    return await studentParentIncomeDetails(data);
  } catch (e: any) {
    console.error("Error in handleStudentParentIncomeDetails:", e);
    return {
      success: false,
      error: e.message || "Failed to submit income details",
    };
  }
};

export const handleStudentApplicationAllId = async (
  allIds: AllIds,
  formData: AdditionalFormData
): Promise<any> => {
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
  parentId: string,
  applicationId: string
): Promise<any> => {
  try {
    const allIds: AllIds = {
      studentApplication: null as any,
      studentApplicationFormDetails: null as any,
      studentApplicationDocument: null as any,
      studentParentIncomeDetails: null as any,
    };

    // Update the student application using the provided applicationId
    const applicationResult = await handleStudentApplication(
      formData,
      parentId,
      applicationId
    );
    if (!applicationResult?.data?._id)
      throw new Error("Failed to update student application");

    allIds.studentApplication = {
      id: applicationResult.data._id,
      tempNo: applicationResult.data.tempNo,
      fullResponse: applicationResult.data,
    };

    // Use applicationId as studentApplicationFormId for form details
    const formDetailsResult = await handleStudentApplicationFormDetails(
      applicationId,
      formData
    );
    if (!formDetailsResult?._id)
      throw new Error("Failed to submit form details");
    allIds.studentApplicationFormDetails = {
      id: formDetailsResult._id,
      fullResponse: formDetailsResult,
    };

    // Use applicationId as studentApplicationFormId for documents
    const documentResult = await handleStudentApplicationDocument(
      applicationId,
      formData
    );
    if (!documentResult?.document?._id)
      throw new Error("Failed to submit document information");
    allIds.studentApplicationDocument = {
      id: documentResult.document._id,
      fullResponse: documentResult.document,
    };

    // Use applicationId as studentApplicationFormId for income details
    const incomeResult = await handleStudentParentIncomeDetails(
      applicationId,
      formData
    );
    if (!incomeResult?.financialResource?._id)
      throw new Error("Failed to submit parent income details");
    allIds.studentParentIncomeDetails = {
      id: incomeResult.financialResource._id,
      fullResponse: incomeResult.financialResource,
    };

    // Process all IDs
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
