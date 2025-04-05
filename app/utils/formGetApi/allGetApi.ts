import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Generic function for API calls
const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const token = Cookies.get("authToken");

    const response: AxiosResponse<T> = await axios.get(
      `${BASE_URL}${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching from ${endpoint}: ${error.message}`);
    }
    throw new Error(`Error fetching from ${endpoint}: Unknown error`);
  }
};

// Define a type for class options response
interface ClassOption {
  _id: string;
  className: string;
}

interface SchoolOption {
  _id: string;
  schoolName: string;
}

interface SessionOptions {
  success: boolean;
  message: string;
  sessions: {
    _id: string;
    session: string;
    createdAt?: string; // Optional fields from response
    updatedAt?: string;
    __v?: number;
  }[];
}

// Function to fetch class options with proper typing
export const fetchClassOptions = async (): Promise<ClassOption[]> => {
  return fetchData<ClassOption[]>("/class");
};

export const fetchSchoolOptions = async (): Promise<SchoolOption[]> => {
  return fetchData<SchoolOption[]>("/school");
};

// Fixed: Return a single SessionOptions object, not an array
export const fetchSessionOptions = async (): Promise<SessionOptions> => {
  return fetchData<SessionOptions>("/session");
};
remove the auth from header and just make it normal wihtou authToken
