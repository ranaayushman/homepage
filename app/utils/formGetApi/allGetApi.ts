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
  _id: number;
  className: string;
}
interface SchoolOption {
  _id: number;
  schoolName: string;
}

// Function to fetch class options with proper typing
export const fetchClassOptions = async (): Promise<ClassOption[]> => {
  return fetchData<ClassOption[]>("/class");
};
export const fetchSchoolOptions = async (): Promise<SchoolOption[]> => {
  return fetchData<SchoolOption[]>("/school");
};
