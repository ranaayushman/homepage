import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RegisterFormValues } from "@/app/lib/validations/registerSchema";

export const generatePDF = async (formData: RegisterFormValues) => {
  try {
    const formattedContent = document.createElement("div");
    formattedContent.innerHTML = `
      <div class="p-5 font-sans">
        <h2 class="text-2xl font-bold mb-6">Registration Details</h2>
        
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">Admission Class</h3>
          <p><span class="font-medium">Class:</span> ${
            formData.admissionClass
          }</p>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">Student Details</h3>
          <p class="mb-1"><span class="font-medium">Name:</span> ${
            formData.name
          }</p>
          <p><span class="font-medium">Date of Birth:</span> ${new Date(
            formData.dateOfBirth
          ).toLocaleDateString()}</p>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">Previous Academic Details</h3>
          <p><span class="font-medium">School:</span> ${
            formData.lastSchoolAffiliated
          }</p>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">Guardian Details</h3>
         
        </div>
      </div>
    `;

    document.body.appendChild(formattedContent);
    const canvas = await html2canvas(formattedContent);
    document.body.removeChild(formattedContent);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`registration-${formData.name}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
