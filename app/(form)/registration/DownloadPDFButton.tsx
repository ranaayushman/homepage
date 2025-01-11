import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generatePDF } from "./pdfUtils";
import type { RegisterFormValues } from "@/app/lib/validations/registerSchema";

interface DownloadPDFButtonProps {
  formData: RegisterFormValues | null;
  className?: string;
}

const DownloadPDFButton = ({ formData, className }: DownloadPDFButtonProps) => {
  const handleDownload = async () => {
    if (formData) {
      await generatePDF(formData);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className={`flex items-center gap-2 ${className}`}
      disabled={!formData}
    >
      <Download className="h-4 w-4" />
      Download Form
    </Button>
  );
};

export default DownloadPDFButton;
