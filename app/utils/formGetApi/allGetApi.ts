import axios, { AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Generic function for API calls (no auth token now)
const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching from ${endpoint}: ${error.message}`);
    }
    throw new Error(`Error fetching from ${endpoint}: Unknown error`);
  }
};

// Define a type for class options response


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
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }[];
}

// Function to fetch class options with proper typing


export const fetchSchoolOptions = async (): Promise<SchoolOption[]> => {
  return fetchData<SchoolOption[]>("/school");
};

export const fetchSessionOptions = async (): Promise<SessionOptions> => {
  return fetchData<SessionOptions>("/session");
};
