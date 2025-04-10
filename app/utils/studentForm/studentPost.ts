import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface SendDataOptions {
  endpoint: string;
  data: any;
  isMultipart?: boolean;
}

// Define a basic response type
interface ApiResponse {
  [key: string]: any;
}

// Define post data types
interface StudentFormDetailsData {
  studentApplicationFormId: string;
  studentImage?: File | null;
  religion?: string;
  bloodGroup?: string;
  motherTongue?: string;
  onlyChild?: boolean;
  onlyGirlChild?: boolean;
  height?: number | null;
  weight?: number | null;
  speciallyAbled?: boolean;
  fatherName?: string;
  fatherResidentalAddress?: string;
  motherName?: string;
  motherResidentalAddress?: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  phoneNo?: string;
  secondaryNo?: string;
  additionalNo?: string;
  email?: string;
  permanentAddress?: string;
  localAddress?: string;
  aadhaaCardNo?: string;
  secondLanguage?: string;
  parentQualification?: string;
  parentOccupation?: string;
  parentIncome?: string;
  category?: string;
  [key: string]: any; // To allow for additional properties
}

interface StudentApplicationData {
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
    [key: string]: any; // To allow for additional properties
  };
}

interface DocumentData {
  studentApplicationFormId: string;
  birthCertificate?: File | null;
  transferCertificate?: File | null;
  migrationCertificate?: File | null;
  markSheet?: File | null;
  castCategory?: File | null;
  aadhaarCard?: File | null;
  specialAbledCertificate?: File | null;
  parentDocs?: File | null;
  [key: string]: any; // To allow for additional properties
}

interface ParentIncomeData {
  studentApplicationFormId: string;
  noOfDependentsOfGuardian?: number;
  earningMembersInFamily?: number;
  relationWithGuardian?: string;
  annualIncome?: string;
  guardianDesignation?: string;
  [key: string]: any; // To allow for additional properties
}

interface AllApplicationIdData {
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
    [key: string]: any; // To allow for additional properties
  };
}

interface EnquiryData {
  [key: string]: any;
}

const sendData = async ({ endpoint, data, isMultipart = false }: SendDataOptions): Promise<ApiResponse> => {
  try {
    // Retrieve the token, id, and role from cookies
    const token = Cookies.get("authToken");
    const userId = Cookies.get("userId");
    const userRole = Cookies.get("userRole");
    const schoolId = Cookies.get("schoolId");

    // Headers
    const config = {
      headers: {
        "Content-Type": isMultipart
          ? "multipart/form-data"
          : "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        // Uncomment if needed:
        // ...(userId && { "User-ID": userId }),
        // ...(userRole && { "User-Role": userRole }),
        // ...(schoolId && {"School-ID": schoolId})
      },
    };

    const response = await axios.post(`${BASE_URL}${endpoint}`, data, config);
    return response.data;
  } catch (error: any) {
    console.error(
      `Error posting to ${endpoint}: ${error.response?.data || error.message}`
    );
    throw new Error(`Error posting to ${endpoint}: ${error.message}`);
  }
};

export const sendStudentApplicationFormDetails = async (postData: StudentFormDetailsData): Promise<ApiResponse> => {
  const formData = new FormData();

  Object.keys(postData).forEach((key) => {
    // Handle arrays and objects by converting them to JSON strings
    if (
      typeof postData[key] === "object" &&
      postData[key] !== null &&
      !(postData[key] instanceof File)
    ) {
      // Skip if the value is already a string (we already stringified it)
      if (typeof postData[key] === "string") {
        formData.append(key, postData[key]);
      } else {
        formData.append(key, JSON.stringify(postData[key]));
      }
    } else {
      formData.append(key, postData[key]);
    }
  });

  return await sendData({
    endpoint: "/add-student-form-details",
    data: formData,
    isMultipart: true
  });
};

export const sendStudentApplicationJSON = async (postData: StudentApplicationData): Promise<ApiResponse> => {
  return await sendData({
    endpoint: "/add-student-application",
    data: postData
  });
};

export const sendStudentApplicationDocument = async (postData: DocumentData): Promise<ApiResponse> => {
  const formData = new FormData();

  Object.keys(postData).forEach((key) => {
    formData.append(key, postData[key]);
  });

  return await sendData({
    endpoint: "/add-student-application-form-document",
    data: formData,
    isMultipart: true
  });
};

export const studentFormDetails = async (postData: StudentFormDetailsData): Promise<ApiResponse> => {
  return await sendData({
    endpoint: "/add-student-form-details",
    data: postData
  });
};

export const studentParentIncomeDetails = async (postData: ParentIncomeData): Promise<ApiResponse> => {
  return await sendData({
    endpoint: "/add-parent-income-details",
    data: postData
  });
};

export const sendAllApplicationId = async (postData: AllApplicationIdData): Promise<ApiResponse> => {
  return await sendData({
    endpoint: "/student-application-data",
    data: postData
  });
};

export const sendEnquiryData = async (postData: EnquiryData): Promise<ApiResponse> => {
  return await sendData({
    endpoint: "/parent-enquiry",
    data: postData
  });
};