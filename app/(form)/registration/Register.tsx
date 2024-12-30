import React from "react";
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
import Guardian from "./ui/Guardian";

interface RegisterProps {
  onNext: () => void;
}

const Register = ({ onNext }: RegisterProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [formData, setFormData] = React.useState<RegisterFormValues | null>(
    null
  );

  const { handleSubmit } = useFormContext<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
    const formattedData = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
    };

    setFormData(formattedData);
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    console.log("Submitting:", formData);
    setShowConfirmDialog(false);
    onNext();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AdmissionClass />
        <StudentDetails />
        <PreviousAcademic />
        <Guardian />

        <Button type="submit" className="bg-primary w-full">
          Save & Continue
        </Button>
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
            >
              Review
            </Button>
            <Button onClick={handleConfirm}>Confirm & Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
