import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormValues } from "@/app/lib/validations/registerSchema";
import { registerFormSchema } from "@/app/lib/validations/registerSchema";
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
import DownloadPDFButton from "@/app/(form)/registration/DownloadPDFButton";

interface RegisterProps {
  onNext: () => void;
}

const Register = ({ onNext }: RegisterProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [formData, setFormData] = React.useState<RegisterFormValues | null>(
    null
  );

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      gender: "Male",
      castCategory: "General",
      specaillyAbled: "No",
      lastSchoolAffiliated: "CBSE",
    },
    mode: "onBlur",
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: RegisterFormValues) => {
    const formattedData = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
    };
    // console.log(formattedData);
    setFormData(formattedData);
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AdmissionClass />
        <StudentDetails />
        <PreviousAcademic />
        <div className="flex gap-4">
          <Button type="submit" className="bg-[#789336] flex-1">
            Save & Continue
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
            >
              Review
            </Button>
            <Button onClick={handleConfirm} className="bg-[#789336]">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default Register;
