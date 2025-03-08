import axios, { AxiosResponse } from "axios";

// Define the base URL from environment
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

const sendData = async <T = any>(
  endpoint: string,
  data: any,
  isMultipart: boolean = false
): Promise<ApiResponse<T>> => {
  try {
    const config = {
      headers: {
        "Content-Type": isMultipart
          ? "multipart/form-data"
          : "application/json",
      },
    };

    // Log request details for debugging
    console.log(`Sending request to ${BASE_URL}${endpoint}`, {
      data,
      headers: config.headers,
    });

    const response: AxiosResponse<ApiResponse<T>> = await axios.post(
      `${BASE_URL}${endpoint}`,
      data,
      config
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      const status = error.response?.status || "No status";
      console.error(`Error posting to ${endpoint}:`, {
        message: errorMessage,
        status,
        responseData: error.response?.data,
        requestData: data,
      });
      throw new Error(
        `Error posting to ${endpoint}: ${errorMessage} (Status: ${status})`
      );
    } else {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`Unexpected error posting to ${endpoint}:`, {
        message: errorMessage,
        error,
        requestData: data,
      });
      throw new Error(
        `Unexpected error posting to ${endpoint}: ${errorMessage}`
      );
    }
  }
};

interface EnquiryRegister {
  name: string;
  phoneNumber: string;
  schoolId: string;
  email: string;
  pincode: string;
  roleId: string;
}

export const sendEnquiryData = async (
  enquiryData: EnquiryRegister
): Promise<ApiResponse> => {
  return await sendData("/parent-enquiry", enquiryData, false);
};

// Example usage
export const handleEnquirySubmit = async (enquiryData: EnquiryRegister) => {
  try {
    const response = await sendEnquiryData(enquiryData);
    console.log("Enquiry submitted successfully:", response);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to submit enquiry:", error.message);
    } else {
      console.error("Failed to submit enquiry:", error);
    }
    throw error;
  }
};
