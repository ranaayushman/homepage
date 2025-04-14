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
import { sendStudentApplicationJSON } from "@/app/utils/studentForm/studentPost"; // Adjust path
import { toast } from "@/hooks/use-toast"; // For notifications
import Cookies from "js-cookie";

interface RegisterProps {
  onNext: (applicationId: string) => void; // Updated to accept applicationId
  schoolCode?: number; // Optional prop for schoolCode
  yearPrefix?: string; // Optional prop for yearPrefix
}

const Register = ({
  onNext,
  schoolCode = 1234,
  yearPrefix = "2025",
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
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      // Map formData to StudentApplicationData
      const parentId = Cookies.get("userId") || "67f67143917c79f04bcdbcf8";
      const applicationData = {
        schoolCode,
        yearPrefix,
        data: {
          parentId,
          classId: formData.admissionClass || "672206000532ca9b79980a23",
          sessionId: formData.admissionSession || "671609fcb0a54510ef567f15",
          schoolId: formData.admissionSchool,
          modeOfSchooling: formData.schoolingMode || "offline",
          selectAdmissionSession:
            formData.admissionSession || "671609fcb0a54510ef567f15",
          name: formData.name || "Unknown",
          gender: formData.gender || "Male",
          lastClassAttended: formData.lastClassAttended,
          lastSchoolAttended: formData.lastSchoolName,
          dob: formData.dateOfBirth,
          lastSchoolAffiliatedBoard: formData.lastSchoolAffiliated,
          category: formData.castCategory || "General",
          age:
            typeof formData.age === "string"
              ? parseInt(formData.age, 10)
              : formData.age || 0,
        },
      };

      const response = await sendStudentApplicationJSON(applicationData);
      console.log(applicationData);
      if (response.success && response.data?._id) {
        toast({
          description:
            response.message || "Application submitted successfully!",
          variant: "default",
        });
        setShowConfirmDialog(false);
        onNext(response.data._id); // Pass _id to parent
      } else {
        throw new Error(response.message || "No application ID returned");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit application";
      toast({
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
