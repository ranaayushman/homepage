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
// import Guardian from "./ui/Guardian";
// import DownloadPDFButton from "./DownloadPDFButton";

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
    console.log(formattedData);
    setFormData(formattedData);
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    onNext();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AdmissionClass />
        <StudentDetails />
        <PreviousAcademic />
        {/* <Guardian /> */}
        <div className="flex gap-4">
          <Button type="submit" className="bg-[#789336] flex-1">
            Save & Continue
          </Button>
          {/* <DownloadPDFButton formData={formData} /> */}
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
            >
              Review
            </Button>
            <Button onClick={handleConfirm} className="bg-[#789336]">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
