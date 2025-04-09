"use client";

import { useState, useEffect } from "react";
import {
  fetchClassOptions,
  fetchSessionOptions,
  fetchSchoolOptions,
} from "@/app/utils/formGetApi/allGetApi";

// Define the option type
interface Option {
  key: string;
  label: string;
  value: string;
}

// Original hook for authenticated calls (unchanged)
export const useFormOptions = () => {
  const [classOptions, setClassOptions] = useState<Option[]>([]);
  const [sessionOptions, setSessionOptions] = useState<Option[]>([]);
  const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);
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

        // Fetch session options (with auth)
        const sessionData = await fetchSessionOptions({ requireAuth: false });
        const sessions = sessionData.sessions.map((item) => ({
          key: item._id,
          label: item.session,
          value: item._id,
        }));
        setSessionOptions(sessions);

        // Fetch school options (with auth)
        const schoolData = await fetchSchoolOptions({ requireAuth: false });
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

// New hook for public school and session options (no auth)
export const usePublicFormOptions = () => {
  const [sessionOptions, setSessionOptions] = useState<Option[]>([]);
  const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch session options (no auth)
        const sessionData = await fetchSessionOptions({ requireAuth: false });
        const sessions = sessionData.sessions.map((item) => ({
          key: item._id,
          label: item.session,
          value: item._id,
        }));
        setSessionOptions(sessions);

        // Fetch school options (no auth)
        const schoolData = await fetchSchoolOptions({ requireAuth: false });
        const schools = schoolData.map((item) => ({
          key: item._id,
          label: item.schoolName,
          value: item._id,
        }));
        setSchoolOptions(schools);
      } catch (e) {
        console.error("Error fetching public form options:", e);
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    };

    fetchData();
  }, []);

  return { sessionOptions, schoolOptions, error };
};
