import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in environment variables"
  );
}

// Generic API response interface
export interface ApiResponse<T> {
  error: string;
  success?: boolean;
  message?: string;
  data?: T;
  document?: T;
  financialResource?: T;
  fromData?: T;
}

// Input data interfaces
export interface StudentApplicationData {
  schoolCode: number;
  yearPrefix: string;
  data: {
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
  };
}

export interface FormDetailsData {
  studentApplicationFormId: string;
  studentImage: File | null;
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
  secondaryNo: string | null;
  additionalNo: string | null;
  email: string;
  permanentAddress: string;
  localAddress: string;
  aadhaaCardNo: string | null;
  secondLanguage: string;
  parentQualification: string | null;
  parentOccupation: string;
  parentIncome: string | number;
  category: string;
  lastSchool: string | null;
  lastClassAttended: string | null;
  lastSchoolAffiliated: string | null;
}

export interface DocumentData {
  studentApplicationFormId: string;
  birthCertificate: File | null;
  transferCertificate: File | null;
  migrationCertificate: File | null;
  markSheet: File | null;
  castCategory: string | null;
  aadhaarCard: File | null;
  specialAbledCertificate: File | null;
  parentDocs: File | null;
}

export interface IncomeData {
  studentApplicationFormId: string;
  noOfDependentsOfGuardian: number;
  earningMembersInFamily: number;
  relationWithGuardian: string;
  annualIncome: string;
  guardianDesignation: string | null;
}

export interface AllIdsData {
  schoolCode: number;
  yearPrefix: string;
  data: {
    schoolCode: number;
    year: string;
    permanentNo: string;
    studentApplicationFormId: string;
    studentApplicationFromDetailsId: string;
    studentApplicationFormDocumnetId: string;
    studentApplicationParentIncomeId: string;
  };
}

// Response data interfaces
export interface StudentApplicationResponse {
  tempNo: string;
  parentId: string;
  classId: string;
  schoolId: string;
  sessionId: string;
  streamId: string | null;
  modeOfSchooling: string;
  selectAdmissionSession: string;
  name: string;
  gender: string;
  dob: string;
  lastSchoolAffiliatedBoard: string | null;
  lastClassAttended: string | null;
  lastSchoolAttended: string | null;
  age: number;
  formStatus: string;
  isOffline: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FormDetailsResponse {
  studentApplicationFormId: string;
  studentApplicationPaymentDetailsId: string | null;
  studentImage: string | null;
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
  secondaryNo: string | null;
  additionalNo: string | null;
  email: string;
  permanentAddress: string;
  localAddress: string;
  aadhaaCardNo: string | null;
  secondLanguage: string;
  parentQualification: string | null;
  parentOccupation: string;
  parentIncome: number | string;
  category: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DocumentResponse {
  studentApplicationFormId: string;
  birthCertificate: string | null;
  transferCertificate: string | null;
  migrationCertificate: string | null;
  markSheet: string | null;
  castCategory: string | null;
  aadhaarCard: string | null;
  specialAbledCertificate: string | null;
  parentDocs: string | null;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IncomeResponse {
  studentApplicationFormId: string;
  relationWithGuardian: string;
  annualIncome: string;
  guardianDesignation: string | null;
  noOfDependentsOfGuardian: number;
  earningMembersInFamily: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AllIdsResponse {
  permanentNo: string;
  studentApplicationFormId: string;
  studentApplicationFromDetailsId: string;
  studentApplicationFormDocumnetId: string;
  studentApplicationParentIncomeId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const sendData = async <T>(
  endpoint: string,
  data: FormData | object,
  isMultipart: boolean = false
): Promise<ApiResponse<T>> => {
  try {
    const token = Cookies.get("authToken");
    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const config = {
      headers: {
        "Content-Type": isMultipart
          ? "multipart/form-data"
          : "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${BASE_URL}${endpoint}`, data, config);
    return response.data as ApiResponse<T>;
  } catch (error: unknown) {
    let message: string;
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Unknown error occurred during API request";
    }
    console.error(`Error posting to ${endpoint}:`, message);
    throw new Error(`Error posting to ${endpoint}: ${message}`);
  }
};

export const sendStudentApplicationJSON = async (
  postData: StudentApplicationData
): Promise<ApiResponse<StudentApplicationResponse>> => {
  return await sendData<StudentApplicationResponse>(
    "/add-student-application",
    postData
  );
};

export const sendStudentApplicationFormDetails = async (
  postData: FormDetailsData
): Promise<ApiResponse<FormDetailsResponse>> => {
  const formData = new FormData();
  Object.entries(postData).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      formData.append(key, "");
    } else if (value instanceof File) {
      if (value.size > 0) {
        formData.append(key, value);
      } else {
        formData.append(key, "");
      }
    } else {
      formData.append(key, String(value));
    }
  });
  return await sendData<FormDetailsResponse>(
    "/add-student-form-details",
    formData,
    true
  );
};

export const sendStudentApplicationDocument = async (
  postData: DocumentData
): Promise<ApiResponse<DocumentResponse>> => {
  const formData = new FormData();
  Object.entries(postData).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      formData.append(key, "");
    } else if (value instanceof File) {
      if (value.size > 0) {
        formData.append(key, value);
      } else {
        formData.append(key, "");
      }
    } else {
      formData.append(key, String(value));
    }
  });
  return await sendData<DocumentResponse>(
    "/add-student-application-form-document",
    formData,
    true
  );
};

export const studentParentIncomeDetails = async (
  postData: IncomeData
): Promise<ApiResponse<IncomeResponse>> => {
  return await sendData<IncomeResponse>("/add-parent-income-details", postData);
};

export const sendAllApplicationId = async (
  postData: AllIdsData
): Promise<ApiResponse<AllIdsResponse>> => {
  return await sendData<AllIdsResponse>("/student-application-data", postData);
};
