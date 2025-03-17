import axios, { AxiosResponse } from "axios";

// Define the base URL from environment
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Generic ApiResponse interface with a default type of unknown (safer than any)
interface ApiResponse<T = unknown> {
  token(
    arg0: string,
    token: string,
    arg2: { expires: number; secure: true; sameSite: "strict" }
  ): unknown;
  requestId(requestId: string): unknown;
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

// Generic sendData function with proper typing for the data parameter
const sendData = async <T>(
  endpoint: string,
  data: Record<string, unknown> | FormData, // Replace 'any' with a more specific type
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

// Define the expected response data shape for EnquiryRegister
interface LoginOTPResponse {
  enquiryId?: string;
  requestId: string;
  [key: string]: unknown;
}

export const sendLoginOTPData = async (
  enquiryData: LoginOTPRegister
): Promise<ApiResponse<LoginOTPResponse>> => {
  return await sendData<LoginOTPResponse>("/send-otp", enquiryData, false);
};

interface VerifyOTP extends Record<string, unknown> {
  requestId: string;
  otp: number;
  phoneNumber: string;
  [key: string]: unknown;
}

interface VerifyOTPResponse {
  success: boolean;
  message: string;
  token: string;
}
export const verifyOTP = async (
  otpData: VerifyOTP
): Promise<ApiResponse<VerifyOTPResponse>> => {
  return await sendData<VerifyOTPResponse>("/verify-otp", otpData, false);
};
