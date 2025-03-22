import axios, { AxiosResponse } from "axios";

// Define the base URL from environment
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Updated ApiResponse interface to match the actual response structure
interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  token?: string;
  requestId?: string;
  // Include user directly at the top level if needed for the verify-otp endpoint
  user?: {
    id: string;
    schoolId: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
  // Keep data field for endpoints that return data in that format
  data?: T;
  status?: number;
  // Add any other common properties here
}

// Generic sendData function with proper typing for the data parameter
const sendData = async <T>(
  endpoint: string,
  data: Record<string, unknown> | FormData,
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

interface LoginOTPRegister extends Record<string, unknown> {
  phoneNumber: string;
}

// Define the expected response data shape for the OTP request
interface LoginOTPResponse {
  requestId: string;
  // Add any other fields from the OTP response
}

export const sendLoginOTPData = async (
  otpData: LoginOTPRegister
): Promise<ApiResponse<LoginOTPResponse>> => {
  return await sendData<LoginOTPResponse>("/send-otp", otpData, false);
};

interface VerifyOTP extends Record<string, unknown> {
  requestId: string;
  otp: number;
  phoneNumber: string;
}

// We don't need a specific VerifyOTPResponse interface
// since the user and token are at the top level of ApiResponse
export const verifyOTP = async (otpData: VerifyOTP): Promise<ApiResponse> => {
  return await sendData("/verify-otp", otpData, false);
};
