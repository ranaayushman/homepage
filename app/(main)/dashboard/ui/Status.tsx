import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface StatusProps {
  userId: string;
}

const Status = ({ userId }: StatusProps) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentApplications = async () => {
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/get-students-applications/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );
        setApplications(response.data.data || []);
      } catch (e) {
        console.error("Error fetching applications:", e);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentApplications();
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "text-[#789336]";
      case "Pending":
        return "text-orange-500";
      case "Confirm":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleContinueApplication = (applicationId: string) => {
    router.push(`/application/continue?applicationId=${applicationId}`);
  };

  const handleViewApplication = (applicationId: string) => {
    router.push(`/application/view?applicationId=${applicationId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#FFFFFF] px-10 rounded-md mx-10 py-5">
      <div>
        <h2 className="text-xl pb-5">Bright Future International School</h2>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="font-medium">Form Submitted On</th>
              <th className="font-medium">Applicant Name</th>
              <th className="font-medium">Form No.</th>
              <th className="font-medium">Application Fee</th>
              <th className="font-medium">Form Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {applications.map((app: any) => (
              <tr key={app._id}>
                <td>{formatDate(app.createdAt)}</td>
                <td>{app.name}</td>
                <td>{app.tempNo}</td>
                <td>₹ 500</td>
                <td
                  className={`px-3 py-1 rounded-md ${getStatusColor(
                    app.formStatus
                  )}`}
                >
                  {app.formStatus}
                </td>
                <td className="flex justify-start items-center">
                  <Button
                    className="px-3 py-1 rounded-md bg-transparent border-none shadow-none hover:bg-transparent text-[#789336]"
                    onClick={() =>
                      app.formStatus === "Pending"
                        ? handleContinueApplication(app._id)
                        : handleViewApplication(app._id)
                    }
                  >
                    {app.formStatus === "Pending"
                      ? "Continue Application"
                      : "View Application"}
                    <Image
                      src="/svg/rightarrow.svg"
                      height={20}
                      width={20}
                      alt="arrow"
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status;
