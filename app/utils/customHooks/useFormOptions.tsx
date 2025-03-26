"use client";

import { useState, useEffect } from "react";
import {
  fetchClassOptions,
  fetchSessionOptions,
  fetchSchoolOptions, // Added school options fetch
} from "@/app/utils/formGetApi/allGetApi";

// Define the option type
interface Option {
  key: string;
  label: string;
  value: string;
}

export const useFormOptions = () => {
  const [classOptions, setClassOptions] = useState<Option[]>([]);
  const [sessionOptions, setSessionOptions] = useState<Option[]>([]);
  const [schoolOptions, setSchoolOptions] = useState<Option[]>([]); // Added school options
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch class options
        const classData = await fetchClassOptions();
        const classes = classData.map((item) => ({
          key: item._id,
          label: item.className,
          value: item._id,
        }));
        setClassOptions(classes);

        // Fetch session options
        const sessionData = await fetchSessionOptions();
        const sessions = sessionData.sessions.map((item) => ({
          key: item._id,
          label: item.session,
          value: item._id,
        }));
        setSessionOptions(sessions);

        // Fetch school options
        const schoolData = await fetchSchoolOptions();
        const schools = schoolData.map((item) => ({
          key: item._id,
          label: item.schoolName,
          value: item._id,
        }));
        setSchoolOptions(schools);
      } catch (e) {
        console.error("Error fetching form options:", e);
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    };

    fetchData();
  }, []);

  return { classOptions, sessionOptions, schoolOptions, error };
};
