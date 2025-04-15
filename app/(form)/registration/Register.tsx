"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "@/app/lib/validations/registerSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import AdmissionClass from "./ui/AdmissionClass";
import StudentDetails from "./ui/StudentDetails";
import PreviousAcademic from "./ui/PreviousAcademic";
import DownloadPDFButton from "./DownloadPDFButton";
import { sendStudentApplicationJSON } from "@/app/utils/studentForm/studentPost";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

interface RegisterProps {
  onNext: () => void;
  schoolCode?: number;
  yearPrefix?: string;
  userId: string;
}

const Register = ({
  onNext,
  schoolCode = 1234,
  yearPrefix = "2025",
  userId,
}: RegisterProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<RegisterFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit } = useFormContext<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
    const formattedData = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
    };
    setFormData(formattedData);

    // Save to localStorage
    try {
      localStorage.setItem("registerFormData", JSON.stringify(formattedData));
      console.log("Form data saved to localStorage:", formattedData);
    } catch (error) {
      console.error("Failed to save form data to localStorage:", error);
    }

    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    let response: any = null;

    try {
      const applicationData = {
        schoolCode,
        yearPrefix,
        data: {
          parentId: userId,
          classId: formData.admissionClass,
          sessionId: formData.admissionSession,
          schoolId: formData.admissionSchool,
          modeOfSchooling: formData.schoolingMode,
          selectAdmissionSession: formData.admissionSession,
          name: formData.name,
          gender: formData.gender || "Male",
          lastClassAttended: formData.lastClassAttended || null,
          lastSchoolAttended: formData.lastSchoolName || null,
          dob: formData.dateOfBirth,
          lastSchoolAffiliatedBoard: formData.lastSchoolAffiliated || null,
          category: formData.castCategory || "General",
          age:
            typeof formData.age === "string"
              ? parseInt(formData.age, 10)
              : formData.age || 18,
        },
      };

      response = await sendStudentApplicationJSON(applicationData);

      if (response?.data?._id) {
        // Update localStorage with response data
        const updatedFormData = {
          ...formData,
          applicationId: response.data._id,
          tempNo: response.data.tempNo,
          parentId: response.data.parentId,
          classId: response.data.classId,
          schoolId: response.data.schoolId,
          sessionId: response.data.sessionId,
        };

        try {
          localStorage.setItem("registerFormData", JSON.stringify(updatedFormData));
          console.log("Updated form data with response saved to localStorage:", updatedFormData);
        } catch (error) {
          console.error("Failed to update localStorage with response data:", error);
        }

        toast({
          description:
            response.message || "Application submitted successfully!",
          variant: "success",
        });
        setShowConfirmDialog(false);
        onNext(); // Move to Payment step
      } else {
        throw new Error(response?.message || "No application ID returned");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit application";
      console.error("Register error:", message);
      toast({
        description: message,
        variant: "destructive",
      });
      onNext();
    } finally {
      setIsSubmitting(false);

      if (response?.data) {
        const ids = {
          applicationId: response.data._id,
          tempNo: response.data.tempNo,
          parentId: response.data.parentId,
          classId: response.data.classId,
          schoolId: response.data.schoolId,
          sessionId: response.data.sessionId,
        };
        Object.entries(ids).forEach(([key, value]) => {
          if (value) {
            Cookies.set(key, value, { expires: 7 });
          }
        });
        console.log("Stored IDs in cookies (finally):", ids);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AdmissionClass />
        <StudentDetails />
        <PreviousAcademic />
        <div className="flex gap-4">
          <Button
            type="submit"
            className="bg-[#789336] flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save & Continue"}
          </Button>
          <DownloadPDFButton formData={formData} />
        </div>
      </form>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>Confirm Registration Details</DialogTitle>
          </DialogHeader>
          <div id="dialog-description" className="py-4">
            Please confirm that all registration details are correct.
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
            >
              Review
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-[#789336]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
