import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

// Interface for common application fields (based on your API response)
interface ApplicationData {
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

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export const updateStudentApplication = async (
  applicationId: string,
  data: ApplicationData | FormData 
): Promise<ApiResponse> => {
  try {
    if (!applicationId) {
      throw new Error("Application ID is required");
    }
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      throw new Error("Please log in to continue");
    }

    const isFormData = data instanceof FormData;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };

    const response = await axios.put<ApiResponse>(
      `${API_URL}/update-student-application/${applicationId}`,
      data,
      { headers }
    );

    return response.data;
  } catch (error) {
    let errorMessage = "Failed to update application";
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        errorMessage = "Session expired. Please log in again.";
      } else if (status === 400) {
        errorMessage = error.response?.data?.message || "Invalid data provided";
      } else if (status === 404) {
        errorMessage = "Application not found";
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error updating student application:", error);
    throw new Error(errorMessage);
  }
};
