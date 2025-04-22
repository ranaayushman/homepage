import axios, { AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  token?: string;
  requestId?: string;
  user?: {
    id: string;
    name: string;
    schoolId: {
      _id: string;
      schoolName: string;
    };
    schoolName: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
  data?: T;
  status?: number;
}

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

interface LoginOTPResponse {
  requestId: string;
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

export const verifyOTP = async (otpData: VerifyOTP): Promise<ApiResponse> => {
  return await sendData("/verify-otp", otpData, false);
};
