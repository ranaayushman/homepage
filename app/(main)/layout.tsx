"use client";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      router.push("/");
    } else {
      // Extract userId from the pathname
      const pathSegments = pathname.split('/');
      
      // Look for userId in common patterns
      // This assumes routes follow patterns like /dashboard/[userId], /payment/[userId], etc.
      let extractedUserId = "";
      
      for (let i = 0; i < pathSegments.length; i++) {
        // Check if this segment could be a MongoDB ObjectId (24 hex chars)
        if (pathSegments[i] && /^[0-9a-fA-F]{24}$/.test(pathSegments[i])) {
          extractedUserId = pathSegments[i];
          break;
        }
      }
      
      // Alternatively, you could extract userId from JWT token
      // const decodedToken = parseJWT(authToken);
      // extractedUserId = decodedToken.userId;
      
      setUserId(extractedUserId);
      setIsLoading(false);
    }
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex">
        <div className="flex-shrink-0">
          <Sidebar userId={userId} />
        </div>
        <div className="flex-1">
          <div className="w-full">
            <Navbar />
          </div>
          <div className="p-4 w-full">{children}</div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}