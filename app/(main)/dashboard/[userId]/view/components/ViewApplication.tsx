import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Download,
  FileText,
  User,
  Calendar,
  Book,
  School,
  Phone,
  Mail,
  MapPin,
  Heart,
  Briefcase,
  DollarSign,
} from "lucide-react";
import Cookies from "js-cookie";
interface ViewApplicationProps {
  userId: string;
  applicationId: string;
}

interface ApplicationData {
  permanentNo: string;
  student: {
    tempNo: string;
    name: string;
    gender: string;
    dob: string;
    age: number;
    modeOfSchooling: string;
    lastSchoolAffiliatedBoard: string;
    lastClassAttended: string;
    lastSchoolAttended: string;
    formStatus: string;
  };
  details: any;
  documents: any;
  parentIncome: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ViewApplication = ({ userId, applicationId }: ViewApplicationProps) => {
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/get-student-application-data/${applicationId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );

        if (response.data && response.data.success) {
          // Extract the first application from the data array
          const applicationInfo = response.data.data[0];

          // Transform the data structure for easier access in the component
          setApplicationData({
            permanentNo: applicationInfo.permanentNo,
            student: {
              tempNo: applicationInfo.studentApplicationFormId.tempNo,
              name: applicationInfo.studentApplicationFormId.name,
              gender: applicationInfo.studentApplicationFormId.gender,
              dob: applicationInfo.studentApplicationFormId.dob,
              age: applicationInfo.studentApplicationFormId.age,
              modeOfSchooling:
                applicationInfo.studentApplicationFormId.modeOfSchooling,
              lastSchoolAffiliatedBoard:
                applicationInfo.studentApplicationFormId
                  .lastSchoolAffiliatedBoard,
              lastClassAttended:
                applicationInfo.studentApplicationFormId.lastClassAttended,
              lastSchoolAttended:
                applicationInfo.studentApplicationFormId.lastSchoolAttended,
              formStatus: applicationInfo.studentApplicationFormId.formStatus,
            },
            details: {
              studentImage:
                applicationInfo.studentApplicationFromDetailsId.studentImage,
              religion:
                applicationInfo.studentApplicationFromDetailsId.religion,
              bloodGroup:
                applicationInfo.studentApplicationFromDetailsId.bloodGroup,
              motherTongue:
                applicationInfo.studentApplicationFromDetailsId.motherTongue,
              onlyChild:
                applicationInfo.studentApplicationFromDetailsId.onlyChild,
              onlyGirlChild:
                applicationInfo.studentApplicationFromDetailsId.onlyGirlChild,
              height: applicationInfo.studentApplicationFromDetailsId.height,
              weight: applicationInfo.studentApplicationFromDetailsId.weight,
              speciallyAbled:
                applicationInfo.studentApplicationFromDetailsId.speciallyAbled,
              fatherName:
                applicationInfo.studentApplicationFromDetailsId.fatherName,
              fatherResidentalAddress:
                applicationInfo.studentApplicationFromDetailsId
                  .fatherResidentalAddress,
              motherName:
                applicationInfo.studentApplicationFromDetailsId.motherName,
              motherResidentalAddress:
                applicationInfo.studentApplicationFromDetailsId
                  .motherResidentalAddress,
              fatherOccupation:
                applicationInfo.studentApplicationFromDetailsId
                  .fatherOccupation,
              motherOccupation:
                applicationInfo.studentApplicationFromDetailsId
                  .motherOccupation,
              phoneNo: applicationInfo.studentApplicationFromDetailsId.phoneNo,
              secondaryNo:
                applicationInfo.studentApplicationFromDetailsId.secondaryNo,
              additionalNo:
                applicationInfo.studentApplicationFromDetailsId.additionalNo,
              email: applicationInfo.studentApplicationFromDetailsId.email,
              permanentAddress:
                applicationInfo.studentApplicationFromDetailsId
                  .permanentAddress,
              localAddress:
                applicationInfo.studentApplicationFromDetailsId.localAddress,
              aadhaaCardNo:
                applicationInfo.studentApplicationFromDetailsId.aadhaaCardNo,
              secondLanguage:
                applicationInfo.studentApplicationFromDetailsId.secondLanguage,
              parentQualification:
                applicationInfo.studentApplicationFromDetailsId
                  .parentQualification,
              parentOccupation:
                applicationInfo.studentApplicationFromDetailsId
                  .parentOccupation,
              parentIncome:
                applicationInfo.studentApplicationFromDetailsId.parentIncome,
              category:
                applicationInfo.studentApplicationFromDetailsId.category,
            },
            documents: {
              birthCertificate:
                applicationInfo.studentApplicationFormDocumnetId
                  .birthCertificate,
              transferCertificate:
                applicationInfo.studentApplicationFormDocumnetId
                  .transferCertificate,
              migrationCertificate:
                applicationInfo.studentApplicationFormDocumnetId
                  .migrationCertificate,
              markSheet:
                applicationInfo.studentApplicationFormDocumnetId.markSheet,
              castCategory:
                applicationInfo.studentApplicationFormDocumnetId.castCategory,
              aadhaarCard:
                applicationInfo.studentApplicationFormDocumnetId.aadhaarCard,
              specialAbledCertificate:
                applicationInfo.studentApplicationFormDocumnetId
                  .specialAbledCertificate,
              parentDocs:
                applicationInfo.studentApplicationFormDocumnetId.parentDocs,
            },
            parentIncome: {
              relationWithGuardian:
                applicationInfo.studentApplicationParentIncomeId
                  .relationWithGuardian,
              annualIncome:
                applicationInfo.studentApplicationParentIncomeId.annualIncome,
              guardianDesignation:
                applicationInfo.studentApplicationParentIncomeId
                  .guardianDesignation,
              noOfDependentsOfGuardian:
                applicationInfo.studentApplicationParentIncomeId
                  .noOfDependentsOfGuardian,
              earningMembersInFamily:
                applicationInfo.studentApplicationParentIncomeId
                  .earningMembersInFamily,
            },
          });
        } else {
          setError("Failed to retrieve application data");
        }
      } catch (err) {
        setError("Error fetching application data");
        console.error("Error fetching application data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicationData();
  }, [applicationId]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const downloadPDF = async () => {
    try {
      setIsPdfLoading(true);

      // In a real implementation, you would generate a PDF here
      // This could be done client-side using jsPDF or html2pdf
      // Or you could make an API call to a server endpoint that generates the PDF

      // Simulating PDF generation delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demonstration - in a real app you would use a PDF library
      alert(
        "PDF download functionality would be implemented here with actual data"
      );
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Error generating PDF");
    } finally {
      setIsPdfLoading(false);
    }
  };

  const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start mb-2">
      <div className="text-blue-600 mr-2 mt-1">{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="font-medium">{value || "Not provided"}</p>
      </div>
    </div>
  );

  const DocumentLink = ({ label, url }) => (
    <div className="mb-2">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:underline"
        >
          <FileText size={16} className="mr-2" />
          {label}
        </a>
      ) : (
        <div className="flex items-center text-gray-400">
          <FileText size={16} className="mr-2" />
          {label} (Not uploaded)
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <p className="text-gray-600 mt-2">
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  if (!applicationData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-600 font-medium">No application data found</p>
        <p className="text-gray-600 mt-2">
          The requested application could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with download button */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">
                Student Application Details
              </h1>
              {/* <p className="text-gray-600">Application ID: {applicationId}</p> */}
              <p className="text-gray-600">
                Permanent Number: {applicationData.permanentNo}
              </p>
            </div>
            <button
              onClick={downloadPDF}
              disabled={isPdfLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
            >
              <Download size={16} className="mr-2" />
              {isPdfLoading ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Student Information
              </h2>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  applicationData.student.formStatus === "Approved"
                    ? "bg-green-100 text-green-800"
                    : applicationData.student.formStatus === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {applicationData.student.formStatus}
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                <img
                  src={
                    applicationData.details.studentImage ||
                    "/api/placeholder/120/120"
                  }
                  alt="Student"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/120/120";
                  }}
                />
              </div>
            </div>

            <InfoItem
              icon={<User size={16} />}
              label="Full Name"
              value={applicationData.student.name}
            />

            <InfoItem
              icon={<Calendar size={16} />}
              label="Date of Birth"
              value={formatDate(applicationData.student.dob)}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Gender"
              value={applicationData.student.gender}
            />

            <InfoItem
              icon={<Calendar size={16} />}
              label="Age"
              value={`${applicationData.student.age} years`}
            />

            <InfoItem
              icon={<Book size={16} />}
              label="Board"
              value={applicationData.student.lastSchoolAffiliatedBoard}
            />

            <InfoItem
              icon={<School size={16} />}
              label="Last School"
              value={applicationData.student.lastSchoolAttended}
            />

            <InfoItem
              icon={<School size={16} />}
              label="Mode of Schooling"
              value={
                applicationData.student.modeOfSchooling
                  .charAt(0)
                  .toUpperCase() +
                applicationData.student.modeOfSchooling.slice(1)
              }
            />
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Personal Details
            </h2>

            <InfoItem
              icon={<Heart size={16} />}
              label="Blood Group"
              value={applicationData.details.bloodGroup}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Religion"
              value={applicationData.details.religion}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Category"
              value={applicationData.details.category}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Mother Tongue"
              value={applicationData.details.motherTongue}
            />

            <InfoItem
              icon={<Book size={16} />}
              label="Second Language"
              value={applicationData.details.secondLanguage}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Height"
              value={`${applicationData.details.height} cm`}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Weight"
              value={`${applicationData.details.weight} kg`}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Only Child"
              value={applicationData.details.onlyChild ? "Yes" : "No"}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Only Girl Child"
              value={applicationData.details.onlyGirlChild ? "Yes" : "No"}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Specially Abled"
              value={applicationData.details.speciallyAbled ? "Yes" : "No"}
            />
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>

            <InfoItem
              icon={<Phone size={16} />}
              label="Primary Phone"
              value={applicationData.details.phoneNo}
            />

            <InfoItem
              icon={<Phone size={16} />}
              label="Secondary Phone"
              value={applicationData.details.secondaryNo}
            />

            <InfoItem
              icon={<Phone size={16} />}
              label="Additional Phone"
              value={applicationData.details.additionalNo}
            />

            <InfoItem
              icon={<Mail size={16} />}
              label="Email"
              value={applicationData.details.email}
            />

            <InfoItem
              icon={<MapPin size={16} />}
              label="Permanent Address"
              value={applicationData.details.permanentAddress}
            />

            <InfoItem
              icon={<MapPin size={16} />}
              label="Local Address"
              value={applicationData.details.localAddress}
            />
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Parent Information
            </h2>

            <InfoItem
              icon={<User size={16} />}
              label="Father's Name"
              value={applicationData.details.fatherName}
            />

            <InfoItem
              icon={<MapPin size={16} />}
              label="Father's Address"
              value={applicationData.details.fatherResidentalAddress}
            />

            <InfoItem
              icon={<Briefcase size={16} />}
              label="Father's Occupation"
              value={applicationData.details.fatherOccupation}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Mother's Name"
              value={applicationData.details.motherName}
            />

            <InfoItem
              icon={<MapPin size={16} />}
              label="Mother's Address"
              value={applicationData.details.motherResidentalAddress}
            />

            <InfoItem
              icon={<Briefcase size={16} />}
              label="Mother's Occupation"
              value={applicationData.details.motherOccupation}
            />

            <InfoItem
              icon={<DollarSign size={16} />}
              label="Parent's Income"
              value={
                applicationData.details.parentIncome
                  ? `₹${applicationData.details.parentIncome.toLocaleString()}`
                  : "Not provided"
              }
            />

            <InfoItem
              icon={<User size={16} />}
              label="Relation with Guardian"
              value={applicationData.parentIncome.relationWithGuardian}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Earning Members"
              value={applicationData.parentIncome.earningMembersInFamily}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Number of Dependents"
              value={applicationData.parentIncome.noOfDependentsOfGuardian}
            />
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Financial Information
            </h2>

            <InfoItem
              icon={<DollarSign size={16} />}
              label="Annual Income"
              value={`₹${applicationData.parentIncome.annualIncome}`}
            />

            <InfoItem
              icon={<Briefcase size={16} />}
              label="Guardian Designation"
              value={applicationData.parentIncome.guardianDesignation}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Earning Members"
              value={applicationData.parentIncome.earningMembersInFamily}
            />

            <InfoItem
              icon={<User size={16} />}
              label="Dependents"
              value={applicationData.parentIncome.noOfDependentsOfGuardian}
            />
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Uploaded Documents
            </h2>

            <DocumentLink
              label="Birth Certificate"
              url={applicationData.documents.birthCertificate}
            />

            <DocumentLink
              label="Transfer Certificate"
              url={applicationData.documents.transferCertificate}
            />

            <DocumentLink
              label="Migration Certificate"
              url={applicationData.documents.migrationCertificate}
            />

            <DocumentLink
              label="Mark Sheet"
              url={applicationData.documents.markSheet}
            />

            <DocumentLink
              label="Aadhaar Card"
              url={applicationData.documents.aadhaarCard}
            />

            <DocumentLink
              label="Parent Documents"
              url={applicationData.documents.parentDocs}
            />

            <DocumentLink
              label="Cast Category Certificate"
              url={applicationData.documents.castCategory}
            />

            <DocumentLink
              label="Specially Abled Certificate"
              url={applicationData.documents.specialAbledCertificate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplication;
