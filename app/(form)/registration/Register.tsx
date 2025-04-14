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

interface RegisterProps {
  onNext: () => void; // Simplified since Form.tsx handles steps
  schoolCode?: number;
  yearPrefix?: string;
  userId: string; // Added to get parentId
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
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      const applicationData = {
        schoolCode,
        yearPrefix,
        data: {
          parentId: userId, // Use userId from props
          classId: formData.admissionClass || "6722067f0532ca9b79980a29",
          sessionId: formData.admissionSession || "671609fcb0a54510ef567f15",
          schoolId: formData.admissionSchool || "6784e6d212b0bbb0347b2951",
          modeOfSchooling: formData.schoolingMode || "offline",
          selectAdmissionSession:
            formData.admissionSession || "671609fcb0a54510ef567f15",
          name: formData.name || "Unknown",
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

      const response = await sendStudentApplicationJSON(applicationData);
      if (response.success && response.data?._id) {
        // Store IDs in localStorage
        const { _id, tempNo, parentId, classId, schoolId, sessionId } =
          response.data;
        localStorage.setItem("applicationId", _id);
        localStorage.setItem("tempNo", tempNo);
        localStorage.setItem("parentId", parentId);
        localStorage.setItem("classId", classId);
        localStorage.setItem("schoolId", schoolId);
        localStorage.setItem("sessionId", sessionId);

        toast({
          description:
            response.message || "Application submitted successfully!",
          variant: "success",
        });
        setShowConfirmDialog(false);
        onNext(); // Move to Payment step
      } else {
        throw new Error(response.message || "No application ID returned");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit application";
      toast({
        description: message,
        variant: "success",
      });
      onNext(); // Move to Payment step even on error
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
