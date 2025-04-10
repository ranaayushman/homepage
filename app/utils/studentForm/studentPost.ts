import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse {
  [key: string]: any;
}

const sendData = async (endpoint: string, data: any, isMultipart: boolean = false): Promise<ApiResponse> => {
  try {
    const token = Cookies.get("authToken");
    const config = {
      headers: {
        "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, config);
    return response.data;
  } catch (error: any) {
    console.error(`Error posting to ${endpoint}:`, error.response?.data || error.message);
    throw new Error(`Error posting to ${endpoint}: ${error.message}`);
  }
};

export const sendStudentApplicationJSON = async (postData: any): Promise<ApiResponse> => {
  return await sendData("/add-student-application", postData);
};

export const sendStudentApplicationFormDetails = async (postData: any): Promise<ApiResponse> => {
  const formData = new FormData();
  Object.keys(postData).forEach((key) => {
    if (typeof postData[key] === "object" && postData[key] !== null && !(postData[key] instanceof File)) {
      if (typeof postData[key] === "string") {
        formData.append(key, postData[key]);
      } else {
        formData.append(key, JSON.stringify(postData[key]));
      }
    } else {
      formData.append(key, postData[key]);
    }
  });
  return await sendData("/add-student-form-details", formData, true);
};

export const sendStudentApplicationDocument = async (postData: any): Promise<ApiResponse> => {
  const formData = new FormData();
  Object.keys(postData).forEach((key) => {
    formData.append(key, postData[key]);
  });
  return await sendData("/add-student-application-form-document", formData, true);
};

export const studentParentIncomeDetails = async (postData: any): Promise<ApiResponse> => {
  return await sendData("/add-parent-income-details", postData);
};

export const sendAllApplicationId = async (postData: any): Promise<ApiResponse> => {
  return await sendData("/student-application-data", postData);
};